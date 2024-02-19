/**
 * @file: auth.service.ts
 * @description: This file is responsible for the service layer of the auth module.
 * @author: Emre KILIÇ - (https://github.com/adorratm)
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

    // Inject the UsersService and JwtService
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    // Validate the user
    async validateUser(email: string, password: string): Promise<any> {
        // Find the user in the database
        const user = await this.usersService.findOne(email);
        if (user?.password === password) {
            const result = { ...user, password };
            // If the user is found and the password is correct, return the user
            return result;
        }
        // If the user is not found or the password is incorrect, throw an UnauthorizedException
        throw new UnauthorizedException();
    }

    // Login method
    async login(user: any) {
        // Payload: This is the data that will be stored in the token
        const payload = { sub: user.id, email: user.email };
        // Return the access token
        return {
            // signAsync: This method will sign the payload and return a token
            access_token: this.jwtService.signAsync(payload)
        };
    }

    // Register method
    async register(user: any) {
        // Create a new user in the database
        return this.usersService.create(user);
    }
}
