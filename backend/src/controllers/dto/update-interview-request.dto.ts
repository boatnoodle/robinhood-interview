import { InterviewStatus } from '@schema/enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateInterviewRequestDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(InterviewStatus)
  @IsOptional()
  status?: string;
}
