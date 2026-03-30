import { Schema, model } from "mongoose";
import { IStudent } from "../interfaces/student.interface";

const studentSchema = new Schema<IStudent>({
    fullName: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    birthDate: {
        type: Date,
        default: null
    },
    phone: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

export const Student = model<IStudent>('Student', studentSchema);