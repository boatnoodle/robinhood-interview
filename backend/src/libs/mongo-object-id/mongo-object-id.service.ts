import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import mongoose, { Types } from 'mongoose';

@Injectable()
export class MongoObjectIdService {
  public toObjectId(id: string): Types.ObjectId {
    if (!this.isValidObjectId(id))
      new UnprocessableEntityException('Invalid object id');

    return new mongoose.Types.ObjectId(id);
  }

  public isValidObjectId(id: Types.ObjectId | string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
  }

  public isEqual(
    fromId: Types.ObjectId | string,
    toId: Types.ObjectId | string,
  ): boolean {
    let id1 = fromId;
    let id2 = toId;

    if (!this.isValidObjectId(id1) || !this.isValidObjectId(id2))
      new UnprocessableEntityException('Invalid object id');

    if (typeof id1 === 'string') id1 = this.toObjectId(id1);
    if (typeof id2 === 'string') id2 = this.toObjectId(id2);

    return id1.equals(id2);
  }
}
