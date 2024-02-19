/**
 * @file: app.module.ts
 * @description: This file is responsible for the module layer of the app module.
 * @author: Emre KILIÇ - (https://github.com/adorratm)
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot: This is a basic typeorm module forRoot method
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    // UsersModule: This is a basic users module
    UsersModule,
    // AuthModule: This is a basic auth module
    AuthModule,
  ],
})
export class AppModule { }
