import express from "express";
import {
    postLike,
    deleteLike
} from "../controllers/likeController";
import routes from "../routes";

const likeRouter = express.Router();

// 좋아요 추가
likeRouter.post("/", postLike);
// 좋아요 취소
likeRouter.delete("/", deleteLike);

export default likeRouter;