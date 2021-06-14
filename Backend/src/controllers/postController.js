import Post from "../model/Post";
import User from "../model/User";
import mongoose from "mongoose";

// main 페이지의 오늘 참여자 수, 총 챌린지 개수, 오늘 챌린지 개수 현황을 반환
export const getMain = async (req, res, next) => {
  try {
    // db query
    const sumPostNum = await Post.find({}).countDocuments();
    const todayPostNum = await Post.find({
      createAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    }).countDocuments();

    let sumUserNum = await Post.find({
      createAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    }).distinct("writer");
    sumUserNum = sumUserNum.length;

    // 응답
    return res.status(200).json({
      sumPostNum,
      todayPostNum,
      sumUserNum,
    });
  } catch (error) {
    next(error);
  }
};

// post 목록 반환
export const getPosts = async (req, res, next) => {
  try {
    const {
      query: { category, sort, skip },
    } = req;
    if (!category || !sort) {
      return res.status(400).send({ err: "category or sort is not exist." });
    }
    // 카테고리 별
    let filter = {};
    if (category !== "all") {
      filter["category"] = category;
    }

    let posts;
    // 정렬
    if (sort === "likes") {
      posts = await Post.find(filter)
        .skip(skip * 8)
        .sort({ likeNum: -1 })
        .limit(8);
    } else {
      posts = await Post.find(filter)
        .sort({ createAt: -1 })
        .skip(skip * 8)
        .limit(8);
    }

    let isRemain = false;
    if (posts.length === 8) {
      isRemain = true;
    }
    // 응답
    return res.status(200).json({ success: true, posts, isRemain });
  } catch (error) {
    next(error);
  }
};

// Post(챌린지) 정보 반환
export const getPost = async (req, res, next) => {
  try {
    const {
      params: { postId },
    } = req;
    console.log(postId);
    if (!mongoose.isValidObjectId(postId)) {
      return res.status(400).send({ err: "Invalid Post ID" });
    }

    const post = await Post.findById(postId).populate("comments");

    return res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};

// Post(챌린지) 업로드
export const postPost = async (req, res, next) => {
  try {
    const {
      body: { category, reducedCarbon },
    } = req;

    let variable = req.body;
    variable.writer = req.user;
    if (variable["plan"] == "etc") {
      variable["plan"] = req.body.etcPlan;
    }

    // 게시물 개수
    const postSize = req.user.post.length;

    // 게시물 개수에 따른 필터링
    switch (postSize) {
      case 0:
        req.user.badgeUrl.push(
          "https://onetube.s3.ap-northeast-2.amazonaws.com/avatar/KakaoTalk_20210521_173524813.png"
        );
        break;
      case 4:
        req.user.badgeUrl.push(
          "https://onetube.s3.ap-northeast-2.amazonaws.com/avatar/KakaoTalk_20210521_162810177.png"
        );
        break;
      case 9:
        req.user.badgeUrl.push(
          "https://onetube.s3.ap-northeast-2.amazonaws.com/avatar/KakaoTalk_20210521_173605779.png"
        );
        break;
      case 14:
        req.user.badgeUrl.push(
          "https://onetube.s3.ap-northeast-2.amazonaws.com/avatar/KakaoTalk_20210521_173608749.png"
        );
        break;
      case 19:
        req.user.badgeUrl.push(
          "https://onetube.s3.ap-northeast-2.amazonaws.com/avatar/KakaoTalk_20210521_173613323.png"
        );
        break;
      case 29:
        req.user.badgeUrl.push(
          "https://onetube.s3.ap-northeast-2.amazonaws.com/avatar/KakaoTalk_20210521_173636470.png"
        );
        break;
    }

    // 점수 증가 필터
    let userIncFilter = {};
    userIncFilter["allScore.dailyScore"] = 10;
    userIncFilter["allScore.monthlyScore"] = 10;
    userIncFilter["allScore.sumScore"] = 10;
    userIncFilter[`categoryScore.${category}.dailyScore`] = 10;
    userIncFilter[`categoryScore.${category}.monthlyScore`] = 10;
    userIncFilter[`categoryScore.${category}.sumScore`] = 10;

    // 탄소 저감량 필터
    if (reducedCarbon != "") {
      userIncFilter["reducedCarbon.dailyAmount"] = reducedCarbon;
      userIncFilter["reducedCarbon.allAmount"] = reducedCarbon;
    }

    let post = new Post(variable);
    const [updatePost, user] = await Promise.all([
      post.save(),
      req.user.save(),
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            post: post._id,
            latestPost: { $each: [post], $slice: -1 },
          },
          $inc: userIncFilter,
        },
        { new: true }
      ),
    ]);

    // 응답
    return res.status(200).json({ success: true, updatePost, user });
  } catch (error) {
    next(error);
  }
};

export const postUpload = async (req, res, next) => {
  try {
    const { files } = req;

    if (!files) return res.status(400).send({ err: "file is not exist" });

    let filepaths = [];
    for (let f in files) {
      filepaths.push(files[f].path);
    }
    return res.status(200).json(filepaths);
  } catch (error) {
    next(error);
  }
};

// facker용 postPost controller
// export const postPost = async (req, res, next) => {
//   try {
//     const {
//       body: { category, writer },
//       files,
//     } = req;

//     let variable = req.body;

//     // db query
//     let post = new Post(variable);
//     let cateFilter = {};
//     cateFilter["allScore.dailyScore"] = 10;
//     cateFilter["allScore.monthlyScore"] = 10;
//     cateFilter["allScore.sumScore"] = 10;
//     cateFilter[`categoryScore.${category}.dailyScore`] = 10;
//     cateFilter[`categoryScore.${category}.monthlyScore`] = 10;
//     cateFilter[`categoryScore.${category}.sumScore`] = 10;

//     // 파일 이미지 작업
//     if (files) {
//       files.forEach((file) => post.fileUrl.push(file.path));
//     }
//     const user = await User.findById(writer._id);
//     const postSize = user.post.length;

//     // 게시물 개수에 따른 필터링
//     switch (postSize) {
//       case 1:
//         // 뱃지 이미지 삽입
//         user.badgeUrl.push(
//           "https://onetube.s3.ap-northeast-2.amazonaws.com/avatar/KakaoTalk_20210521_162810177.png"
//         );
//         break;
//       case 5:
//         user.badgeUrl.push(
//           "https://onetube.s3.ap-northeast-2.amazonaws.com/avatar/KakaoTalk_20210521_173524813.png"
//         );
//         break;
//       case 10:
//         user.badgeUrl.push(
//           "https://onetube.s3.ap-northeast-2.amazonaws.com/avatar/KakaoTalk_20210521_173605779.png"
//         );
//         break;
//       case 15:
//         user.badgeUrl.push(
//           "https://onetube.s3.ap-northeast-2.amazonaws.com/avatar/KakaoTalk_20210521_173608749.png"
//         );
//         break;
//       case 20:
//         user.badgeUrl.push(
//           "https://onetube.s3.ap-northeast-2.amazonaws.com/avatar/KakaoTalk_20210521_173613323.png"
//         );
//         break;
//       case 30:
//         user.badgeUrl.push(
//           "https://onetube.s3.ap-northeast-2.amazonaws.com/avatar/KakaoTalk_20210521_173636470.png"
//         );
//         break;
//     }

//     const [updatePost, users] = await Promise.all([
//       post.save(),
//       user.save(),
//       User.findOneAndUpdate(
//         { _id: writer._id },
//         {
//           $push: {
//             post: post._id,
//             latestPost: { $each: [post], $slice: -1 },
//           },
//           $inc: cateFilter,
//         }
//       ),
//     ]);

//     // 응답
//     return res.status(200).json({ success: true, updatePost, users });
//   } catch (error) {
//     next(error);
//   }
// };
