import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/handleError.util';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, dto: CreateTransactionDto) {
    if (user.logist) {
      throw new UnauthorizedException(
        'Perfil de logista não tem permissão para esta transação',
      );
    }

    const receiver = await this.prisma.user.findUnique({
      where: { id: dto.payeeID },
    });

    if (dto.value > user.wallet) {
      throw new UnauthorizedException(
        'Você não tem saldo sulficiente para esta transação!',
      );
    }

    if (!receiver) {
      throw new NotFoundException(
        `Registro com o '${dto.payeeID}' não encontrado.`,
      );
    }

    const data: Prisma.TransactionCreateInput = {
      payerID: user.id,
      payee: {
        connect: {
          id: dto.payeeID,
        },
      },
      value: dto.value,
    };

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        wallet: user.wallet - dto.value,
      },
    });

    await this.prisma.user.update({
      where: { id: receiver.id },
      data: {
        wallet: receiver.wallet + dto.value,
      },
    });

    return this.prisma.transaction
      .create({
        data,
        select: {
          id: true,
          payerID: true,
          payee: {
            select: {
              id: true,
              name: true,
            },
          },
          value: true,
        },
      })
      .catch(handleError);
  }

  async findAll(user: User) {
    const allTransactionPayer = await this.prisma.transaction.findMany({
      where: { payerID: user.id },
      select: {
        id: true,
        payerID: true,
        payee: {
          select: {
            id: true,
            name: true,
          },
        },
        value: true,
      },
    });

    const allTransactionPayee = await this.prisma.transaction.findMany({
      where: { payeeID: user.id },
      select: {
        id: true,
        payerID: true,
        payee: {
          select: {
            id: true,
            name: true,
          },
        },
        value: true,
      },
    });

    if (allTransactionPayer.length === 0 && allTransactionPayee.length === 0) {
      throw new NotFoundException('Não há registros de transações');
    }

    const allTransactions = [allTransactionPayee, allTransactionPayer]

    return (allTransactions);
  }

  async findOne(user: User, id: string) {
    const data = await this.prisma.transaction.findUnique({
      where: { id },
      select: {
        id: true,
        payerID: true,
        payee: { select: { id: true, name: true } },
        value: true,
      },
    });

    if (user.id !== data.payee.id && user.id !== data.payerID) {
      throw new UnauthorizedException(
        'Você não tem permissão para acessar essa transação!',
      );
    }

    if (!data) {
      throw new NotFoundException(`Registro com id '${id}' não encontrado.`);
    }

    return data;
  }

  async update(user: User, id: string) {
    if (!user.logist) {
      throw new UnauthorizedException(
        'Somente logistas têm permissão para esta transação',
      );
    }

    const transaction = await this.prisma.transaction.findUnique({
      where: { id: id },
    });
    const receiver = await this.prisma.user.findUnique({
      where: { id: transaction.payerID },
    });
    const reversePayer = await this.prisma.user.findUnique({
      where: { id: transaction.payeeID },
    });

    const data: Prisma.TransactionCreateInput = {
      payerID: transaction.payeeID,
      payee: {
        connect: {
          id: transaction.payerID,
        },
      },
      value: transaction.value,
      isReverse: true,
    };

    await this.prisma.user.update({
      where: { id: reversePayer.id },
      data: {
        wallet: reversePayer.wallet - transaction.value,
      },
    });

    await this.prisma.user.update({
      where: { id: receiver.id },
      data: {
        wallet: receiver.wallet + transaction.value,
      },
    });

    return this.prisma.transaction
      .create({
        data,
        select: {
          payerID: true,
          payee: {
            select: {
              id: true,
              name: true,
            },
          },
          value: true,
        },
      })
      .catch(handleError);
  }
}
