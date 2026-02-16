import { responseStatus } from "../enums/response.enum";
import { INotFoundResource } from "./not-found-resource.interface";
import { IValidationError } from "./validation-error.interface";

export interface IResponse {
    success: boolean;
    data: any;
    message: string;
    code: responseStatus;
    error?: Error;
    validationErrors?: IValidationError[]
    resource?: INotFoundResource
}