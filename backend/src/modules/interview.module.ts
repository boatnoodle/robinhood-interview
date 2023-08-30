import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { InterviewController } from '@controller/interview';
import { InterviewService } from '@service/interview';
import { MongooseModule } from '@nestjs/mongoose';
import { Interview, InterviewSchema } from '@schema/interview.schema';
import { InterviewRepository } from '@repository/interview.repository';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Interview.name, schema: InterviewSchema },
    ]),
  ],
  providers: [InterviewService, InterviewRepository],
  controllers: [InterviewController],
})
export class InterviewModule {}
