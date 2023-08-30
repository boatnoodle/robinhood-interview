import {
  GetManyInterviewRequestDTO,
  UpdateInterviewRequestDTO,
} from '@controller/dto';
import { CreateInterviewRequestDTO } from '@controller/dto/create-interview-request.dto';
import {
  StandardResponse,
  TransformInterceptor,
} from '@interceptor/transform-response.interceptor';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { InterviewService } from '@service/interview';

@Controller('interview')
@UseInterceptors(TransformInterceptor)
export class InterviewController {
  logger = new Logger(InterviewController.name);

  constructor(
    @Inject(InterviewService)
    private readonly interviewService: InterviewService,
  ) {}

  @Get()
  public async getManyInterview(
    @Query() params: GetManyInterviewRequestDTO,
  ): Promise<StandardResponse> {
    const response = await this.interviewService.getManyInterview(params);

    return {
      message: 'Get Interviews successfully',
      result: response.result,
      meta: response.meta,
    };
  }

  @Get(':id')
  public async getInterview(
    @Param('id') id: string,
  ): Promise<StandardResponse> {
    const response = await this.interviewService.getInterview(id);

    return { message: 'Get Interview Successfully', result: response };
  }

  @Post()
  public async createInterview(
    @Body() body: CreateInterviewRequestDTO,
  ): Promise<StandardResponse> {
    const response = await this.interviewService.createInterview(body);

    return { message: 'Create Interview Successfully', result: response };
  }

  @Put(':id')
  public async updateInterview(
    @Param('id') id: string,
    @Body() body: UpdateInterviewRequestDTO,
  ): Promise<StandardResponse> {
    const response = await this.interviewService.updateInterviewById(id, body);

    return { message: 'Update Interview Successfully', result: response };
  }

  @Delete(':id')
  public async deleteInterview(
    @Param('id') id: string,
  ): Promise<StandardResponse> {
    const response = await this.interviewService.deleteInterviewById(id);

    return { message: 'Delete Interview Successfully', result: response };
  }
}
