import { InterviewStatus } from '@schema/enum';
import { IsEnum, IsString } from 'class-validator';

export class UpdateInterviewRequestDTO {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsEnum(InterviewStatus)
  status?: string;
}
