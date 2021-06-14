import passport from "passport";
import User from "../model/User";

export const getSetUser = async (req, res, next) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user._id);
    res.status(200).json({
      suceess: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    req.logout();
    return res.status(200).json({
      suceess: true,
    });
  } catch (error) {
    next(error);
  }
};

// naver
export const naverLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  const {
    id,
    _json: { email, nickname },
  } = profile;

  try {
    const user = await User.findOne({ email });

    if (user) {
      user.naverId = id;
      await user.save();
      // done 매개변수 user는 passport.serializeUser의 매개변수 user의 값으로 넘어감
      return done(null, user);
    } else {
      const newUser = await User.create({
        naverId: id,
        nickname,
        email,
      });

      return done(null, newUser);
    }
  } catch (error) {
    console.log("error", error);
    return done(error);
  }
};

export const naverLogin = passport.authenticate("naver", {
  // 로그인 페이지로 redirect

  failureRedirect:
    process.env.NODE_ENV == "dev"
      ? process.env.CLIENT_HOME_URL_DEV
      : process.env.CLIENT_HOME_URL_PRO,
});

export const postNaverLogin = async (req, res) => {
  res.redirect(
    process.env.NODE_ENV == "dev"
      ? process.env.CLIENT_HOME_URL_DEV
      : process.env.CLIENT_HOME_URL_PRO
  );
};

// kakao

export const kakaoLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  const {
    _json: { id },
    _json: {
      kakao_account: { email },
      kakao_account: {
        profile: { nickname },
      },
    },
  } = profile;

  try {
    const user = await User.findOne({ email });

    if (user) {
      user.kakaoId = id;
      await user.save();

      return done(null, user);
    } else {
      const newUser = await User.create({
        kakaoId: id,
        nickname,
        email,
      });

      return done(null, newUser);
    }
  } catch (error) {
    console.log("error", error);
    return done(error);
  }
};

export const KakaoLogin = (req, res) => {
  res.redirect(
    `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
      process.env.KAKAO_CLIENT_ID
    }&redirect_uri=${
      process.env.NODE_ENV === "production"
        ? process.env.KAKAO_CALLBACK_URL_PRO
        : process.env.KAKAO_CALLBACK_URL_DEV
    }&prompt=login`
  );
};

export const postKakaoLogin = (req, res) => {
  res.redirect(
    process.env.NODE_ENV == "dev"
      ? process.env.CLIENT_HOME_URL_DEV
      : process.env.CLIENT_HOME_URL_PRO
  );
};
