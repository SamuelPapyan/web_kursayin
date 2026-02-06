import { Types } from "mongoose";

export interface IVideoDetails {
    _id?: Types.ObjectId;
    time: string;
    content: string;
}