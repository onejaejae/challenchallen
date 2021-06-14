import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema(
  {
    writer: {
      _id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User",
      },
      nickname: {
        type: String,
        required: true,
      },
    },

    // 어떤 게시글의 댓글인지
    postId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "blog",
    },

    // 댓글 내용
    content: {
      type: String,
      required: true,
    },

    // 작성 시간
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);

export default Comment;
