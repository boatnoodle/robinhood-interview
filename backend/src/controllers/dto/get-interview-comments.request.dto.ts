import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetInterviewCommentRequestDTO {
  @IsNotEmpty()
  @IsString()
  interviewId: string;

  @IsNotEmpty()
  @IsString()
  offset: number;

  @IsNotEmpty()
  @IsString()
  limit: number;
}
