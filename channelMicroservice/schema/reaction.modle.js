import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
    {
        reaction:{
            type:Boolean,
            required:true,
        },
        userId:{
            type:String,
            required:true,
            trim:true,
            required:true,
        },
        videoId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"videos",
        },
        commentId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"comments",
        },
        communityPostId : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "communityPosts",
        }
    }
);

export const Reaction = mongoose.model("Reaction",reactionSchema);