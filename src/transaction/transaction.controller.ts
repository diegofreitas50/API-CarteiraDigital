import {
  Body, Controller,
  Get, Param, Patch, Post, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionService } from './transaction.service';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiTags('Transaction')
  @ApiOperation({
    summary: 'Realizar uma transação',
  })
  @Post('/pay')
  create(@LoggedUser() user: User, @Body() dto: CreateTransactionDto) {
    return this.transactionService.create(user, dto);
  }

  @ApiTags('Transaction')
  @ApiOperation({
    summary: 'Histórico de todas as transações do usuário logado',
  })
  @Get('/extract')
  findAll(@LoggedUser() user: User) {
    return this.transactionService.findAll(user);
  }

  @ApiTags('Transaction')
  @ApiOperation({
    summary: 'Localizar transação pelo ID',
  })
  @Get('/:id')
  findOne(@LoggedUser() user: User, @Param('id') id: string) {
    return this.transactionService.findOne(user, id);
  }

  @ApiTags('Logista')
  @ApiOperation({
    summary: 'Estornar transação por ID (logista)',
  })
  @Post('/reversal/:id')
  update(
    @LoggedUser() user:User,
    @Param('id') id: string,
  ) {
    return this.transactionService.update(user, id);
  }
}
