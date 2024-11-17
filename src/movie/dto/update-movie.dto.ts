import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateMovieDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @IsOptional()
  genreIds?: number[];

  @IsNotEmpty()
  @IsOptional()
  detail?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  directorId?: number;
}
