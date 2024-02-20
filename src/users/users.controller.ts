import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/middlewares/role.guard';
import { Role } from 'src/middlewares/role.decorator';
import * as Joi from '@hapi/joi';
import { JoiValidationPipe } from 'src/middlewares/joi-validation.pipe';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Role(2) // Role 2 is for admin
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.getAllUsers();
    return users;
  }

  @Role(2) // Role 2 is for admin
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    const user = await this.usersService.getUserById(+id);
    return user;
  }

  @Role(2) // Role 2 is for admin
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Post()
  @UsePipes(new JoiValidationPipe(Joi.object({
    first_name: Joi.string().min(2).max(70).required(),
    last_name: Joi.string().min(2).max(70).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.number().required()
  }))) // Joi validation for the request body
  async create(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    const newUser = await this.usersService.createUser(createUserDto);
    return newUser;
  }

  @Role(2) // Role 2 is for admin
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Patch(':id')
  @UsePipes(new JoiValidationPipe(Joi.object({
    first_name: Joi.string().min(2).max(70),
    last_name: Joi.string().min(2).max(70),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    role: Joi.number()
  }))) // Joi validation for the request body
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if(updateUserDto.password) {
      const hashedPassword = bcrypt.hashSync(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }
    const updatedUser = await this.usersService.updateUser(+id, updateUserDto);
    return updatedUser;
  }

  @Role(2) // Role 2 is for admin
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Delete(':id')
  async deleteById(@Param('id') id: string) : Promise<User> {
    const user = await this.usersService.deleteById(+id);
    return user;
  }
}
