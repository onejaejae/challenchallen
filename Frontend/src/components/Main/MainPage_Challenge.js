import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {IoIosCheckboxOutline} from 'react-icons/io'

import {Link} from "react-router-dom";

function MainPage_Challenge() {
    return (
        <div className="MainPage_Challenge">
            <div className="MainPage_Challenge_title">
                <p>이제는 생활 속 작은참여로<strong style={{backgroundColor:'rgba(64,124,79,0.2)'}}>탄소 중립을 실천</strong> 할 때입니다</p>
            </div>
            <div className="MainPage_Challenge_desc">
                <div className="MainPage_Challenge_desc_1">
                    <p><strong style={{color:'#9D9D9D', marginRight:'2vw'}}>01</strong> 실천할 저탄소 챌린지를 선택해주세요</p>
                    <ul>
                        <li><IoIosCheckboxOutline size={20} color="#40804F" style={{marginRight:'3vw'}}/>전기 부문</li>
                        <li><IoIosCheckboxOutline size={20} color="#40804F" style={{marginRight:'3vw'}}/>교통 부문</li>
                        <li><IoIosCheckboxOutline size={20} color="#40804F" style={{marginRight:'3vw'}}/>냉낭방 부문</li>
                        <li><IoIosCheckboxOutline size={20} color="#40804F" style={{marginRight:'3vw'}}/>자원 부문</li>
                    </ul>

                </div>
                <div className="MainPage_Challenge_desc_2">
                    <div className="MainPage_Challenge_desc_2_title" >
                    <p><strong style={{color:'#9D9D9D', marginRight:'2vw'}}>02</strong>간단한 인증과 함께 사람들과 공유해보세요</p>
                    </div>
                    <div className="MainPage_Challenge_desc_2_cont">
                        <img src="images/tumblr.png" alt="tumblr" width={110} height={110} />
                        <div>
                        <p>자원 부문</p>
                        <p>#일회용품 대신 텀블러 사용하기</p>
                        <p className="desc">카페 갈때는 항상 텀블러를 챙겨서 가요!</p>
                        <p className="desc">오늘도 일회용컵 대신 텀블러!</p>
                        </div>
                    </div>
                </div>
                <div className="MainPage_Challenge_btn">
                    <Link to="/challenge/all"><button>공유된 챌린지 보러 가기</button></Link>
                </div>

            </div>
        </div>
    )
}

export default MainPage_Challenge
