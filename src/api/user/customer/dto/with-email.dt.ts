import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class EmailWithOtp{
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email:string

    @IsNumber()
    @IsOptional()
    otp:number
}