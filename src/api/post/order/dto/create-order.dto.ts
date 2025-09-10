import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Buyurtma miqdori',
    example: 2,
  })
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    description: 'Mijoz ID',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  customer_id: number;

  @ApiProperty({
    description: 'Bilet ID',
    example: 10,
  })
  @IsInt()
  @IsNotEmpty()
  ticket_id: number;

  @ApiPropertyOptional({
    description: 'Buyurtma holati (true = tasdiqlangan, false = kutilmoqda)',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @ApiPropertyOptional({
    description: 'Buyurtma umumiy narxi',
    example: 49.99,
  })
  @IsNumber()
  @IsOptional()
  total_price: number;
}
