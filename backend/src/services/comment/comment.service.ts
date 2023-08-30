import { CreateCommentRequestDTO } from '@controller/dto';
import { MongoObjectIdService } from '@libs/mongo-object-id';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommentRepository } from '@repository/comment.repository';
import { InterviewRepository } from '@repository/interview.repository';
import { CommentStatus, InterviewStatus } from '@schema/enum';

@Injectable()
export class CommentService {
  logger = new Logger(CommentService.name);

  constructor(
    @Inject(CommentRepository)
    private readonly commentRepository: CommentRepository,
    @Inject(InterviewRepository)
    private readonly interviewRepository: InterviewRepository,
    @Inject(MongoObjectIdService)
    private readonly mongoObjectIdService: MongoObjectIdService,
  ) {}

  async createComment(interviewId: string, payload: CreateCommentRequestDTO) {
    const interview = await this.interviewRepository.findById(interviewId);
    if (interview.status === InterviewStatus.DONE)
      throw new Error('Interview has been done');

    // todo doing transactional

    // create comment
    const defaultStatus = CommentStatus.APPROVED;
    const comment = await this.commentRepository.create({
      interviewId: this.mongoObjectIdService.toObjectId(interviewId),
      status: defaultStatus,
      ...payload,
    });

    // add to interview
    await this.interviewRepository.findByIdAndUpdate(interviewId, {
      $push: { comments: comment },
    });

    return comment;
  }

  // todo
  async updateComment() {}

  // todo
  async deleteComment() {}
}
