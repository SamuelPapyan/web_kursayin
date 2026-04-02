import { Types } from "mongoose";
import { TestStatus } from "../enums/test-status.enum";

export interface IRetentionSchedule {
    _id?: Types.ObjectId;
    studentId: Types.ObjectId;
    topicId: Types.ObjectId;
    nextCheckDate: Date;
    iteration: number;
    status: TestStatus;
}