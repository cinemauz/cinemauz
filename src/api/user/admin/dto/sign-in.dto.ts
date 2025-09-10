import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class SignInAdminDto {
  // --------------------------------------- USERNAME ---------------------------------------
  @ApiProperty({
    description: 'Adminning username',
    example: 'johndoe123',
    minLength: 3,
  })
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  username: string;

  // --------------------------------------- PASSSWORD ---------------------------------------
  @ApiProperty({
    description: 'Adminning kuchli paroli',
    example: 'Str0ngP@ssword!',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
