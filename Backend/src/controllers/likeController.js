import Post from "../model/Post";
import User from "../model/User";
import mongoose from "mongoose";

export const postLike = async (req, res, next) => {
    try {
        const {
            body: { postId },
        } = req;
        if (!mongoose.isValidObjectId(postId)) {
            return res.status(400).send({ err: "Invalid Post ID" });
        }
        await Post.updateOne(
            {_id: postId},
            {$inc: {likeNum: 1}}
        );
        await User.updateOne(
                {_id: req.user._id},
                {$push: {likePost: postId}}
            );
        return res.status(200).json({success: true});
    } catch(error) {
        next(error);
    }
}

export const deleteLike = async (req, res, next) => {
    try {
        const {
            query: { postId },
        } = req;
        if (!mongoose.isValidObjectId(postId)) {
            return res.status(400).send({ err: "Invalid Post ID" });
        }
        await Post.updateOne(
            {_id: postId},
            {$inc: {likeNum: -1}}
        );
        await User.updateOne(
                {_id: req.user._id},
                {$pull: {likePost: postId}}
            );
        return res.status(200).json({success: true});
    } catch(error) {
        next(error);
    }
}