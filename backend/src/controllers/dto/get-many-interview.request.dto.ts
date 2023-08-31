import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetManyInterviewRequestDTO {
  @IsNotEmpty()
  @IsString()
  offset: number;

  @IsNotEmpty()
  @IsString()
  limit: number;
}
