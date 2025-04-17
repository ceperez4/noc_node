import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    message: {
        type: String,
        require: true,
    },
    level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    origin: {
        type: String,
    },
    createdAt: {
        type: String,
        default: new Date()
    },
});

export const LogModel = mongoose.model('Log', logSchema);

