import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import UserEntity from './user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public street: string;

  @Column()
  public city: string;

  @Column()
  public country: string;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.address)
  public user?: UserEntity;
}
