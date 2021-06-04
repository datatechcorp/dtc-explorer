import { IsMongoId, IsString, Length } from 'class-validator';
import { Expose } from 'class-transformer';

export class AddCommentDto {
  @IsMongoId()
  @Expose()
  support_id: string;

  @IsString()
  @Expose()
  @Length(2)
  content: string;
}
