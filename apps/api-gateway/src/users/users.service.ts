import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateUserDto,
  LoginDto,
  PaginationDto,
  USERS_SERVICE_NAME,
  UsersServiceClient,
} from '@app/common';
import { AUTH_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: UsersServiceClient;

  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  login(loginDto: LoginDto, metadata: any) {
    return this.usersService.login(loginDto, metadata);
  }

  refreshToken({}, metadata: any) {
    return this.usersService.refreshToken({}, metadata);
  }

  create(createUserDto: CreateUserDto, metadata: any) {
    return this.usersService.createUser(createUserDto, metadata);
  }

  findAll(metadata: any) {
    return;
  }

  findOne(id: number, metadata: any) {
    return;
  }

  remove(id: number, metadata: any) {
    return;
  }

  emailUsers(metadata: any) {
    const users$ = new ReplaySubject<PaginationDto>();

    users$.next({ page: 0, skip: 25 });
    users$.next({ page: 1, skip: 25 });
    users$.next({ page: 2, skip: 25 });
    users$.next({ page: 3, skip: 25 });

    users$.complete();

    let chunkNumber = 1;

    this.usersService.queryUsers(users$, metadata).subscribe((users) => {
      console.log('Chunk', chunkNumber, users);
      chunkNumber += 1;
    });
  }
}
