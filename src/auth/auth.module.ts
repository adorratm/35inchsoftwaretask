/**
 * @file: Auth Module
 * @description: NestJS Module for Auth
 * @author: Emre KILIÇ (https://github.com/adorratm)
 */

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// Module: This is a basic module decorator
@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({ secret: process.env.JWT_SECRET_KEY, signOptions: { expiresIn: '60s' }, }),],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule { }
