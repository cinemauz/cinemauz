import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
export class CreateAdminDto {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
