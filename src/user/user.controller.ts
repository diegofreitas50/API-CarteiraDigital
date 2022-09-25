import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags("Auth")
  @ApiOperation({
    summary: 'cadastrar usuário',
  })
  @Post('/create')
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @ApiTags("Users")
  @ApiOperation({
    summary: 'Buscar todos os usuários',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/all')
  findAll() {
    return this.userService.findAll();
  }

  @ApiTags("Users")
  @ApiOperation({
    summary: 'Buscar usuário pelo ID',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiTags("Users")
  @ApiOperation({
    summary: 'Alterar perfil de usuário logado',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch('/update')
  update(@LoggedUser() user: User, @Body() dto: UpdateUserDto) {
    return this.userService.update(user, dto);
  }

  @ApiTags("Users")
  @ApiOperation({
    summary: 'Exclui conta de usuário logado',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/delete')
  delete(@LoggedUser() user: User) {
    return this.userService.delete(user);
  }
}
