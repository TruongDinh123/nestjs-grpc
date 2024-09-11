import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import UserEntity from './user.entity';
import { CategoryEntity } from './category.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Index('post_authorid_index')
  @ManyToOne(() => UserEntity, (user) => user.posts)
  public author: UserEntity;

  @ManyToMany(
    () => CategoryEntity,
    (category: CategoryEntity) => category.posts,
  )
  @JoinTable()
  public categories: CategoryEntity[];
}
