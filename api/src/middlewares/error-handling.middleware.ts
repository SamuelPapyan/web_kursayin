import { Request, Response, NextFunction } from 'express'
import { ValidationException } from '../exceptions/validation.exception';
import { responseStatus } from '../enums/response.enum';
import { NotFoundException } from '../exceptions/not-found.exception';
import { IResponse } from '../interfaces/response.interface';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { ForbiddenException } from '../exceptions/forbidden.exception';

export const errorHandlingMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    let response: IResponse;
    // Error is a validation exception
    if (error instanceof ValidationException) {
        response = {
            success: false,
            data: null,
            message: error.message,
            code: error.statusCode,
            error,
            validationErrors: error.validationErrors
        }
    }
    // Error is a not-found exception
    else if (error instanceof NotFoundException) {
        const { resourceType, resourceId } = error;
        response = {
            success: false,
            data: null,
            message: error.message,
            code: error.statusCode,
            error,
            resource: {resourceType, resourceId}
        }
    }
    // Error is an unauthorized exception
    else if (error instanceof UnauthorizedException) {
        response = {
            success: false,
            data: null,
            message: error.message,
            code: error.statusCode,
            error
        }
    }
    // Error is a forbidden exception
    else if (error instanceof ForbiddenException) {
        response = {
            success: false,
            data: null,
            message: error.message,
            code: error.statusCode,
            error
        }
    }
    // Other type of exception
    else {
        response = {
            success: false,
            data: null,
            message: error.message,
            code: responseStatus.BAD_REQUEST,
            error
        }
    }
    res.status(response.code).send(response)
}