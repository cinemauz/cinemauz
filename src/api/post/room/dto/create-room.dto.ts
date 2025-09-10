import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRoomDto {
  @ApiProperty({ example: 'Room A', description: 'Room name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '1st Floor', description: 'Room location' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 100, description: 'Total seats in room' })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  total_seats: number;

  @ApiProperty({ example: true, description: 'Is room active?', required: false })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  is_active?: boolean;
}
