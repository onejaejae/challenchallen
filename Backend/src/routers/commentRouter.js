import express from "express";
import { postComment, deleteComment } from "../controllers/commentController";
import routes from "../routes";

const commentRouter = express.Router();

// 댓글 생성
commentRouter.post("/", postComment);
// 댓글 삭제
commentRouter.delete(routes.commentId, deleteComment);

export default commentRouter;
