import express from "express";
import { getRanking } from "../controllers/rankingController";

const rankingRouter = express.Router();

// 메인 페이지 get
rankingRouter.get("/", getRanking);

export default rankingRouter;
