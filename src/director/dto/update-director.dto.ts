import { PartialType } from '@nestjs/swagger';
import { CreateDirectorDto } from './create-director.dto';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateDirectorDto {
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  @IsDateString()
  dob?: Date;

  @IsNotEmpty()
  nationality?: string;
}
