import mongoose from "mongoose";
import User from "../model/User";

export const getMypage = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.user._id))
      return res.status(400).send({ err: "userId doesn't exist" });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send({ err: "user is not exist" });

    await user.save();
    return res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (req, res, next) => {
  try {
    if (!req.user._id)
      return res.status(400).send({ err: "userId doesn't exist" });
    console.log(req.user._id);
    const userPosts = await User.findById(req.user._id).populate("post");
    return res.status(200).json({ success: true, userPosts });
  } catch (error) {
    next(error);
  }
};
