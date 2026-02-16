import { Schema, model } from "mongoose";
import { IAdmin } from "../interfaces/admin.interface";
import bcrypt from 'bcrypt'

const adminSchema = new Schema<IAdmin>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

adminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return;
    }
    try {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds)
    } catch (error) {
        throw error
    }
})

adminSchema.pre('findOneAndUpdate', async function() {
    const update = this.getUpdate() as any;

    if (update.password) {
        try {
            const saltRounds = 10;
            update.password = await bcrypt.hash(update.password, saltRounds);
        } catch (error) {
            throw error;
        }
    }
});

export const Admin = model<IAdmin>('Admin', adminSchema);