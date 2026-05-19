import { IsOptional, IsString } from 'class-validator';

export class UpdateBarberDto {
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
