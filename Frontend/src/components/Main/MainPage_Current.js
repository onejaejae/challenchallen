import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Loading from "../Loading/Loading";

function MainPage_Current() {
    const [currentList, setCurrentList] = useState()
    const [isLoading, setIsLoading] = useState(true);
    async function loadCurrent() {
        await axios.get(`https://api.challenchallen.com/api/challen`).then(
            res => {
                setCurrentList(res.data);
                setIsLoading(false);
            }).then(error => error)
    }
    useEffect(() => {
        loadCurrent()
    }, [])

    const settings = {
        className: "center",
      centerMode: true,
        centerPadding: "10px",
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
    };

    return (
        <>
            { isLoading ? (<div style={{height:'214px', textAlign:'center', marginTop:'10vh'}}>loading...</div>) : (

                <div className="MainPage_Current">
                    <div className="MainPage_Current_title">
                        <p>오늘의 챌린지 현황</p>
                    </div>
                    <div className="MainPage_Current_boxes">
                    <Slider {...settings}>
                        <div className="MainPage_Current_box">
                            <p>오늘 참여자 수</p>
                            <p>+{currentList.sumUserNum}명</p>
                        </div>
                        <div className="MainPage_Current_box">
                            <p>총 챌린지 갯수</p>
                            <p>+{currentList.sumPostNum}개</p>
                        </div>
                        <div className="MainPage_Current_box">
                            <p>오늘 챌린지 갯수</p>
                            <p>+{currentList.todayPostNum}개</p>
                        </div>
                        <div className="MainPage_Current_box">
                            <p>오늘 참여자 수</p>
                            <p>+{currentList.sumUserNum}명</p>
                        </div>
                        </Slider>
                    </div>
                </div>)

            }
        </>
    )
}

export default MainPage_Current
