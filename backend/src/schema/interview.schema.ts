import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { InterviewStatus } from './enum';

@Schema({ timestamps: true })
export class Interview {
  _id: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  description: string;

  @Prop({
    type: [Types.ObjectId],
    ref: 'Comment',
  })
  comments?: Types.ObjectId[];

  @Prop({
    type: String,
    required: true,
    enum: InterviewStatus,
  })
  status: string;
}

export type InterviewDocument = Interview & Document;
export const InterviewSchema = SchemaFactory.createForClass(Interview);
