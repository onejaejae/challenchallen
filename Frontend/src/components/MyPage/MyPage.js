import React, { useEffect, useState } from 'react'
import BadgeList from "./BadgeList";
import UserInfo from "./UserInfo";
import {useSelector} from "react-redux";
import Loading from "../Loading/Loading"
import axios from "axios";
import {MdKeyboardArrowRight,MdKeyboardArrowLeft} from 'react-icons/md'

function MyPage() {
    const [myFeed, setMyFeed] = useState([])
    const [page, setPage]=useState(0)
    useEffect(() => {
        axios.get(`https://api.challenchallen.com/api/mypage/posts`,  {withCredentials: true}).then(
            response =>{
                setMyFeed(response.data.userPosts.post)
            }
        ).then(error => error)
    }, [])


    const user = useSelector(state => state.user.user)
    if (!user) {
        return <Loading/>
    }

    const onPrevClick=(e)=>{
        if(page===0){
            window.alert("첫게시물입니다.");
        }
        else{
            setPage(page-1)
        }
    }

    const onNextClick=(e)=>{
        if((page*4 + 4) >= myFeed.length){
            window.alert("마지막게시물입니다.");
        }
        else{
            setPage(page+1)
        }
    }

    return (
        <div className="MyPage">
            <UserInfo user={user}/>
            <BadgeList badge={user.badgeUrl}/>

            <div className="MyPage_UserFeed">
                <div className="MyPage_UserFeed_title">
                    <p>나의 피드</p>
                </div>
                <div className="MyPage_UserFeed_container">
                    {myFeed.length === 0 && <div style={{textAlign:'center'}}>loading...</div>}
                <ul className="MyPage_UserFeed_desc">
                    {myFeed && myFeed.slice(page, page+4).map(({fileUrl},index)=>
                       <li key={index}><img src={`https://api.challenchallen.com/${fileUrl}`} alt={fileUrl} /></li>
                    )}
                </ul>
                </div>
                <div className="btn_container">
                <div className="next_btn" onClick={onPrevClick}>
                <MdKeyboardArrowLeft size={30}/>
               Previous
                </div>
                <div className="next_btn" onClick={onNextClick}>
                    Next
                <MdKeyboardArrowRight size={30} />
                </div>
                </div>
            </div>
        </div>

    )
}

export default MyPage
