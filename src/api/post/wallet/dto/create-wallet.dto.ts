import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateWalletDto {
    @IsString()
    @IsOptional()
    card_name: string;

    @IsInt()
    @IsNotEmpty()
    card_number: number;

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    balance: number;

    @IsInt()
    @IsNotEmpty()
    customer_id: number;
}
