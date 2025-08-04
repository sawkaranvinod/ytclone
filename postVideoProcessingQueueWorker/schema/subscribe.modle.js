import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema(
    {
        channelId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"channels",
            required:true,
        },
        userId:{
            type:String,
            required:true,
            lowercase:true,
            trim:true,
        },
    }
);

export const Subscribe = mongoose.model("Subscribe",subscribeSchema);