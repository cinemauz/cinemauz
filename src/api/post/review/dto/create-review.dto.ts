import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
  @ApiPropertyOptional({
    description: 'Mijozning sharhi',
    example: 'Ajoyib film, juda yoqdi!',
  })
  @IsString()
  @IsOptional()
  comment: string;

  @ApiPropertyOptional({
    description: 'Filmdan baho (1 dan 5 gacha)',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating: number;

  @ApiProperty({
    description: 'Mijoz ID',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  customer_id: number;

  @ApiProperty({
    description: 'Film ID',
    example: 10,
  })
  @IsInt()
  @IsNotEmpty()
  movie_id: number;
}
