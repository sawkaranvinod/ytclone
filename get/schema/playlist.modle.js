import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            lowercase:true,
            trim:true,
        },
        playlistName:{
            type:String,
            required:true,
        },
        visiblity:{
            type:String,
            enum:["public","private","protected"],
            required:true,
        },
        channelId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"channels"
        }
    }
);

export const Playlist = mongoose.model("Playlist",playlistSchema);