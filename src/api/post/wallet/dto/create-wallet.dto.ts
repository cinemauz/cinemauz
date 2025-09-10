import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateWalletDto {
  // ------------------------------ CARD NAME------------------------------
  @ApiPropertyOptional({
    description: 'Karta nomi',
    example: 'Visa Platinum',
  })
  @IsString()
  @IsOptional()
  card_name: string;

  // ------------------------------ CARD NUMBER ------------------------------
  @ApiProperty({
    description: 'Karta raqami',
    example: 1234567890123456,
  })
  @IsInt()
  @IsNotEmpty()
  card_number: number;

  // ------------------------------ BALANCE ------------------------------
  @ApiProperty({
    description: 'Hisobdagi balans',
    example: 1000.5,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  balance: number;

  // ------------------------------ CUSTOMER ID ------------------------------
  @ApiProperty({
    description: 'Mijoz ID',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  customer_id: number;
}
