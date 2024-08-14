import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import {
  User,
  Users,
  PaginationDto,
  BaseServiceAbstract,
  GrpcException,
  RegisterDto,
  UsersRepositoryInterface,
} from '@app/common';
import { Observable, Subject } from 'rxjs';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import UserEntity from '@app/common/entities/user.entity';

@Injectable()
export class UsersService
  extends BaseServiceAbstract<UserEntity>
  implements OnModuleInit
{
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly users_repository: UsersRepositoryInterface,
  ) {
    super(users_repository);
  }
  private readonly users: User[] = [];

  onModuleInit() {}

  public async register(registerDto: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    try {
      const createdUser = await this.users_repository.create({
        ...registerDto,
        password: hashedPassword,
      });
      return createdUser;
    } catch (error) {
      throw new GrpcException({
        status: 400,
        message: 'User already exists',
        error: error.message,
      });
    }
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.users_repository.findOneByEmail(email);
  }

  login(loginDto: LoginDto): User {
    return;
  }

  findAll(): Users {
    return { users: this.users };
  }

  findOne(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  remove(id: number) {
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
