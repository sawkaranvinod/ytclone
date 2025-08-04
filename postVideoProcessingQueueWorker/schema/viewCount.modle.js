import mongoose from "mongoose";

const viewCountSchema = new mongoose.Schema(
    {
        videoId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"videoid",
        },
        views:{
            type:Number,
        }
    }
);

export const  ViewCount = mongoose.model("ViewCount",viewCountSchema);