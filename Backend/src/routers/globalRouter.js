import passport from "passport";
import express from "express";
import routes from "../routes";
import {
  naverLogin,
  postNaverLogin,
  logout,
  getSetUser,
  KakaoLogin,
  postKakaoLogin,
} from "../controllers/globalController";

const globalRouter = express.Router();

// setUser
globalRouter.get(routes.setUser, getSetUser);

// naver
globalRouter.get(routes.naver, naverLogin);
globalRouter.get(
  routes.naverCallback,
  passport.authenticate("naver", {
    failureRedirect:
      process.env.NODE_ENV === "dev"
        ? process.env.NAVER_CALLBACK_URL_DEV
        : process.env.CLIENT_HOME_URL_PRO,
  }),
  postNaverLogin
);

// kakao
globalRouter.get(routes.kakao, KakaoLogin);
globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", {
    failureRedirect:
      process.env.NODE_ENV === "dev"
        ? process.env.NAVER_CALLBACK_URL_DEV
        : process.env.CLIENT_HOME_URL_PRO,
  }),
  postKakaoLogin
);

// logout
globalRouter.get(routes.logout, logout);

export default globalRouter;
