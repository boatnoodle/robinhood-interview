import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommentModule, InterviewModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    InterviewModule,
    CommentModule,
  ],
})
export class AppModule {}
