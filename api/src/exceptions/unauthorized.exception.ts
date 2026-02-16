import { responseStatus } from "../enums/response.enum";

export class UnauthorizedException extends Error {
    public readonly statusCode: number;

    constructor (
        message: string = "Authentication token required",
    ) {
        super(message);
        Object.setPrototypeOf(this, UnauthorizedException.prototype);

        this.name = 'UnauthorizedException';
        this.statusCode = responseStatus.UNAUTHORIZED;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UnauthorizedException)
        }
    }
}