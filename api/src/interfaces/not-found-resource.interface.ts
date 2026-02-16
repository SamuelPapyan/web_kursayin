import { ResourceType } from "cloudinary";

export interface INotFoundResource {
    resourceType: ResourceType,
    resourceId: string;
}