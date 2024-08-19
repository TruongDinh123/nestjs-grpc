import { POST_SERVICE_NAME } from '@app/common/types/post';
import { Body, Controller, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../guard/jwt-authentication.guard';
import { CreatePostDto } from './dto/createPost.dto';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { PostsService } from './posts.service';
import { Post } from '@app/common/types/common';
import { GrpcMethod } from '@nestjs/microservices';
import UserEntity from '@app/common/entities/user.entity';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @GrpcMethod(POST_SERVICE_NAME, 'CreatePost')
  @UseGuards(JwtAuthenticationGuard)
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: UserEntity,
  ): Promise<Post> {
    const result = await this.postsService.createPost(createPostDto, user);
    return result;
  }
}
