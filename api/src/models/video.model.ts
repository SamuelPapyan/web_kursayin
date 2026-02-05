import { model, Schema } from "mongoose";
import { IVideo } from "../interfaces/video.interface";

const videoSchema = new Schema<IVideo>({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    details: {
        type: [Schema.Types.ObjectId],
        ref: 'VideoDetails',
        required: true
    }
})

export const Video = model('Video', videoSchema)