import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostRequest } from '@app/common/types/post';
import { CookieMetadata } from '../decorators/use-cookie.decorator';
import { Metadata } from '@grpc/grpc-js';
import { lastValueFrom } from 'rxjs';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(
    @Body() createPostDto: CreatePostRequest,
    @CookieMetadata('Authentication') metadata: Metadata,
  ) {
    const result = await lastValueFrom(
      this.postsService.createPost(createPostDto, metadata),
    );
    return {
      message: 'Tạo bài viết thành công',
      result: {
        ...result,
        categories: createPostDto.categories,
      },
    };
  }

  @Get(':authorId')
  async GetPostsByAuthorId(
    @CookieMetadata('Authentication') metadata: Metadata,
    @Query('authorId') authorId: number,
  ) {
    const result = await lastValueFrom(
      this.postsService.getPostsByAuthorId({ authorId }, metadata),
    );
    return {
      message: 'Lấy danh sách bài viết thành công',
      result: result,
    };
  }
}
