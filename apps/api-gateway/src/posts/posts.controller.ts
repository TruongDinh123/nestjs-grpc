import { Body, Controller, Post } from '@nestjs/common';
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
    console.log('🚀 ~ result:', result);
    return {
      message: 'Tạo bài viết thành công',
      result: result,
    };
  }
}
