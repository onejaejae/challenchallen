import React from 'react';
import styled from 'styled-components'
import {MdClose} from 'react-icons/md'
import DescriptionContent from "./DescriptionContent";
import {Link} from "react-router-dom";

function DescriptionModal({closeModal}) {
    const electricity=["TV 사용 시간 줄이기","세탁기 사용 시간 줄이기","컴퓨터 사용 시간 줄이기","전기밥솥 보온 시간 줄이기","전자레인지 사용시간 줄이기"]
   const traffic =["가까운 거리는 도보나 자전거 이용하기", "승용차 대신 대중교통 이용하기"]
    const airCondition = ["에어컨 사용 시간 줄이기","선풍기 사용 시간 줄이기", "보일러 사용 시간 줄이기", "전기장판 사용 시간 줄이기"]
    const resource =["종이타월 대신 개인 손수건 사용하기","종이컵 대신 개인컵 사용하기","비닐봉투 대신 장바구니 사용하기","재활용이 가능한 유리병, 캔 등 분리배출하기", "물을 받아서 설거지하기"]
    return (
        <Dimmer>
            <Container>
                <Content>
                    <MdClose size={25} color="black" style={{margin: '1.5vh 0 1.5vh auto', cursor: 'pointer'}} onClick={closeModal}/>
                    <div>각 부문 별 기본 챌린지들을 확인해보세요!</div>
                    <DescriptionContent title="전기 부문" array={electricity}/>
                    <DescriptionContent title="교통 부문" array={traffic}/>
                    <DescriptionContent title="냉난방 부문" array={airCondition} />
                    <DescriptionContent title="자원 부문" array={resource}/>
                    <div style={{margin:'3vh 0'}}>
                        탄소 저감량 계산은 <a href="http://www.kcen.kr/USR_main2016.jsp??=life/life04">한국 기후 환경 네트워크</a>를 참조했습니다.
                    </div>
                </Content>
            </Container>
        </Dimmer>
    );
}

const Dimmer = styled.div`
 position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000080;
  z-index: 100;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 50%;
  height: 400px;
  position: absolute;
  top: 23%;
  left: 25%;
  background-color: white;
  z-index: 99;
  box-shadow: 0px 1px 1px rgba(15, 15, 15, 0.2);
   overflow-y: scroll;
    @media (max-width: 768px) {
    width: 75%;
    height: 500px;
    left: 10%;
    top: 25%;
    overflow-y: scroll;
  }
;
`
const Content = styled.div`
display: 90%;
margin: 1vh auto;
display: flex;
flex-direction:column;
`;
export default DescriptionModal;