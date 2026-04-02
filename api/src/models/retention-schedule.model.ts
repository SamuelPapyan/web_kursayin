import { Schema, model } from "mongoose"
import { IRetentionSchedule } from "../interfaces/retention-schedule.interface"
import { TestStatus } from "../enums/test-status.enum"

const retentionScheduleSchema = new Schema<IRetentionSchedule>({
    studentId:{
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    topicId: {
        type: Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    nextCheckDate: {
        type: Date,
        required: true
    },
    iteration: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: TestStatus.PENDING
    }
})

export const RetentionSchedule = model('RetentionSchedule', retentionScheduleSchema);