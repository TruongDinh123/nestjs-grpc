import { HttpStatus } from '@nestjs/common';
import { GrpcException } from '@app/common/exceptions/rpc-exception';
import { BaseRepositoryInterface } from './base.interface.repository';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';

export interface HasId {
  id: number;
}
export abstract class BaseRepositoryAbstract<TDocument extends HasId>
  implements BaseRepositoryInterface<TDocument>
{
  constructor(protected readonly repository: Repository<TDocument>) {
    this.repository = repository;
  }

  /*
    - Omit là một extendsion trong TypeScript để tạo mới một kiểu mới bằng cách loại bỏ các
    thuộc tính được chỉ định kiểu khác. Trong trường hợp:
    
    Omit<TDocument, 'id'>: loại bỏ thuộc tính 'id' khỏi kiểu TDocument.

    - TDocument là một kiểu tổng quát (generic type) trong Typesript
    được sử dụng để định nghĩa kiểu của các tài liệu mà repository sẽ làm việc.

    - TDocument phải thừa kế AbstractDocument để đảm bảo rằng mọi TDocument đều có ít nhất cấc thuộc
    tính được định nghĩa trong AbstractDocument.

*/
  async create(data: DeepPartial<TDocument>): Promise<TDocument> {
    const createdDocument = await this.repository.create(data);
    return await this.save(createdDocument);
  }

  async save(document: TDocument): Promise<TDocument> {
    return await this.repository.save(document);
  }

  public async preload(entityLike: DeepPartial<TDocument>): Promise<TDocument> {
    const document = await this.repository.preload(entityLike);
    return await this.save(document);
  }

  /*
    - Lean() được sử dụng để tối ưu hóa truy vấn bằng cách trả về đói tượng js thuần túy thay vì một
    mongoose document. Điều này sẽ giảm bớt chi phí xử lí và cải thiện hiệu xuất.

    - Nếu bạn không sử dụng lean() thì kết quả trả về sẽ là 1 instance của Mongoose document.
    Mỗi document này bao gồm cả dữ liệu và method như save(), delete()... Điều này gây ra
    sự chậm trễ overhead của việc tạo ra instance.
  -
  */
  async findOneBy(filterQuery: FindOneOptions<TDocument>): Promise<TDocument> {
    const document = await this.repository.findOneBy(filterQuery.where);

    if (!document) {
      throw new GrpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'Document not found with filter query',
      });
    }
    return document;
  }

  async findByIds(ids: number[]): Promise<TDocument[]> {
    return await this.repository.findByIds(ids);
  }

  async findOneAndUpdate(
    filterQuery: FindOneOptions<TDocument>, // Sử dụng FindOneOptions
    update: DeepPartial<TDocument>, // Sử dụng DeepPartial
  ): Promise<TDocument> {
    // Thêm kiểu trả về
    const document = await this.repository.preload({
      // Sử dụng preload để cập nhật
      // preload là những dữ liệu mà bạn muốn cập nhật cho một document
      ...filterQuery,
      ...update,
    });

    if (!document) {
      throw new GrpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'Document not found with filter query',
      });
    }
    return await this.repository.save(document);
  }

  async find(filterQuery: FindOneOptions<TDocument>): Promise<TDocument[]> {
    return await this.repository.find(filterQuery);
  }

  async findOneAndDelete(
    filterQuery: FindOneOptions<TDocument>,
  ): Promise<TDocument> {
    const document = await this.findOneBy(filterQuery);
    return await this.repository.remove(document);
  }
}
