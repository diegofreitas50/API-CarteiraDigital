import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    example: 'Fulano',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'fulano@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'P@$sw0rd',
  })
  password: string;

  @IsString()
  @ApiProperty({
    example: 'P@$sw0rd',
  })
  confirmPassword: string;

  @ApiProperty({
    example: '12345678912',
  })
  CPF_CNPJ: string;
}
