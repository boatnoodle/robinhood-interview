import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from '@schema/comment.schema';
import { CommentService } from '@service/comment/comment.service';
import { CommentRepository } from '@repository/comment.repository';
import { CommentController } from '@controller/comment';
import { Interview, InterviewSchema } from '@schema/interview.schema';
import { InterviewRepository } from '@repository/interview.repository';
import { MongoObjectIdModule } from '@libs/mongo-object-id';

@Module({
  imports: [
    DatabaseModule,
    MongoObjectIdModule,
    MongooseModule.forFeature([
      { name: Interview.name, schema: InterviewSchema },
    ]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  providers: [CommentService, InterviewRepository, CommentRepository],
  controllers: [CommentController],
})
export class CommentModule {}
