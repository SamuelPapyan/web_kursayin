import { Types } from "mongoose";
import { TestType } from "../enums/test-type.enum";

export interface ITestResult {
    _id: Types.ObjectId;
    studentId: Types.ObjectId;
    topicId: Types.ObjectId;
    score: number;
    type: TestType;
    completedAt: Date;
    strength: number;
}