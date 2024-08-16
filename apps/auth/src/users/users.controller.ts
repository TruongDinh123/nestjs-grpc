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
  FindOneUserDto,
  PaginationDto,
  User,
  RegisterDto,
  LoginDto,
  UserAndToken,
  ResRefreshToken,
} from '@app/common';
import { Observable } from 'rxjs';
import JwtRefreshGuard from './jwt-refresh.guard';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import UserEntity from '@app/common/entities/user.entity';

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
    console.log('🚀 ~ accessTokenCookie:', accessTokenCookie);
    return { user: request, accessTokenCookie };
  }

  async createUser(createUserDto: RegisterDto): Promise<User> {
    const newUser = await this.usersService.register(createUserDto);
    return newUser;
  }

  findAllUsers() {
    return this.usersService.findAll();
  }

  findOneUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.findOne(findOneUserDto.id);
  }

  removeUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.remove(findOneUserDto.id);
  }

  queryUsers(paginationDtoStream: Observable<PaginationDto>) {
    return this.usersService.queryUsers(paginationDtoStream);
  }
}
