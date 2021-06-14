import React from 'react';
import './Badge.css';
import badge1 from '../util/image/badge1.png'
import badge5 from '../util/image/badge5.png'
import badge10 from '../util/image/badge10.png'
import badge15 from '../util/image/badge15.png'
import badge20 from '../util/image/badge20.png'
import badge30 from '../util/image/badge30.png'
import BadgeItem from "./BadgeItem";

const userBadge = [
    {text:'첫 업로드', image: `${badge1}`},
    {text:'연속 5회 업로드', image: `${badge5}`},
    {text:'연속 10회 업로드', image: `${badge10}`},
    {text:'연속 15회 업로드', image: `${badge15}`},
    {text:'연속 20회 업로드', image: `${badge20}`},
    {text:'연속 30회 업로드', image: `${badge30}`},
]
function BadgeList({badge}) {
   if(typeof badge!=='undefined'){
     if(badge.length !== 0) {
        badge.forEach((item, index) => userBadge[index].image = item)
    }
   }
    return (
        <div className="badgeList">
            <p>나의 뱃지</p>
            <div className="badgeItemContainer">
                {userBadge && userBadge.map(({text, image})=><BadgeItem key={text} text={text} image={image} /> )}
            </div>
        </div>
    );
}


export default BadgeList;