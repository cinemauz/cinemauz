import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({ description: 'Joy raqami', example: 'A12' })
  @IsString()
  @IsNotEmpty()
  seat_number: string;

  @ApiProperty({ description: 'Bilet narxi', example: 50000 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: 'Showtime ID', example: 3 })
  @IsInt()
  @IsNotEmpty()
  showtime_id: number;

  @ApiProperty({ description: 'Holati (faol yoki yo‘q)', example: true })
  @IsBoolean()
  status: boolean;
}
