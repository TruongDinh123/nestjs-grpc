import { BaseServiceAbstract, PostEntity } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PostRepositoryInterface } from './post.interface';
import { CreatePostDto } from './dto/createPost.dto';
import UserEntity from '@app/common/entities/user.entity';
import { CategoriesService } from '../categories/categories.service';
import {
  GetPostsWithAuthorIdRequest,
  GetPostsWithAuthorIdResponse,
} from '@app/common/types/post';

@Injectable()
export class PostsService
  extends BaseServiceAbstract<PostEntity>
  implements OnModuleInit
{
  constructor(
    @Inject('PostRepositoryInterface')
    private readonly posts_repository: PostRepositoryInterface,
    private readonly categories_repository: CategoriesService,
  ) {
    super(posts_repository);
  }

  onModuleInit() {}

  async createPost(createPostDto: CreatePostDto, user: UserEntity) {
    // const categoryIds = createPostDto.categories.map((cat) => cat.id);
    // const categories = await this.categories_repository.findByIds(categoryIds);
    const newPost = await this.posts_repository.create({
      ...createPostDto,
      author: user,
    });
    console.log('🚀 ~ newPost:', newPost);
    return newPost;
  }

  async getPostsByAuthorId(
    dto: GetPostsWithAuthorIdRequest,
  ): Promise<GetPostsWithAuthorIdResponse> {
    const posts = await this.posts_repository.findBy({
      where: {
        author: {
          id: dto.authorId,
        },
      },
    });
    console.log('🚀 ~ posts:', posts);
    return { posts };
  }
}
