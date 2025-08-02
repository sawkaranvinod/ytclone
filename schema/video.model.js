import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
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
        channelId: {
            type: String,
            required: true,
            lowercase:true,
            trim:true,
        },
        categroy: [],
        region:{
            type:String,
            lowercase:true,
        },
    },
    {
        timestamps: true
    }
);

export const Video = mongoose.model("Video", videoSchema);