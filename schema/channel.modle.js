import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
    {
        channelName:{
            type:String,
            required:true,
            lowercase:true,
            unique:true,
        },
        userId:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
        },
        logoUrl:{
            type:String,
            required:true,
        },
        coverImage:{
            type:String,
            required:true,
        },
        region:{
            type:String,
            lowercase:true,
        }
    },
    {
        timeseries:true,
    }
);

export const Channel = mongoose.model("Channel",channelSchema);