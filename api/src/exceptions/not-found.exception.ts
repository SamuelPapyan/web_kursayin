import { ResourceType } from "cloudinary";
import { responseStatus } from "../enums/response.enum";
import { Types } from "mongoose";

export class NotFoundException extends Error {
    public readonly statusCode: number;
    public readonly resourceType: ResourceType;
    public readonly resourceId: string;

    constructor (
        type: ResourceType,
        id: Types.ObjectId,
        message: string = "Resource Not Found",
    ) {
        super(message);
        Object.setPrototypeOf(this, NotFoundException.prototype);

        this.name = 'NotFoundException';
        this.statusCode = responseStatus.NOT_FOUND;
        this.resourceType = type;
        this.resourceId = id.toString();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFoundException)
        }
    }
}