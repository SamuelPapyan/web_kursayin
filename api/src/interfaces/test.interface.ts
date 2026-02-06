import { Types } from "mongoose";

export interface ITest {
    _id?: Types.ObjectId;
    title: string;
    variants: Types.ObjectId[];
    answer: Types.ObjectId;
    themeLink: string;
}