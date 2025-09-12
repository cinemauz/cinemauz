import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class EmailWithOtp {
    // --------------------------------------- EMAIL ---------------------------------------
    @ApiProperty({
        description: 'Tizimga kirish uchun tasdidlash uchun Email',
        example: 'www.komol8689@gmail.com',
    })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string

    // --------------------------------------- OTP ---------------------------------------
    @ApiProperty({
        description: 'Tasdiqlash uchun otp',
        example: 123456,
    })
    @IsNumber()
    @IsOptional()
    otp?: number
}