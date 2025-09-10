import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Payment } from "src/config/payment.config";

export class CreatePaymentDto {
  @ApiPropertyOptional({
    description: 'To\'lov holati',
    enum: Payment,
    example: Payment.PAID
  })
  @IsOptional()
  @IsEnum(Payment)
  status?: Payment;

  @ApiPropertyOptional({
    description: 'To\'lov summasi',
    example: 49.99,
  })
  @IsNumber()
  @IsOptional()
  total_price: number;

  @ApiProperty({
    description: 'Buyurtma ID',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  order_id: number;
}
