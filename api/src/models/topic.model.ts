import { Schema, model } from "mongoose";
import { ITopic } from "../interfaces/topic.interface";

const topicSchema = new Schema<ITopic>({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    retentionIntervals: {
        type: [Number],
        required: true
    },
    difficulty: {
        type: Number,
        default: 1.0
    }
})

export const Topic = model('Topic', topicSchema)