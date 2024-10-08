import {
  CreatePostRequest,
  GetPostsWithAuthorIdRequest,
  POST_SERVICE_NAME,
  PostServiceClient,
} from '@app/common/types/post';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class PostsService implements OnModuleInit {
  private postsService: PostServiceClient;

  constructor(@Inject(POST_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.postsService =
      this.client.getService<PostServiceClient>(POST_SERVICE_NAME);
  }

  createPost(createPostDto: CreatePostRequest, metadata: any) {
    return this.postsService.createPost(createPostDto, metadata);
  }

  getPostsByAuthorId(dto: GetPostsWithAuthorIdRequest, metadata: any) {
    return this.postsService.getPostsByAuthorId(dto, metadata);
  }
}
