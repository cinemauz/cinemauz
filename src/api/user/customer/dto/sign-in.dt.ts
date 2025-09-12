import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class SignInCustomer{
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string
}