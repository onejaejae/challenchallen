import NaverStrategy from "passport-naver";
import { naverLoginCallback } from "./controllers/globalController";
import { kakaoLoginCallback } from "./controllers/globalController";
import User from "./model/User";
import passport from "passport";

// naver
passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
      authType: "reauthenticate",
    },
    naverLoginCallback
  )
);

// kakao
const KakaoStrategy = require("passport-kakao").Strategy;

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID,
      // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === "production"
          ? process.env.KAKAO_CALLBACK_URL_PRO
          : process.env.KAKAO_CALLBACK_URL_DEV,
      authorizationURL: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
        process.env.KAKAO_CLIENT_ID
      }&redirect_uri=${
        process.env.NODE_ENV === "production"
          ? process.env.KAKAO_CALLBACK_URL_PRO
          : process.env.KAKAO_CALLBACK_URL_DEV
      }&prompt=login`,
    },
    kakaoLoginCallback
  )
);

passport.serializeUser((user, done) => {
  console.log("serializeUser");
  // req.login()에서 넘겨준 user값
  done(null, user.email); // user에서 email만 세션에 저장
});

passport.deserializeUser(async (email, done) => {
  console.log("deserializeUser");
  const user = await User.findOne({ email });
  done(null, user);
});
