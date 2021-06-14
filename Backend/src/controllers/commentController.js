import mongoose from "mongoose";
import Comment from "../model/Comment";
import Post from "../model/Post";
import User from "../model/User";

export const postComment = async (req, res, next) => {
  try {
    const {
      body: { postId },
    } = req;

    if (!mongoose.isValidObjectId(postId))
      return res.status(400).send({ err: "postId is not invalid" });

    let variable = req.body;
    variable.writer = req.user;

    const post = await Post.findById(postId);
    const comment = new Comment(req.body);

    post.comments.push(comment);
    req.user.comments.push(comment);

    Promise.all([req.user.save(), post.save(), comment.save()]);

    return res.status(200).json({ success: true, comment });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const {
      params: { commentId },
    } = req;

    const comment = await Comment.findById(commentId);

    await Promise.all([
      Comment.findByIdAndDelete(commentId),
      Post.updateOne(
        { _id: comment.postId },
        { $pull: { comments: commentId } }
      ),
      User.updateOne({ _id: req.user._id }, { $pull: { comments: commentId } }),
    ]);

    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
