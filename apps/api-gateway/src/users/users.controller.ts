import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto, User } from '@app/common';
import { ICustomResponse } from '../interfaces/custom-response.interface';
import { lastValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: RegisterDto,
  ): Promise<ICustomResponse<User>> {
    const result = await lastValueFrom(this.usersService.create(createUserDto));
    return {
      message: 'Đăng kí thành công',
      result: result,
    };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Post('email')
  emailUsers() {
    return this.usersService.emailUsers();
  }
}
