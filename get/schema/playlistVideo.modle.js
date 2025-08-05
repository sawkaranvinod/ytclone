import mongoose from "mongoose";

const playlistVideoSchema = new mongoose.Schema(
    {
        playlistId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"playlists",
            required:true,
        },
        videoId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"videos",
        }
    },
);

export const PlaylistVideo = mongoose.model("PlaylistVideo",playlistVideoSchema);