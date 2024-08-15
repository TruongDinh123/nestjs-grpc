import { Controller, HttpCode } from '@nestjs/common';
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
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  async login(request: LoginDto): Promise<UserAndToken> {
    console.log('🚀 ~ request:', request);
    const user = await this.usersService.getAuthenticatedUser(
      request.email,
      request.password,
    );

    const accessTokenCookie = this.usersService.getCookieWithJwtAccessToken(
      user.id,
    );

    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.usersService.getCookieWithJwtRefreshToken(user.id);

    // RequestWithUser.res?.setHeader('Set-Cookie', [
    //   accessTokenCookie,
    //   refreshTokenCookie,
    // ]);
    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    return {
      user,
      accessTokenCookie,
      refreshTokenCookie,
    };
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
