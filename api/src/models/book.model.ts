import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        default: null
    },
    link: {
        type: String,
        require: true
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const Book = model('Book', bookSchema)