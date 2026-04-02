import { Types } from "mongoose";

export interface ITopic {
    _id: Types.ObjectId;
    title: string;
    content: string;
    retentionIntervals: number[];
    difficulty: number;
}