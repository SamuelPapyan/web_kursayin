import { Types } from "mongoose";
import { QuestionType } from "../enums/question-type.enum";

export interface IQuestion {
    _id?: Types.ObjectId;
    topicId: Types.ObjectId;
    title: string;
    image?: string;
    variants: string[];
    answer?: number;
    answers?: number[];
    themeLink: string;
    type: QuestionType;
    isPublished?: boolean;
}