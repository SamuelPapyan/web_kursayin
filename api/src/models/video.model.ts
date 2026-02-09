import { model, Schema } from "mongoose";
import { IVideo } from "../interfaces/video.interface";

const videoSchema = new Schema<IVideo>({
    title: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: false,
        default: null
    },
    youtubeId: {
        type: String,
        required: false,
        default: null
    },
    details: {
        type: [{
            time: String,
            content: String
        }],
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const Video = model('Video', videoSchema)