import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { Country } from "src/config/country.config";
import { Languages } from "src/config/lang.config";

export class CreateMovieDto {
  @ApiProperty({
    description: 'Filmnig sarlavhasi',
    example: 'Inception',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'Filmnig tavsifi',
    example: 'A mind-bending thriller about dreams within dreams.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Filmnig davomiyligi (ISO 8601 formatida)',
    example: '1970-01-01T01:50:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  duration: Date;

  @ApiPropertyOptional({
    description: 'Filmnig chiqish sanasi',
    example: '2010-07-16',
  })
  @IsOptional()
  @IsDateString()
  realase_date?: Date;

  @ApiProperty({
    description: 'Filmnig rasmi URL',
    example: 'https://example.com/movie-image.jpg',
  })
  @IsUrl()
  @IsNotEmpty()
  image_url: string;

  @ApiProperty({
    description: 'Filmnig video URL',
    example: 'https://example.com/movie-video.mp4',
  })
  @IsUrl()
  @IsNotEmpty()
  video_url: string;

  @ApiPropertyOptional({
    description: 'Filmnig tili',
    enum: Languages,
  })
  @IsOptional()
  @IsEnum(Languages)
  language?: Languages;

  @ApiPropertyOptional({
    description: 'Filmnig mamlakati',
    enum: Country,
  })
  @IsOptional()
  @IsEnum(Country)
  country?: Country;

  @ApiProperty({
    description: 'Filmnig janri ID',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  genre_id: number;

  @ApiProperty({
    description: 'Filmnig admin ID',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  admin_id: number;
}
