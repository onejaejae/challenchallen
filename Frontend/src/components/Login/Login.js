import React from 'react';
import {BsChatFill} from 'react-icons/bs'
import naverBtn from './btn_naver.png'
import './Login.css'

function Login() {
    return (
        <div className="login_container">
            <div id="title">로그인</div>

            <button className="kakao_button">
                <BsChatFill size={25} style={{marginRight:'1vw'}}/>
            <a href={`https://api.challenchallen.com/api/kakao`}>
                카카오로 로그인하기
            </a>
            </button>
        </div>
    );
}

export default Login;