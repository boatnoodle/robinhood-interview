import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CommentStatus } from './enum';

@Schema({ timestamps: true })
export class Comment {
  _id: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  comment: string;

  @Prop({
    type: String,
    required: true,
    enum: CommentStatus,
  })
  status: string;
}

export type CommentDocument = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);
