import {
  Controller,
  HttpCode,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UsersServiceController,
  UsersServiceControllerMethods,
  RegisterDto,
  LoginDto,
  UserAndToken,
  ResRefreshToken,
} from '@app/common';
import JwtRefreshGuard from '../guard/jwt-refresh.guard';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import UserEntity from '@app/common/entities/user.entity';
import { User } from '@app/common/types/common';

@Controller()
@UsersServiceControllerMethods()
@SerializeOptions({
  strategy: 'excludeAll',
})
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  async login(request: LoginDto): Promise<UserAndToken> {
    const user = await this.usersService.getAuthenticatedUser(
      request.email,
      request.password,
    );

    const accessTokenCookie = this.usersService.getCookieWithJwtAccessToken(
      user.id,
    );

    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.usersService.getCookieWithJwtRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    return {
      user,
      accessTokenCookie,
      refreshTokenCookie,
    };
  }

  @UseGuards(JwtRefreshGuard)
  async refreshToken(
    @CurrentUser() request: UserEntity,
  ): Promise<ResRefreshToken> {
    const accessTokenCookie = this.usersService.getCookieWithJwtAccessToken(
      request.id,
    );
    return { user: request, accessTokenCookie };
  }

  async createUser(createUserDto: RegisterDto): Promise<User> {
    const newUser = await this.usersService.register(createUserDto);
    return newUser;
  }
}
