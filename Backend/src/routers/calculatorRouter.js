import express from "express";
import {
    getReducedCarbon
} from "../controllers/calculatorController";
import routes from "../routes";

const calculatorRouter = express.Router();

// 좋아요 추가
calculatorRouter.get(routes.calculator, getReducedCarbon);

export default calculatorRouter;