import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInterviewRequestDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
