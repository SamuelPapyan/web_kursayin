import { Types } from "mongoose";

export interface IVideo {
    _id?: Types.ObjectId;
    title: string;
    url: string;
    details: Types.ObjectId[];
}