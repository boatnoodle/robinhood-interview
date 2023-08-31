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
    const response = await this.interviewRepository.findById(id);

    return response;
  }

  async createInterview(payload: CreateInterviewRequestDTO) {
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
}
