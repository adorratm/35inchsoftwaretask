import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: number;
}
