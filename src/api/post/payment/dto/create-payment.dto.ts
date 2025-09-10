import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Payment } from "src/config/payment.config";

export class CreatePaymentDto {

    @IsOptional()
    @IsEnum(Payment)
    status?: Payment;

    @IsNumber()
    @IsOptional()
    total_price: number;

    @IsInt()
    @IsNotEmpty()
    order_id: number;
}
