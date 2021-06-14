import * as cron from 'node-cron'
import User from "./model/User";
import Post from "./model/Post";

// initialize daily 
cron.schedule('0 0 0 * * *', () => {
  User.updateMany(
    {},
    {
      // 점수
      "allScore.dailyScore": 0,
      "categoryScore.electricity.dailyScore": 0,
      "categoryScore.airCondition.dailyScore": 0,
      "categoryScore.resource.dailyScore": 0,

      // 탄소저감량
      "reducedCarbon.dailyAmount": 0,
   },
  ).then( r => {
    console.log("Daily initialize Success");
  }).catch( err => {
    console.log("Daily initialize Error");
  });
});

// initialize monthly 
cron.schedule('0 0 0 1 * *', () => {
  User.updateMany(
    {},
    {
      "allScore.monthlyScore": 0,
      "categoryScore.electricity.monthlyScore": 0,
      "categoryScore.airCondition.monthlyScore": 0,
      "categoryScore.resource.monthlyScore": 0,
   },
  ).then( r => {
    console.log("Monthly initialize Success");
  }).catch( err => {
    console.log("Maily initialize Error");
  });
})