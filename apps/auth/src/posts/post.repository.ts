import { BaseRepositoryAbstract, PostEntity } from '@app/common';
import { Injectable } from '@nestjs/common';
import { PostRepositoryInterface } from './post.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostRepository
  extends BaseRepositoryAbstract<PostEntity>
  implements PostRepositoryInterface
{
  constructor(
    @InjectRepository(PostEntity)
    private readonly posts_repository: Repository<PostEntity>,
  ) {
    super(posts_repository);
  }
}
