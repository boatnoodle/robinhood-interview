import { CreateCommentRequestDTO } from '@controller/dto';
import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { CommentService } from '@service/comment/comment.service';

@Controller('comment')
export class CommentController {
  logger = new Logger(CommentController.name);

  constructor(
    @Inject(CommentService)
    private readonly commentService: CommentService,
  ) {}

  @Post(':id')
  public async createComment(
    @Param('id') interviewId: string,
    @Body() body: CreateCommentRequestDTO,
  ): Promise<any> {
    const response = await this.commentService.createComment(interviewId, body);
    return response;
  }
}
