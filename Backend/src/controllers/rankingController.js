import User from "../model/User";

export const getRanking = async (req, res, next) => {
  try {
    const {
      query: {monthlyCategory, dailyCategory}
    } = req;
    let result = {};

    // 전체
    const allUser = await User.find({},{
        "nickname": 1, 
        "allScore.sumScore": 1
      }).sort({
        "allScore.sumScore" : -1
      }).limit(3)
    
    result["all"] = [];
    for (let i=0; i<allUser.length; i++) {
      result["all"].push({
        "userId": allUser[i]["_id"],
        "nickname": allUser[i]["nickname"],
        "score": allUser[i]["allScore"]["sumScore"]
      });
    }

    // 월간
    let monthlyFilter = {};
    let monthlyProj = {};
    if (monthlyCategory !== "all") {
      monthlyFilter[`categoryScore.${monthlyCategory}.monthlyScore`] = -1;
      monthlyProj[`categoryScore.${monthlyCategory}.monthlyScore`] = 1;
      monthlyProj["nickname"] = 1;
    } else {
      monthlyFilter["allScore.monthlyScore"] = -1;
    }
    const monthlyUsers = await User.find({}, monthlyProj).sort(monthlyFilter).limit(10);
  
    result["monthly"] = {"category": monthlyCategory, "rank": []};
    for (let i=0; i<monthlyUsers.length; i++) {
      let monthlyResult = {
        "userId": monthlyUsers[i]["_id"],
        "nickname": monthlyUsers[i]["nickname"]
      };
      if (monthlyCategory !== "all") {
        monthlyResult["score"] = monthlyUsers[i]["categoryScore"][monthlyCategory]["monthlyScore"]
      } else{
        monthlyResult["score"] = monthlyUsers[i]["allScore"]["monthlyScore"]
      }
      result["monthly"]["rank"].push(monthlyResult);
    };

    // 일간
    let dailyFilter = {};
    let dailyProj = {};
    if (dailyCategory !== "all") {
      dailyFilter[`categoryScore.${dailyCategory}.dailyScore`] = -1;
      dailyProj[`categoryScore.${dailyCategory}.dailyScore`] = 1;
      dailyProj["nickname"] = 1;
    } else {
      dailyFilter["allScore.dailyScore"] = -1;
    }
    const dailyUsers = await User.find({},dailyProj).sort(dailyFilter).limit(10);

    result["daily"] = {"category": dailyCategory, "rank": []};
    for (let i=0; i<dailyUsers.length; i++) {
      let dailyResult = {
        "userId": dailyUsers[i]["_id"],
        "nickname": dailyUsers[i]["nickname"]
      };
      if (dailyCategory !== "all") {
        dailyResult["score"] = dailyUsers[i]["categoryScore"][dailyCategory]["dailyScore"];
      } else {
        dailyResult["score"] = dailyUsers[i]["allScore"]["dailyScore"];
      }
      result["daily"]["rank"].push(dailyResult);
    };
    
    return res.status(200).json({result});
  } catch(error) {
    next(error);
  }
};
