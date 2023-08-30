import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetInterviewCommentRequestDTO {
  @IsNotEmpty()
  @IsNumber()
  offset: number;

  @IsNotEmpty()
  @IsNumber()
  limit: number;
}
