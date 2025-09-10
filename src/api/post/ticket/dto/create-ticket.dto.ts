import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class CreateTicketDto {
  @ApiProperty({
    description: 'Bilet narxi',
    example: 15.50,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Showtime ID',
    example: 5,
  })
  @IsInt()
  @IsNotEmpty()
  showtime_id: number;

  @ApiPropertyOptional({
    description: 'Bilet holati (true = mavjud, false = sotilgan)',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
