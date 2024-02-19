/**
 * @file: users.service.ts
 * @description: This file is responsible for the service layer of the users module.
 * @author: Emre KILIÇ - (https://github.com/adorratm)
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

// Injectable: This is a basic service decorator
// InjectRepository: This is a basic repository injection decorator
// Repository: This is a basic repository type
// User: This is a basic user entity

@Injectable()
export class UsersService {

    // Inject the user repository
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }


    // Find all users
    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    // Find one user by email
    async findOne(email: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({ where: { email } });
        return user ?? undefined;
    }

    // Create a user in the database
    async create(userData: Partial<User>): Promise<User> {
        const newUser = this.userRepository.create(userData);
        return this.userRepository.save(newUser);
    }

    // Update a user in the database
    async update(id: any, userData: Partial<User>): Promise<User | undefined> {
        await this.userRepository.update(id, userData);
        return this.userRepository.findOne(id).then((user) => user ?? undefined);
    }

    // Delete a user from the database
    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }


}
