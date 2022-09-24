import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete dto.confirmPassword;

    const data: Prisma.UserCreateInput = {
      name: dto.name,
      CPF_CNPJ: dto.CPF_CNPJ,
      email: dto.email,
      password: await bcrypt.hash(dto.password, 10),
    };
    return this.prisma.user.create({
      data,
      select: {
        name: true,
        CPF_CNPJ: true,
        email: true,
        password: false,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        name: true,
        email: true,
        CPF_CNPJ: true,
        wallet: true,
      },
    });
  }

  async findOne(id: string) {
    const record = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!record) {
      throw new BadRequestException('ID inválido ou incorreto');
    }
    return record;
  }

  async update(user: User, dto: UpdateUserDto) {
    await this.findOne(user.id);

    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete dto.confirmPassword;

    const data: Prisma.UserUpdateInput = {
      name: dto.name,
      email: dto.email,
      password: await bcrypt.hash(dto.password, 10),
    };
    return this.prisma.user
      .update({
        where: { id: user.id },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
        },
      })
      .catch(/*handleError*/);
  }

  async delete(user: User) {
    const id = user.id;
    await this.prisma.user.delete({ where: { id } }).catch(/*handleError*/);
    throw new HttpException('Usuário deletado com sucesso!', 200);
  }
}
