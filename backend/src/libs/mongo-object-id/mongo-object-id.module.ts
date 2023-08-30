import { Module } from '@nestjs/common';
import { MongoObjectIdService } from './mongo-object-id.service';

@Module({
  providers: [MongoObjectIdService],
  exports: [MongoObjectIdService],
})
export class MongoObjectIdModule {}
