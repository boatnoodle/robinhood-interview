import { CreateCommentRequestDTO } from '@controller/dto';
import { MongoObjectIdService } from '@libs/mongo-object-id';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CommentRepository } from '@repository/comment.repository';
import { InterviewRepository } from '@repository/interview.repository';
import { CommentDocument } from '@schema/comment.schema';
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

  async getInterviewComments(
    interviewId: string,
    options: any,
  ): Promise<{ result: CommentDocument[]; meta: { totalDocument: number } }> {
    const interview = await this.interviewRepository.findById(interviewId);
    if (!interview)
      throw new HttpException(
        `Couldn't found this ${interviewId} interview`,
        HttpStatus.NOT_FOUND,
      );

    if (
      interview.status === InterviewStatus.DONE ||
      interview.status === InterviewStatus.ARCHIVED
    )
      throw new HttpException(
        `This interview is not available`,
        HttpStatus.FORBIDDEN,
      );

    //todo cache on redis
    const interviewMongoId = this.mongoObjectIdService.toObjectId(interviewId);

    const [response, count] = await Promise.all([
      this.commentRepository.find(
        { interviewId: interviewMongoId },
        {
          ...options,
          sort: { createdAt: 'desc' },
        },
      ),
      this.commentRepository.count({
        interviewId: interviewMongoId,
      }),
    ]);

    return { result: response, meta: { totalDocument: count } };
  }

  async createComment(payload: CreateCommentRequestDTO) {
    const { interviewId, comment } = payload;

    const interview = await this.interviewRepository.findById(interviewId);
    if (!interview)
      throw new HttpException(
        `Couldn't found this ${interviewId} interview`,
        HttpStatus.NOT_FOUND,
      );

    if (
      interview.status === InterviewStatus.DONE ||
      interview.status === InterviewStatus.ARCHIVED
    )
      throw new HttpException(
        `This interview is unavailable`,
        HttpStatus.FORBIDDEN,
      );

    // todo doing transactional
    // create comment
    const defaultStatus = CommentStatus.APPROVED;
    const defaultUser = 'robinhood'; // should create separate module to manage user
    const createdComment = await this.commentRepository.create({
      interviewId: this.mongoObjectIdService.toObjectId(interviewId),
      comment,
      status: defaultStatus,
      createdBy: defaultUser,
    });

    // add to interview
    await this.interviewRepository.findByIdAndUpdate(interviewId, {
      $push: { comments: createdComment },
    });

    return createdComment;
  }
}
