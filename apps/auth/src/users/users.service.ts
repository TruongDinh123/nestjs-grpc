import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import {
  User,
  CreateUserDto,
  UpdateUserDto,
  Users,
  PaginationDto,
  BaseServiceAbstract,
  UserDocument,
} from '@app/common';
import { Observable, Subject } from 'rxjs';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class UsersService
  extends BaseServiceAbstract<UserDocument>
  implements OnModuleInit
{
  private readonly users: User[] = [];

  onModuleInit() {}

  login(loginDto: LoginDto): User {
    return;
  }

  findAll(): Users {
    return { users: this.users };
  }

  findOne(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      return this.users.splice(userIndex)[0];
    }
    throw new NotFoundException(`User not found by id ${id}.`);
  }

  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    const subject = new Subject<Users>();

    const onNext = (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
      subject.next({
        users: this.users.slice(start, start + paginationDto.skip),
      });
    };
    const onComplete = () => subject.complete();
    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }
}
