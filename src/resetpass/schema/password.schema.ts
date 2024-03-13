import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class PassWord {
  @Prop({
    required: true,
  })
  user: Types.ObjectId;

  @Prop({
    required: true,
  })
  email: String;
}
export const PassWordSchema = SchemaFactory.createForClass(PassWord);
