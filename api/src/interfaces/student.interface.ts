import { Document, Types } from "mongoose";

export interface IStudent extends Document {
    _id: Types.ObjectId;
    fullName?: string;
    email: string;
    birthDate?: Date;
    avatar?: string;
    phone?: string;
    createdAt: Date;
}