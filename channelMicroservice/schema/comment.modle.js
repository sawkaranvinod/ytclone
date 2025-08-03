import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        comment:{
            type:String,
            required:true,
            lowercase:true,
            trim:true,
            required:true,
        },
        userId:{
            type:String,
            required:true,
            trim:true,
            lowercase:true,
            required:true,
        },
        videoId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"videos"
        },
        communityPostId : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "communityPosts",
        },
        commentId : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "comments",
        }
    },
    {
        timestamps:true,
    }
);

export const Comment = mongoose.model("Comment",commentSchema);