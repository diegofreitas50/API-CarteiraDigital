import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags("Auth")
  @ApiOperation({
    summary: 'cadastrar usuário',
  })
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiTags("Users")
  @ApiOperation({
    summary: 'Buscar todos os usuários',
  })
  @Get('/all')
  findAll() {
    return this.userService.findAll();
  }

  @ApiTags("Users")
  @ApiOperation({
    summary: 'Buscar usuário pelo ID',
  })
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiTags("Users")
  @ApiOperation({
    summary: 'Alterar perfil de usuário logado',
  })
  @Patch('/update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @ApiTags("Users")
  @ApiOperation({
    summary: 'Exclui conta de usuário logado',
  })
  @Delete('/delete')
  remove() {
    return this.userService.remove();
  }
}
