import { model, Schema } from "mongoose";
import { IQuestion } from "../interfaces/question.interface";

const questionSchema = new Schema<IQuestion>({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null,
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

export const Question = model('Question', questionSchema)