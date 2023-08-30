import {
  GetManyInterviewRequestDTO,
  GetManyInterviewResponseDTO,
  UpdateInterviewRequestDTO,
} from '@controller/dto';
import { CreateInterviewRequestDTO } from '@controller/dto/create-interview-request.dto';
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
} from '@nestjs/common';
import { InterviewService } from '@service/interview';

@Controller('interview')
export class InterviewController {
  logger = new Logger(InterviewController.name);

  constructor(
    @Inject(InterviewService)
    private readonly interviewService: InterviewService,
  ) {}

  @Get()
  public async getManyInterview(
    @Body() body: GetManyInterviewRequestDTO,
  ): Promise<GetManyInterviewResponseDTO> {
    const response = await this.interviewService.getManyInterview(body);
    return response;
  }

  @Get(':id')
  public async getInterview(
    @Param('id') id: string,
  ): Promise<GetManyInterviewResponseDTO> {
    const response = await this.interviewService.getInterview(id);
    return response;
  }

  @Post()
  public async createInterview(
    @Body() body: CreateInterviewRequestDTO,
  ): Promise<GetManyInterviewResponseDTO> {
    const response = await this.interviewService.createInterview(body);
    return response;
  }

  @Put(':id')
  public async updateInterview(
    @Param('id') id: string,
    @Body() body: UpdateInterviewRequestDTO,
  ): Promise<GetManyInterviewResponseDTO> {
    const response = await this.interviewService.updateInterviewById(id, body);
    return response;
  }

  @Delete(':id')
  public async deleteInterview(
    @Param('id') id: string,
  ): Promise<GetManyInterviewResponseDTO> {
    const response = await this.interviewService.deleteInterviewById(id);
    return response;
  }
}
