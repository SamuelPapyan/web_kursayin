import { Types } from "mongoose";

export interface IExample {
    _id?: Types.ObjectId;
    name: string;
    code: string;
    isPublished?: boolean;
}