import { model, Schema } from "mongoose";
import { ITestVariant } from "../interfaces/test-variant.interface";

const testVariantSchema = new Schema<ITestVariant>({
    content: {
        type: String,
        required: true
    }
})

export const TestVariant = model('TestVariant', testVariantSchema)