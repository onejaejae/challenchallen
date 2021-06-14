import express from "express";
import {
  getMain,
  getPosts,
  getPost,
  postPost,
  postUpload,
} from "../controllers/postController";
import routes from "../routes";
import { multerImage } from "../middlewares";

const postRouter = express.Router();

// 메인 페이지 get
postRouter.get("/", getMain);
// 챌린지 페이지 get
postRouter.get(routes.posts, getPosts);
// 챌린지 get
postRouter.get(routes.post, getPost);
// 챌린지 업로드
postRouter.post(routes.posts, postPost);

postRouter.post(routes.postUpload, multerImage.array("images", 4), postUpload);

export default postRouter;
