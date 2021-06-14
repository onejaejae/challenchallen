// HOME
const HOME = "/api";

// Naver
const NAVER = "/naver";
const NAVER_CALLBACK = "/naver/callback";

// kakao
const KAKAO = "/kakao";
const KAKAO_CALLBACK = "/kakao/callback";

// setUser
const SET_USER = "/setUser";

// logout
const LOGOUT = "/logout";

// main
const CHALLEN = "/api/challen";

// post
const POSTS = "/posts";
const POST = "/post/:postId";
const POST_UPLOAD = "/upload";
const CALCULATOR = "/calculator";

// ranking
const RANK = "/api/ranking";

// mypage
const USER = "/api/mypage";
const USER_POSTS = "/posts";

// like
const LIKE = "/api/like";

// 공통
const USER_ID = "/:userId";

// comment
const COMMENT = "/api/comments";
const COMMENT_ID = "/:commentId";

const routes = {
  home: HOME,
  challen: CHALLEN,
  posts: POSTS,
  post: POST,
  calculator: CALCULATOR,
  rank: RANK,
  userId: USER_ID,
  user: USER,
  userPosts: USER_POSTS,
  naver: NAVER,
  naverCallback: NAVER_CALLBACK,
  logout: LOGOUT,
  setUser: SET_USER,
  postUpload: POST_UPLOAD,
  like: LIKE,
  comment: COMMENT,
  commentId: COMMENT_ID,
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
};

export default routes;
