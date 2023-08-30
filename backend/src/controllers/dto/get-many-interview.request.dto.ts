import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetManyInterviewRequestDTO {
  @IsNotEmpty()
  @IsNumber()
  offset: number;

  @IsNotEmpty()
  @IsNumber()
  limit: number;
}
