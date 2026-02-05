import { Types } from "mongoose";

export interface IBook {
    _id: Types.ObjectId;
    title: string;
    cover: string;
    link: string;
}