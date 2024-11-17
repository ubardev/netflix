import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title?: string;

  // @IsNotEmpty()
  // @IsOptional()
  // genre?: string;

  @IsNotEmpty()
  @IsOptional()
  detail?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  directorId?: number;
}
