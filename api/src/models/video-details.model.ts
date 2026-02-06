import { model, Schema } from "mongoose";
import { IVideoDetails } from "../interfaces/video-details.interface";

const videoDetailsSchema = new Schema<IVideoDetails>({
    time: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

export const VideoDetails = model('VideoDetails', videoDetailsSchema)