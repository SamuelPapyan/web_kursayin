import { Types } from "mongoose";
import { IVideoDetails } from "./video-details.interface";

export interface IVideo {
    _id?: Types.ObjectId;
    title: string;
    videoUrl?: string;
    youtubeId?: string;
    details: IVideoDetails[];
    isPublished?: boolean;
}