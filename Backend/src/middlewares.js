import multer from "multer";
// import aws from "aws-sdk";
// import multerS3 from "multer-s3";

// const s3 = new aws.S3({
//   accessKeyId: process.env.AWS_KEY,
//   secretAccessKey: process.env.AWS_PRIVATE_KEY,
//   region: "ap-northeast-2",
// });

// 챌린지 이미지
export const multerImage = multer({
  dest: "uploads/images",
});
