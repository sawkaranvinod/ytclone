import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
            lowercase:true,
            trim:true,
        },
        playlistName:{
            type:String,
            required:true,
        },
    }
);

export const Playlist = mongoose.model("Playlist",playlistSchema);