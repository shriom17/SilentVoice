import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        isActive: {type: Boolean, required: true},
        inactiveSince: {type: Date, default: null},
        responses: [
            {
                rating:{type: Number, required: true},
                comment:{type: String, required: false},
                createdAt: {type: Date, default: Date.now},
                updatedAt: {type: Date, default: Date.now}
            },
        ],
    },   {timestamps: true});

export default mongoose.model('Feedback', FeedbackSchema);