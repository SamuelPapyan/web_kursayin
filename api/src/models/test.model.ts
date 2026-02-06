import { model, Schema } from "mongoose";
import { ITest } from "../interfaces/test.interface";

const testSchema = new Schema<ITest>({
    title: {
        type: String,
        required: true
    },
    variants: {
        type: [Schema.Types.ObjectId],
        ref: 'TestVariant',
        required: true
    },
    answer: {
        type: Schema.Types.ObjectId,
        ref: 'TestVariant',
        required: true
    },
    themeLink: {
        type: String,
        required: true
    }
})

export const Test = model('Test', testSchema)