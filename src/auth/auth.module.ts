import {Module} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET_KEY'),
                signOptions: { expiresIn: config.get<string | number>('JWT_EXPIRES_IN') }
            })
        }),
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtStrategy, PassportModule]
})

export class AuthModule { }