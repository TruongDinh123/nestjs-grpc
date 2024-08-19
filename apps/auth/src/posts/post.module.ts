import { CategoryEntity, DatabaseModule, PostEntity } from '@app/common';
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesService } from '../categories/categories.service';
import { CategoriesRepository } from '../categories/categories.repository';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([PostEntity, CategoryEntity]),
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    CategoriesService,
    { provide: 'PostRepositoryInterface', useClass: PostRepository },
    {
      provide: 'CategoryRepositoryInterface',
      useClass: CategoriesRepository,
    },
  ],
})
export class PostsModule {}
