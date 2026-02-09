import { model, Schema } from "mongoose";
import { IExample } from "../interfaces/example.interface";

const exampleSchema = new Schema<IExample>({
    name: {
        type: String,
        required: true
    },
    code: {
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

export const Example = model('Example', exampleSchema)