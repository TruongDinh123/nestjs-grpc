import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Address } from './adress.entity';
import { PostEntity } from './post.entity';

@Entity()
class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  public phoneNumber?: string;

  @Column({ nullable: true })
  public name: string;

  @Column({ nullable: true })
  @Exclude()
  public password: string;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public address: Address;

  @OneToMany(() => PostEntity, (post: PostEntity) => post.author)
  public posts: PostEntity[];

  @Column({ default: false })
  public isRegisteredWithGoogle: boolean;

  @Column({
    nullable: true,
  })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @Column({ nullable: true })
  public twoFactorAuthenticationSecret?: string;

  @Column({ default: false })
  public isTwoFactorAuthenticationEnabled: boolean;

  @Column({ nullable: true })
  public monthlySubscriptionStatus?: string;

  @Column({ default: false })
  public isEmailConfirmed: boolean;

  @Column({ default: false })
  public isPhoneNumberConfirmed: boolean;
}

export default UserEntity;
