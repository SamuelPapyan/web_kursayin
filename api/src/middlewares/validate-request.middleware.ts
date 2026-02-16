import { Request, Response, NextFunction } from 'express'
import { validationResult } from "express-validator";
import { IValidationError } from '../interfaces/validation-error.interface';
import { ValidationException } from '../exceptions/validation.exception';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const formattedErrors: IValidationError[] = errors.array().map(err=>({
            property: (err as any).path,
            message: err.msg
        }));
        const error: ValidationException = new ValidationException(formattedErrors);
        return next(error)
    }
    next()
}