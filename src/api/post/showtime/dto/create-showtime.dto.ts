import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, Min } from "class-validator";

export class CreateShowtimeDto {
  @ApiProperty({
    description: 'Film ID',
    example: 10,
  })
  @IsInt()
  @IsNotEmpty()
  movie_id: number;

  @ApiProperty({
    description: 'Biletlar soni',
    example: 100,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  stock_quantity: number;

  @ApiProperty({
    description: 'Xona ID',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  room_id: number;

  @ApiProperty({
    description: 'Showtime boshlanish vaqti (ISO 8601 formatida)',
    example: '2025-09-10T18:30:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  start_time: Date;

  @ApiProperty({
    description: 'Showtime tugash vaqti (ISO 8601 formatida)',
    example: '2025-09-10T20:30:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  end_time: Date;

  @ApiPropertyOptional({
    description: 'Showtime faol yoki yo\'qligi',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
