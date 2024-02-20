import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as Joi from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: Joi.Schema) { }

    async transform(value: any) {
        const { error } = await this.schema.validateAsync(value);
        if (error) {
            throw new BadRequestException('Validation failed: ' + error.details.map((e: { message: any; }) => e.message).join(', '));
        }
        return value;
    }
}