import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Xona nomi',
    example: 'VIP Hall',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Xona joylashuvi',
    example: '1st Floor, Building A',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'Xonadagi umumiy o‘rindiqlar soni',
    example: 120,
  })
  @IsNumber()
  @IsNotEmpty()
  total_seats: number;
}
