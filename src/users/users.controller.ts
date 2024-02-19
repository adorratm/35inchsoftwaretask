/**
 * @file: Users Controller
 * @description: NestJS Controller for Users
 * @author: Emre KILIÇ (https://github.com/adorratm)
 */

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

// Controller: This is a basic controller decorator
// Get: This is a basic HTTP GET method decorator
// Post: This is a basic HTTP POST method decorator
// Put: This is a basic HTTP PUT method decorator
// Delete: This is a basic HTTP DELETE method decorator
// Param: This is a basic HTTP parameter decorator

@Controller('users')
export class UsersController {
    // Inject the users service
    constructor(private readonly usersService: UsersService) { }

    // Get all users
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    // Get one user by email
    @Get(':email')
    findOne(@Param('email') email: string): Promise<User | undefined> {
        return this.usersService.findOne(email);
    }

    // Create a user
    @Post()
    create(@Body() userData: Partial<User>): Promise<User> {
        return this.usersService.create(userData);
    }

    // Update a user
    @Put(':id')
    update(@Param('id') id: any, @Body() userData: Partial<User>): Promise<User | undefined> {
        return this.usersService.update(id, userData);
    }

    // Delete a user
    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.usersService.delete(id);
    }
}
