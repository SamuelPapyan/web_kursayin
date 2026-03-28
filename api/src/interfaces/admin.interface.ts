import { Document, Types } from "mongoose";
import { AdminRole } from "../enums/admin-role.enum";

export interface IAdmin extends Document{
    _id: Types.ObjectId;
    fullName: string;
    username: string;
    password: string;
    email: string;
    createdAt: string;
    birthDate: Date;
    avatar?: string;
    phone: string;
    role: AdminRole;
    enabled2fa?: boolean;
}