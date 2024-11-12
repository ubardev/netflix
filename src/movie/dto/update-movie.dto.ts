import {
  Equals,
  IsDefined,
  IsEmpty,
  IsIn,
  IsNotEmpty,
  IsNotIn,
  IsOptional,
  NotEquals,
} from 'class-validator';

export class UpdateMovieDto {
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsNotEmpty()
  @IsOptional()
  genre?: string;

  /// null || undefined
  // @IsDefined()
  // @IsOptional()
  // @Equals('code factory')
  // @NotEquals('code factory')
  // @IsEmpty()
  // @IsNotEmpty()
  /// Array
  // @IsIn(['action', 'fantasy'])
  // @IsNotIn(['action', 'fantasy'])
  test: string;
}
