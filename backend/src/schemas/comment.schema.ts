import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { CommentStatus } from './enum';
import { InterviewDocument } from './interview.schema';

@Schema({ timestamps: true })
export class Comment {
  _id: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Interview',
  })
  interviewId: Types.ObjectId;

  interview?: InterviewDocument;

  @Prop({
    type: String,
    required: true,
  })
  comment: string;

  @Prop({
    type: String,
    required: true,
    enum: CommentStatus,
  })
  status: string;

  // should be implement separated module instead hardcode this
  @Prop({
    type: String,
    required: true,
  })
  createdBy: string;

  createdAt: Date;

  updatedAt: Date;
}

export type CommentDocument = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);
