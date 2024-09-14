import {
  BeforeInsert,
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

  @Column()
  productType: string;

  @Column()
  product_id: number;

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
    if (this.name && typeof this.name === 'string') {
      this.slug = slugify(this.name, { lower: true });
    } else {
      console.error('Invalid product name:', this.name);
      throw new Error('Invalid product name for slug generation');
    }
  }

  get formattedPrice(): string {
    return `${this.price.toFixed(2)}`;
  }
}

@Entity('clothings')
export class Clothing {
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
