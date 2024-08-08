import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  age?: number;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
