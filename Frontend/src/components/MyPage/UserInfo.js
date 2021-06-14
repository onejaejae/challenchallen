import React from 'react';
import './UserInfo.css'
import {MdAccountCircle} from 'react-icons/md'
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import {logout} from '../../actions/user_actions'

function UserInfo({user}) {
    const dispatch = useDispatch()
    const history = useHistory();
    const handleLogout = () => {
        dispatch(logout())
            .then(()=>
                history.push('/'))

    }
    return (
        <div className="userInfo">
            <p>유저 정보</p>
            <ul className="infoContainer">
                <li id="user"><MdAccountCircle size={30} style={{marginRight:'1vw'}}/>{user && user.nickname}</li>
                <li><p>총 탄소 감량량: </p><strong  style={{backgroundColor: 'rgba(64,124,79,0.2)'}}>{user?.reducedCarbon?.allAmount}+ g</strong></li>
                <li><p>오늘의 감량량: </p><strong  style={{backgroundColor: 'rgba(64,124,79,0.2)'}}>{user?.reducedCarbon?.dailyAmount} g</strong></li>
                <li><p>참여한 챌린지 수: </p><strong  style={{backgroundColor: 'rgba(64,124,79,0.2)'}}>{user?.post && user.post.length}개</strong></li>
                <input type="button" value="로그아웃" onClick={handleLogout}/>
            </ul>
        </div>
    );
}


export default UserInfo;
