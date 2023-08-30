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

  @Get('/interview/:id')
  public async getInterviewComments(
    @Param('id') interviewId: string,
    @Query() params: GetInterviewCommentRequestDTO,
  ): Promise<StandardResponse> {
    const { limit, offset } = params;

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

  @Post(':id')
  public async createComment(
    @Param('id') interviewId: string,
    @Body() body: CreateCommentRequestDTO,
  ): Promise<StandardResponse> {
    const response = await this.commentService.createComment(interviewId, body);

    return {
      message: 'Create Comment Successfully',
      result: response,
    };
  }
}
