import { IsOptional, IsString } from 'class-validator';

export class CreateBarberDto {
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  specialty?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
