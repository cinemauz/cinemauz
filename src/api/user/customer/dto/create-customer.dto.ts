import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateCustomerDto {
      @MinLength(3)
      @IsString()
      @IsNotEmpty()
      name: string;
    
      @IsEmail()
      @IsString()
      @IsNotEmpty()
      email: string;
    
      @IsStrongPassword()
      @IsNotEmpty()
      password: string;
}
