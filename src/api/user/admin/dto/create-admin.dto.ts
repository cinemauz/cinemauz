import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: 'Adminning ismi',
    example: 'John Doe',
    minLength: 3,
  })
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Adminning username',
    example: 'johndoe123',
    minLength: 3,
  })
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Adminning kuchli paroli',
    example: 'Str0ngP@ssword!',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
