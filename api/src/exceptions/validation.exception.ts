import { responseStatus } from "../enums/response.enum";
import { IValidationError } from "../interfaces/validation-error.interface";

export class ValidationException extends Error {
    public readonly statusCode: number;
    public readonly validationErrors: IValidationError[];

    constructor (
        errors: IValidationError[],
        message: string = "Validation Failed"
    ) {
        super(message);
        Object.setPrototypeOf(this, ValidationException.prototype);

        this.name = 'ValidationException';
        this.statusCode = responseStatus.BAD_REQUEST;
        this.validationErrors = errors

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ValidationException)
        }
    }
}