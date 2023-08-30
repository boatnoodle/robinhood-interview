import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CommentDocument, Comment as CommentModel } from 'src/schemas';
import { Options } from './interface';

@Injectable()
export class CommentRepository {
  logger = new Logger(CommentRepository.name);

  constructor(
    @InjectModel(CommentModel.name)
    private readonly comment: Model<CommentModel>,
  ) {}

  async find<T>(
    params: FilterQuery<T>,
    options: Options<CommentModel> = {
      offset: 0,
      limit: 20,
      sort: { createdAt: 1, updatedAt: -1 },
    },
  ): Promise<CommentDocument[]> {
    const query = this.comment.find(params);

    if (options) {
      const { offset, limit, sort } = options;
      query.skip(offset);
      query.limit(limit);
      query.sort(sort);
    }

    return query;
  }

  async findById(id: string): Promise<CommentDocument> {
    const response = await this.comment.findById(id);
    return response;
  }

  async findOne<T>(params: FilterQuery<T>): Promise<CommentDocument> {
    const response = await this.comment.findOne(params);
    return response;
  }

  async create(payload: any): Promise<CommentDocument> {
    const response = await this.comment.create(payload);
    return response;
  }

  async findByIdAndUpdate<T>(
    id: string,
    payload: any,
  ): Promise<CommentDocument> {
    const response = await this.comment.findByIdAndUpdate(id, payload);
    return response;
  }

  async findOneAndUpdate<T>(
    params: FilterQuery<T>,
    payload: any,
  ): Promise<CommentDocument> {
    const response = await this.comment.findByIdAndUpdate(params, payload);
    return response;
  }

  async findByIdAndDelete(id: string): Promise<CommentDocument> {
    const response = await this.comment.findByIdAndDelete(id);
    return response;
  }
}
