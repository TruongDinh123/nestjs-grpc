import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UsersServiceController,
  UsersServiceControllerMethods,
  FindOneUserDto,
  PaginationDto,
  LoginDto,
  User,
} from '@app/common';
import { Observable } from 'rxjs';
import RegisterDto from '../dto/register.dto';
import { Payload } from '@nestjs/microservices';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  login(request: LoginDto): User {
    return this.usersService.login(request);
  }

  async createUser(@Payload() createUserDto: RegisterDto): Promise<User> {
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
