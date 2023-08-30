import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  InterviewDocument,
  Interview as InterviewModel,
} from '@schema/interview.schema';
import { FilterQuery, Model } from 'mongoose';
import { Options } from './interface';

@Injectable()
export class InterviewRepository {
  logger = new Logger(InterviewRepository.name);

  constructor(
    @InjectModel(InterviewModel.name)
    private readonly interview: Model<InterviewModel>,
  ) {}

  async find<T>(
    params: FilterQuery<T>,
    options: Options<InterviewModel> = {
      offset: 0,
      limit: 20,
      sort: { createdAt: 1, updatedAt: -1 },
    },
  ): Promise<InterviewDocument[]> {
    const query = this.interview.find(params);

    if (options) {
      const { offset, limit, sort } = options;
      query.skip(offset);
      query.limit(limit);
      query.sort(sort);
      query.populate('comments');
    }

    return query;
  }

  async findById(id: string): Promise<InterviewDocument> {
    const response = await this.interview.findById(id);
    return response;
  }

  async findOne<T>(params: FilterQuery<T>): Promise<InterviewDocument> {
    const response = await this.interview.findOne(params);
    return response;
  }

  async create(payload: any): Promise<InterviewDocument> {
    const response = await this.interview.create(payload);
    return response;
  }

  async findByIdAndUpdate<T>(
    id: string,
    payload: any,
  ): Promise<InterviewDocument> {
    const response = await this.interview.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return response;
  }

  async findOneAndUpdate<T>(
    params: FilterQuery<T>,
    payload: any,
  ): Promise<InterviewDocument> {
    const response = await this.interview.findByIdAndUpdate(params, payload);
    return response;
  }

  async findByIdAndDelete(id: string): Promise<InterviewDocument> {
    const response = await this.interview.findByIdAndDelete(id);
    return response;
  }
}
