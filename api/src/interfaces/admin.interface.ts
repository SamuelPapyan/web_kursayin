import { Document, Types } from "mongoose";

export interface IAdmin extends Document{
    _id: Types.ObjectId;
    username: string;
    password: string;
}