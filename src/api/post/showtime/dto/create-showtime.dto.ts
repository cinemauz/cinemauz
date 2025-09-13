import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class CreateShowtimeDto {
  // ------------------------------ MOVIE ID ------------------------------
  @ApiProperty({
    description: 'Film ID',
    example: 10,
  })
  @IsInt()
  @IsNotEmpty()
  movie_id: number;

  // ------------------------------ STOCK QUANTITY ------------------------------
  @ApiProperty({
    description: 'Biletlar soni',
    example: 100,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  ticket_quantity: number;

  // ------------------------------ ROOM ID ------------------------------
  @ApiProperty({
    description: 'Xona ID',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  room_id: number;

  // ------------------------------ START TIME ------------------------------
  @ApiProperty({
    description: 'Filmnig boshlanish vaqti (HH:mm:ss formatida)',
    example: '13:00:00',
  })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: 'Begin movie time must be in HH:mm:ss format',
  })
  @IsString()
  @IsNotEmpty()
  start_time: string;

  // ------------------------------ END TIME ------------------------------

  @ApiProperty({
    description: 'Filmnig tugash vaqti (HH:mm:ss formatida)',
    example: '15:00:00',
  })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: 'End movie time must be in HH:mm:ss format',
  })
  @IsString()
  @IsNotEmpty()
  end_time: string;

  // ------------------------------ IS ACTIVE ------------------------------
  @ApiPropertyOptional({
    description: "Showtime faol yoki yo'qligi",
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  // ------------------------------ SEAT QUANTITY------------------------------

  @IsInt()
  @IsOptional()
  seat_qantity?: number;
}
