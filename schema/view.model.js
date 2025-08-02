import mongoose from "mongoose";

const viewSchema = new mongoose.Schema({
    videoId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"videos",
        required:true,
    }
});

export const View = mongoose.model("View",viewSchema);