import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Fulano',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'email do usuário',
    example: 'fulano@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'senha do usuário',
    example: 'P@$sw0rd',
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'confirme a senha',
    example: 'P@$sw0rd',
  })
  confirmPassword: string;

  @ApiProperty({
    description: 'CPF ou CNPJ do usuário. Obs.: Digite Apenas números!',
    example: '12345678912',
  })
  CPF_CNPJ: string;
}
