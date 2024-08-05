import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';
import { AbstractDocument } from '@app/common';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    getters: true, // getters là các hàm được gọi khi lấy giá trị của field
    virtuals: true, // virtuals là các field ảo
  },
  versionKey: false, // không lưu trữ version của document trong database '__v'
})
export class User extends AbstractDocument {
  @Prop({ unique: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  fullName: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop({ required: true })
  roles: [string];

  @Prop()
  isBlock: boolean;

  @Prop({ default: 'active', enum: ['active', 'inactive'] })
  status: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ firstName: 'text', lastName: 'text' });

UserSchema.virtual('fullName').get(function (this: User) {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author',
});

export { UserSchema };
