import { Types } from "mongoose";

export interface ITest {
    _id?: Types.ObjectId;
    title: string;
    variants: string[];
    answer: number;
    themeLink: string;
    isPublished?: boolean;
}