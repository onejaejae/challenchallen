import "./db";
import "./passport";
import "./initService";
import { generateFakeData } from "./faker";

import bodyParser from "body-parser";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes";
import session from "express-session";
import passport from "passport";
import mongoStore from "connect-mongo";
import postRouter from "./routers/postRouter";
import calculatorRouter from "./routers/calculatorRouter";
import rankingRouter from "./routers/rankingRouter";
import userRouter from "./routers/userRouter";
import likeRouter from "./routers/likeRouter";
import globalRouter from "./routers/globalRouter";
import commentRouter from "./routers/commentRouter";

const app = express();

dotenv.config();

const corsOptions = {
  origin: ["http://localhost:3000", "https://www.challenchallen.com"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      // javascript로 변경하지 못하게
      httpOnly: true,
      secure: false,
      domain: process.env.NODE_ENV === "production" && ".challenchallen.com",
    },
    store: mongoStore.create({ mongoUrl: process.env.DB_HOST }),
  })
);
app.set("trust proxy", 1);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));

  // 보안 관련 패키지
  app.use(hpp());
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
} else {
  app.use(morgan("dev"));
}

//faker

// const generateFake = async () => {
//   await generateFakeData(100, 5);
// };
// generateFake();

// passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/post", (req, res) => {
  const html = `
  <form action=/api/challen${routes.posts} method="post" >
    <p><input type="text" name="category" placeholder="category" /></p>  
    <p><input type="text" name="title" placeholder="title" /></p>        
    <p><input type="text" name="plan" placeholder="plan" /></p>   
    <p><input type="text" name="etcPlan" placeholder="etcPlan" /></p>   
    <p><input type="text" name="content" placeholder="content" /></p>   
    <p><input type="text" name="reducedCarbon" placeholder="reducedCarbon" /></p>
    <button>Send my greetings</button>
  </form>
  `;
  res.send(html);
});

app.get("/likeposttest", (req, res) => {
  const html = `
  <form action=${routes.like} method="post"  enctype="application/x-www-form-urlencoded">
    <p><input type="text" name="postId" placeholder="postId" /></p> 
    <button>Send my greetings</button>
  </form>
  `;
  res.send(html);
});

app.get("/comment", (req, res) => {
  const html = `
  <form action="/api/comments" method="post">
    <p><input type="text" name="content" placeholder="content" /></p>  
    <p><input type="text" name="postId" placeholder="postId" /></p>        
      
    <button>Send my greetings</button>
  </form>
  `;
  res.send(html);
});

app.get("/challenuploads", (req, res) => {
  const html = `
  <form action="/api/challen/upload" method="post" enctype="multipart/form-data">
    파일명 : <input type="file" name="images">
    파일명 : <input type="file" name="images">
    <button type="submit">제출하기</button>
  </form>
  `;
  res.send(html);
});

// router
app.use(routes.challen, postRouter);
app.use(routes.home, calculatorRouter);
app.use(routes.rank, rankingRouter);
app.use(routes.user, userRouter);
app.use(routes.like, likeRouter);
app.use(routes.home, globalRouter);
app.use(routes.comment, commentRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT;
if (!PORT) console.error("PORT is required");

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
