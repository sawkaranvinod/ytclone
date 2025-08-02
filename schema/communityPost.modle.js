import mongoose from "mongoose";

const communityPostSchema = new mongoose.Schema(
    {
        channelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "channels",
            required: true,
        },
        description:{
            type:String,
            trim:true,
            required:true,
        },
        imageUrl:{
            type:String,
        },
    },
    {
        timestamps: true,
    }
);

export const CommunityPost = mongoose.model("CommunityPost",communityPostSchema)