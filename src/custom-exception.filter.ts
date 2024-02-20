import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { ValidationError } from '@hapi/joi';

@Catch()
export class CustomExceptionFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const detail = exception.detail;
        if (typeof detail === 'string' && detail.includes('already exists')) {
            const messageStart = exception.table.split('_').join(' ') + ' with';
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: exception.detail.replace('Key', messageStart)
            })
        }

        if (exception instanceof ValidationError) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: this.handleJoiValidationError(exception),
            });
        }

        if (exception.status === HttpStatus.UNAUTHORIZED) {
            return response.status(HttpStatus.UNAUTHORIZED).json({
                statusCode: HttpStatus.UNAUTHORIZED,
                message: 'Unauthorized xd',
            });
        }


        if (exception.status === HttpStatus.BAD_REQUEST) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Bad Request',
            });
        }

        if (exception.status === HttpStatus.NOT_FOUND) {
            return response.status(HttpStatus.NOT_FOUND).json({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Not Found',
            });
        }

        if (exception.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
            });
        }

        if (exception.status === HttpStatus.FORBIDDEN) {
            return response.status(HttpStatus.FORBIDDEN).json({
                statusCode: HttpStatus.FORBIDDEN,
                message: 'Forbidden',
            });
        }

        if (exception.status === HttpStatus.CONFLICT) {
            return response.status(HttpStatus.CONFLICT).json({
                statusCode: HttpStatus.CONFLICT,
                message: 'Conflict',
            });
        }

        if (exception.status === HttpStatus.UNPROCESSABLE_ENTITY) {
            return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
                statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                message: 'Unprocessable Entity',
            });
        }

        if (exception.status === HttpStatus.TOO_MANY_REQUESTS) {
            return response.status(HttpStatus.TOO_MANY_REQUESTS).json({
                statusCode: HttpStatus.TOO_MANY_REQUESTS,
                message: 'Too Many Requests',
            });
        }

        if (exception.status === HttpStatus.NOT_IMPLEMENTED) {
            return response.status(HttpStatus.NOT_IMPLEMENTED).json({
                statusCode: HttpStatus.NOT_IMPLEMENTED,
                message: 'Not Implemented',
            });
        }

        if (exception.status === HttpStatus.SERVICE_UNAVAILABLE) {
            return response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
                statusCode: HttpStatus.SERVICE_UNAVAILABLE,
                message: 'Service Unavailable',
            });
        }

        if (exception.status === HttpStatus.GATEWAY_TIMEOUT) {
            return response.status(HttpStatus.GATEWAY_TIMEOUT).json({
                statusCode: HttpStatus.GATEWAY_TIMEOUT,
                message: 'Gateway Timeout',
            });
        }

        if (exception.status === HttpStatus.REQUEST_TIMEOUT) {
            return response.status(HttpStatus.REQUEST_TIMEOUT).json({
                statusCode: HttpStatus.REQUEST_TIMEOUT,
                message: 'Request Timeout',
            });
        }

        return super.catch(exception, host);

    }

    // This method is used to handle Joi validation errors
    private handleJoiValidationError(error: ValidationError): string {
        return error.details.map(e => e.message).join(', ');
    }
}
