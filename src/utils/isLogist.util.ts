import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export function isAdmin(user: User) {
  if (user.logist) {
    throw new UnauthorizedException('Perfil de logista não tem permissão para esta transação');
  }
}