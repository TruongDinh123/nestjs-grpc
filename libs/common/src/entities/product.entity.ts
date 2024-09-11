import {
  BeforeInsert,
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';
import UserEntity from './user.entity';
import slugify from 'slugify';

export enum ProductType {
  Clothing = 'Clothing',
  Electronics = 'Electronics',
}

@Entity('products')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  thumbnail: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  description: string;

  @Column('int')
  quantity: number;

  @Column()
  slug: string;

  @Column({
    type: 'enum',
    enum: ProductType,
  })
  productType: ProductType;

  @ManyToOne(() => UserEntity, (user) => user.products)
  @JoinColumn({ name: 'accountId' })
  account: UserEntity;

  @Column('json')
  attributes: Record<string, any>;

  @Column('decimal', { precision: 3, scale: 1, default: 4.5 })
  ratingAverage: number;

  @Column({ default: false })
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  generateSlug() {
    this.slug = slugify(this.name, { lower: true });
  }

  get formattedPrice(): string {
    return `${this.price.toFixed(2)}`;
  }
}

@ChildEntity()
export class Electronics extends Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  manufacturer: string;

  @Column()
  color: string;
}

@ChildEntity()
export class Clothing extends Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  size: string;

  @Column()
  color: string;

  @Column()
  material: string;
}
