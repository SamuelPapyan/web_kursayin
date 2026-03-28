import { Schema, model } from "mongoose";
import { IAdmin } from "../interfaces/admin.interface";
import bcrypt from 'bcrypt'
import { AdminRole } from "../enums/admin-role.enum";

const adminSchema = new Schema<IAdmin>({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: AdminRole.ADMIN_READ
    },
    enabled2fa: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
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