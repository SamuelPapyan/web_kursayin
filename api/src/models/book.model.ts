import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        require: true
    },
    link: {
        type: String,
        require: true
    }
})

export const Book = model('Book', bookSchema)