import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) { }

    async register(registerDto: RegisterDto): Promise<{ token: string }> {
        const { first_name, last_name, email, password } = registerDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.userRepository.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role: 1 // 1 for user, 2 for admin
        });

        await this.userRepository.save(user);

        const token = this.jwtService.sign({ email: user.email, id: user.id });

        return { token };
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        const user = await this.userRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({ id: user.id, email: user.email });

        return { token };
    }

    async getUser(token : any): Promise<User> {
        
        const { email } = this.jwtService.verify(token);
        
        const user = await this.userRepository.findOne({
            where: { email }
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }
}