/**
 * @file: auth.controller.ts
 * @description: This file is responsible for the controller layer of the auth module.
 * @author: Emre KILIÇ - (https://github.com/adorratm)
 */

import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service'; 

@Controller('auth')
export class AuthController {
    // Inject the auth service
    constructor(private authService: AuthService) { }

    // Login method
    @Post('login')
    async login(@Request() req: Request) {
        return this.authService.login(req.body);
    }

    // Register method
    @Post('register')
    async register(@Request() req: Request) {
        return this.authService.register(req.body);
    }
}
