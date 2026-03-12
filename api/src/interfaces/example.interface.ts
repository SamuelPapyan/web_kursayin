import { Types } from "mongoose";

export interface IExample {
    _id?: Types.ObjectId;
    name: string;
    htmlCode: string;
    cssCode: string;
    isPublished?: boolean;
}