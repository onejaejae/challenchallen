const faker = require("faker");
import User from "./model/User";
const axios = require("axios");
const URI = "http://localhost:5000";

export const generateFakeData = async (userCount, blogsPerUser) => {
  try {
    if (typeof userCount !== "number" || userCount < 1)
      throw new Error("userCount must be a positive integer");
    if (typeof blogsPerUser !== "number" || blogsPerUser < 1)
      throw new Error("blogsPerUser must be a positive integer");

    let users = [];
    let blogs = [];

    for (let i = 0; i < userCount; i++) {
      users.push(
        new User({
          nickname: faker.internet.userName() + parseInt(Math.random() * 100),
          email: faker.internet.email(),
        })
      );
    }

    console.log("fake data inserting to database...");

    await User.insertMany(users);
    console.log(`${users.length} fake users generated!`);

    users.map((user) => {
      for (let i = 0; i < blogsPerUser; i++) {
        blogs.push(
          axios.post(`${URI}/api/challen/posts`, {
            title: faker.lorem.words(),
            content: faker.lorem.paragraphs(),
            plan: faker.lorem.paragraphs(),
            category: "electricity",
            writer: user,
            fileUrl:
              "https://onetube.s3.ap-northeast-2.amazonaws.com/avatar/garbage-2729608_1920.jpg",
          })
        );
      }
    });

    let newBlogs = await Promise.all(blogs);
    console.log(`${newBlogs.length} fake blogs generated!`);

    console.log("COMPLETE!!");
  } catch (err) {
    console.log(err);
  }
};
