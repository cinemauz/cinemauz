import { IsNotEmpty, IsNumber, IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreateOrderDto {

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsInt()
  @IsNotEmpty()
  customer_id: number;

  @IsInt()
  @IsNotEmpty()
  ticket_id: number;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @IsNumber()
  @IsOptional()
  total_price: number
}
