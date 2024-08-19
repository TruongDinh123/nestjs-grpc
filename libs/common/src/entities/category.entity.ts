import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToMany(() => PostEntity, (post: PostEntity) => post.categories)
  public posts: PostEntity[];
}
