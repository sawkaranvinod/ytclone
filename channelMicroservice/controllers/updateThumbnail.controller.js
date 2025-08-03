import { dataCache } from "../config/redis.config.js";
import { replyHandler200, replyHandler400, replyHandler500 } from "../helper/reply.helper.js";
import { Reaction } from "../schema/reaction.modle.js";
import { Video } from "../schema/video.model.js";
import { ViewCount } from "../schema/viewCount.modle.js";

export async function handleUpdateTitle(req, reply) {
    try {
        const cache = dataCache.getCache();
        const { videoId, description } = req.body;

        const cacheKey = `video:${videoId}`;
        const oldVideoDataFromCache = await cache.get(cacheKey);
        let oldVideoDataFromDb = null;

        if (!oldVideoDataFromCache) {
            oldVideoDataFromDb = await Video.findById(videoId);
            if (!oldVideoDataFromDb) {
                return replyHandler400(reply, "Video not found");
            }
        }

        const updatedVideo = await Video.findByIdAndUpdate(
            videoId,
            { $set: { description } },
            { new: true }
        );

        if (oldVideoDataFromCache) {
            const oldData = JSON.parse(oldVideoDataFromCache);
            await cache.set(
                cacheKey,
                JSON.stringify({
                    ...oldData,
                    title: updatedVideo.description,
                })
            );
        }


        const reactionStats = await Reaction.aggregate([
            {
                $match: {
                    videoId: updatedVideo._id,
                },
            },
            {
                $group: {
                    _id: "$videoId",
                    totalLikes: {
                        $sum: {
                            $cond: [{ $eq: ["$reaction", true] }, 1, 0],
                        },
                    },
                    totalDislikes: {
                        $sum: {
                            $cond: [{ $eq: ["$reaction", false] }, 1, 0],
                        },
                    },
                },
            },
        ]);

        const viewDocs = await ViewCount.find({ videoId });
        const totalViews = viewDocs.length;

        const finalData = {
            ...updatedVideo.toObject(),
            totalLikes: reactionStats[0]?.totalLikes || 0,
            totalDislikes: reactionStats[0]?.totalDislikes || 0,
            totalViews,
        };

        await cache.set(cacheKey, JSON.stringify(finalData));
        return replyHandler200(reply, "Video title updated successfully", { updatedVideo: finalData });
    } catch (error) {
        console.error("Error in handleUpdateTitle:", error);
        return replyHandler500(reply);
    }
}
