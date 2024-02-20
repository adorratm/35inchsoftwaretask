import { Body, Controller, Get, Post, UseGuards, Request, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import * as Joi from '@hapi/joi';
import { JoiValidationPipe } from 'src/middlewares/joi-validation.pipe';


@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) { }


    @Post('register')
    @UsePipes(new JoiValidationPipe(Joi.object({
        first_name: Joi.string().min(2).max(70).required(),
        last_name: Joi.string().min(2).max(70).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.number().required()
    }))) // Joi validation for the request body
    async register(@Body() RegisterDto: RegisterDto): Promise<{ token: string }> {
        return await this.AuthService.register(RegisterDto);
    }

    @Post('login')
    @UsePipes(new JoiValidationPipe(Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }))) // Joi validation for the request body
    async login(@Body() LoginDto: LoginDto): Promise<{ token: string }> {
        return await this.AuthService.login(LoginDto);
    }

    @Get('user')
    @UseGuards(AuthGuard('jwt'))
    async getUser(@Request() req: any): Promise<any> {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token)
        return await this.AuthService.getUser(token);
    }
}