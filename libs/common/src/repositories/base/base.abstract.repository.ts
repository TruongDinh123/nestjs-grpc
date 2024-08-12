import { Model, Types, FilterQuery, UpdateQuery } from 'mongoose';
import { HttpStatus } from '@nestjs/common';
import { AbstractDocument } from '@app/common/databases';
import { GrpcException } from '@app/common/exceptions/rpc-exception';
import { BaseRepositoryInterface } from './base.interface.repository';

export abstract class BaseRepositoryAbstract<TDocument extends AbstractDocument>
  implements BaseRepositoryInterface<TDocument>
{
  constructor(protected readonly model: Model<TDocument>) {
    this.model = model;
  }

  /*
    - Omit là một extendsion trong TypeScript để tạo mới một kiểu mới bằng cách loại bỏ các
    thuộc tính được chỉ định kiểu khác. Trong trường hợp:
    
    Omit<TDocument, '_id'>: loại bỏ thuộc tính '_id' khỏi kiểu TDocument.

    - TDocument là một kiểu tổng quát (generic type) trong Typesript
    được sử dụng để định nghĩa kiểu của các tài liệu mà repository sẽ làm việc.

    - TDocument phải thừa kế AbstractDocument để đảm bảo rằng mọi TDocument đều có ít nhất cấc thuộc
    tính được định nghĩa trong AbstractDocument.

*/
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON as unknown as TDocument;
  }

  /*
    - Lean() được sử dụng để tối ưu hóa truy vấn bằng cách trả về đói tượng js thuần túy thay vì một
    mongoose document. Điều này sẽ giảm bớt chi phí xử lí và cải thiện hiệu xuất.

    - Nếu bạn không sử dụng lean() thì kết quả trả về sẽ là 1 instance của Mongoose document.
    Mỗi document này bao gồm cả dữ liệu và method như save(), delete()... Điều này gây ra
    sự chậm trễ overhead của việc tạo ra instance.
  -
  */
  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true); // true để trả về object thuần túy với kiểu dữ liệu là TDocument

    if (!document) {
      throw new GrpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'Document not found with filter query',
      });
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true, // trả về document mới nhất
      })
      .lean<TDocument>(true);

    if (!document) {
      throw new GrpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'Document not found with filter query',
      });
    }
    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return await this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return await this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
  }
}
