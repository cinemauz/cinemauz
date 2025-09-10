import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreateOrderDto {
  // ------------------------------ QUANTITY ------------------------------
  @ApiProperty({
    description: 'Buyurtma miqdori',
    example: 2,
  })
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  // ------------------------------ CUSTOMER ID ------------------------------
  @ApiProperty({
    description: 'Mijoz ID',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  customer_id: number;

  // ------------------------------ TICKET ID ------------------------------
  @ApiProperty({
    description: 'Bilet ID',
    example: 10,
  })
  @IsInt()
  @IsNotEmpty()
  ticket_id: number;

  // ------------------------------ STATUS ------------------------------
  @ApiPropertyOptional({
    description: 'Buyurtma holati (true = tasdiqlangan, false = kutilmoqda)',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  status?: boolean;

  // ------------------------------ TOTAL PRICE ------------------------------
  @ApiPropertyOptional({
    description: 'Buyurtma umumiy narxi',
    example: 49.99,
  })
  @IsNumber()
  @IsOptional()
  total_price: number;
}
