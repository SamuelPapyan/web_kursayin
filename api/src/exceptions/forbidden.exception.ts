import { responseStatus } from "../enums/response.enum";

export class ForbiddenException extends Error {
    public readonly statusCode: number;

    constructor (
        message: string = "Forbidden resource.",
    ) {
        super(message);
        Object.setPrototypeOf(this, ForbiddenException.prototype);

        this.name = 'ForbiddenException';
        this.statusCode = responseStatus.FORBIDDEN;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ForbiddenException)
        }
    }
}