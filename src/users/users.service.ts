/**
 * @file: user.service.ts
 * @description: This file is responsible for the service layer of the users module.
 * @author: Emre KILIÇ - (https://github.com/adorratm)
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Get one user by id
  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  // Create a user in the database
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  // Update a user in the database
  async updateUser(id: any, updateUserDto: UpdateUserDto): Promise<User | null> {
    let user = await this.userRepository.findOne({where:{id}});
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    await this.userRepository.update(id, updateUserDto);
    user = await this.userRepository.findOne({where:{id}});
    return user;
  }

  // Delete a user from the database
  async deleteById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    await this.userRepository.remove(user);
    return user;
  }
}
