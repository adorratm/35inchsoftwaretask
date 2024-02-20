import { IsString, IsNumber, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    last_name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNumber()
    @IsNotEmpty()
    role: number;
}
