import {
  GetManyInterviewRequestDTO,
  UpdateInterviewRequestDTO,
} from '@controller/dto';
import { CreateInterviewRequestDTO } from '@controller/dto/create-interview-request.dto';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InterviewRepository } from '@repository/interview.repository';
import { InterviewStatus } from '@schema/enum';
import { InterviewDocument } from '@schema/interview.schema';

@Injectable()
export class InterviewService {
  logger = new Logger(InterviewService.name);

  constructor(
    @Inject(InterviewRepository)
    private readonly interviewRepository: InterviewRepository,
  ) {}

  async getManyInterview(params: GetManyInterviewRequestDTO): Promise<{
    result: InterviewDocument[];
    meta: { totalDocument: number };
  }> {
    const { limit, offset } = params;
    //todo cache on redis

    const [response, count] = await Promise.all([
      this.interviewRepository.find(
        { status: { $ne: InterviewStatus.ARCHIVED } },
        { limit, offset, sort: { createdAt: 'desc' } },
      ),
      this.interviewRepository.count({
        status: { $ne: InterviewStatus.ARCHIVED },
      }),
    ]);
    return { result: response, meta: { totalDocument: count } };
  }

  async getInterview(id: string) {
    //todo cache on redis
    const response = await this.interviewRepository.findById(id);

    return response;
  }

  async createInterview(payload: CreateInterviewRequestDTO) {
    //todo cache on redis
    const defaultStatus = InterviewStatus.TODO;
    const defaultUser = 'robinhood'; // should create separate module to manage user
    const response = await this.interviewRepository.create({
      ...payload,
      createdBy: defaultUser,
      status: defaultStatus,
    });
    return response;
  }

  async updateInterviewById(id: string, payload: UpdateInterviewRequestDTO) {
    //todo cache on redis
    const response = await this.interviewRepository.findByIdAndUpdate(
      id,
      payload,
    );

    return response;
  }

  async deleteInterviewById(id: string) {
    const response = await this.interviewRepository.findByIdAndDelete(id);

    return response;
  }

  async createComment(id: string, payload: any) {
    const interview = await this.interviewRepository.findById(id);
    if (interview.status === InterviewStatus.DONE)
      throw new Error(`This interview has been done`);

    const response = await this.interviewRepository.findByIdAndUpdate(id, {
      $push: { comments: payload },
    });

    return response;
  }
}
