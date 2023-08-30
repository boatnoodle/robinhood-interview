import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentRequestDTO {
  @IsNotEmpty()
  @IsString()
  comment: string;
}
