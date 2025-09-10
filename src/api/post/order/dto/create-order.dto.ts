import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @ApiProperty({ example: 1, description: 'Customer ID' })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  customerId: number;

  @ApiProperty({ example: 2, description: 'Ticket ID' })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  ticketId: number;

  @ApiProperty({ example: 3, description: 'Quantity of tickets' })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: 250.5, description: 'Total price of the order' })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  total_price: number;

  @ApiProperty({ example: true, description: 'Order status', required: false })
  @IsBoolean()
  @Type(() => Boolean)
  status?: boolean;
}
