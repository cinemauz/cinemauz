import { IsNotEmpty,IsString, IsStrongPassword } from "class-validator";

export class ForgetPassword{

    @IsString()
    @IsNotEmpty()
    old_password:string

    @IsStrongPassword()
    @IsString()
    @IsNotEmpty()
    new_password:string
}