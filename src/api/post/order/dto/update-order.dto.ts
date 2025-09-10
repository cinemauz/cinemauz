import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOrderDto {
  @ApiPropertyOptional({ example: 1, description: 'Customer ID' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  customerId?: number;

  @ApiPropertyOptional({ example: 2, description: 'Ticket ID' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  ticketId?: number;

  @ApiPropertyOptional({ example: 3, description: 'Quantity of tickets' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  quantity?: number;

  @ApiPropertyOptional({ example: 250.5, description: 'Total price of the order' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  total_price?: number;

  @ApiPropertyOptional({ example: true, description: 'Order status' })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  status?: boolean;
}
