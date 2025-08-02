import mongoose from "mongoose";

const vedioSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        thumbnaiUrl: {
            type: String,
        },
        videoUrl: {
            type: String,
            requried: true
        },
        userId: {
            type: String,
            required: true,
            lowercase:true,
            trim:true,
        },
        categroy: [],
    },
    {
        timestamps: true
    }
);

export const Video = mongoose.model("Video", vedioSchema);