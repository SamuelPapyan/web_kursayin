import { model, Schema } from "mongoose";
import { ITest } from "../interfaces/test.interface";

const testSchema = new Schema<ITest>({
    title: {
        type: String,
        required: true
    },
    variants: {
        type: [String],
        required: true
    },
    answer: {
        type: Number,
        required: true
    },
    themeLink: {
        type: String,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const Test = model('Test', testSchema)