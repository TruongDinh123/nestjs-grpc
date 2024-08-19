import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryEntity, DatabaseModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([CategoryEntity]),
  ],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    {
      provide: 'CategoryRepositoryInterface',
      useClass: CategoriesRepository,
    },
  ],
})
export class CategoriesModule {}
