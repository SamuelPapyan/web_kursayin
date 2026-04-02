import { Schema, model} from 'mongoose'
import { ITestResult } from '../interfaces/test-result.interface'

const testResultSchema = new Schema<ITestResult>({
    studentId: {
        Type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    topicId: {
        Type: Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        required: true
    },
    completedAt: {
        type: Date,
        default: null
    },
    strength: {
        type: Number,
        required: true
    }
})

export const TestResult = model('TestResult', testResultSchema);