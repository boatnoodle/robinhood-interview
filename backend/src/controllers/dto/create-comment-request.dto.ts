import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentRequestDTO {
  @IsNotEmpty()
  @IsString()
  interviewId: string;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
