import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @Min(1)
  duration!: number;

  @IsNumber()
  @Min(0)
  price!: number;
}
