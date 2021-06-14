import React from 'react'
import {Link} from "react-router-dom";

function MainPage_Start() {
    return (
        <div className="MainPage_Start">
            <div className="MainPage_Start_title">
                <p>.</p>
            </div>
            <div className="MainPage_Start_desc">
                <p>챌린챌린은</p>
                <p>우리 모두 참여할 수 있는</p>
                <p>환경 챌린지 입니다.</p>
            </div>
            <div className="MainPage_Start_btn">
                <p>생활 속 작은 챌린지로 세상을 바꿔볼까요?</p>
                <Link to="/challenge/all">
                    <button>챌린지 바로 참여하기</button>
                </Link>
            </div>
        </div>
    )
}

export default MainPage_Start
