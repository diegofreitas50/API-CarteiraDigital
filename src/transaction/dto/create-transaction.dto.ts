import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @ApiProperty({
    description: 'ID do recebedor',
    example: '0c4b59bb-e169-40a4-81f5-4c34d2c2ca4b',
  })
  payeeID: string;

  @IsNumber()
  @ApiProperty({
    description: 'Valor da transação',
    example: '100',
  })
  value: number;
}
