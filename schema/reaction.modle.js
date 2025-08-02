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
        userId:{
            type:String,
            lowercase:true,
            trim:true,
            required:true,
        },
        commentId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"comments",
        }
    }
);

export const Reaction = mongoose.model("Reaction",reactionSchema);