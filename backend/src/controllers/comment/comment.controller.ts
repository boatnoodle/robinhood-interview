import {
  CreateCommentRequestDTO,
  GetInterviewCommentRequestDTO,
} from '@controller/dto';
import {
  StandardResponse,
  TransformInterceptor,
} from '@interceptor/transform-response.interceptor';
import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CommentService } from '@service/comment/comment.service';

@Controller('comment')
@UseInterceptors(TransformInterceptor)
export class CommentController {
  logger = new Logger(CommentController.name);

  constructor(
    @Inject(CommentService)
    private readonly commentService: CommentService,
  ) {}

  @Get()
  public async getInterviewComments(
    @Query() params: GetInterviewCommentRequestDTO,
  ): Promise<StandardResponse> {
    const { interviewId, limit, offset } = params;

    const response = await this.commentService.getInterviewComments(
      interviewId,
      {
        limit,
        offset,
      },
    );

    return {
      message: 'Get Interview Comments Successfully',
      result: response.result,
      meta: response.meta,
    };
  }

  @Post()
  public async createComment(
    @Body() body: CreateCommentRequestDTO,
  ): Promise<StandardResponse> {
    const response = await this.commentService.createComment(body);

    return {
      message: 'Create Comment Successfully',
      result: response,
    };
  }
}
