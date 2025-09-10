import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Mijozning to‘liq ismi',
    example: 'Alice Johnson',
    minLength: 3,
  })
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Mijozning email manzili',
    example: 'alice@example.com',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Mijozning kuchli paroli',
    example: 'Str0ngP@ssword!',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
