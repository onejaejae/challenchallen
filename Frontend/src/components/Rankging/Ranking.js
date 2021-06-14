import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import RankingList from "./RankingList";
import ranking1 from '../util/image/ranking1.png'
import ranking2 from '../util/image/ranking2.png'
import ranking3 from '../util/image/ranking3.png'
import rankingdummy from './rankingdata.json';
import axios from 'axios';
import KakaoShareButton from './KakaoShareButton';
import Loading from "../Loading/Loading";


function Ranking() {
    const [sortMonth, setSortMonth] = useState('all')
    const [sortDaily, setSortDaily] = useState('all')
    const [rankingList, setRankingList] = useState()
    const [isLoading, setIsLoading] = useState(true);

    async function loadRanking() {
        await axios.get(`https://api.challenchallen.com/api/ranking?monthlyCategory=${sortMonth}&dailyCategory=${sortDaily}`).then(
            res => {
                setRankingList(res.data.result);
                setIsLoading(false);
            }).then(error => error)
    }

    useEffect(() => {
        loadRanking()
    }, [rankingList, sortMonth, sortDaily])


    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js'
        script.async = true
        document.body.appendChild(script)
        return () => {
            document.body.removeChild(script)
        }
    }, [])


    const onChangeSortMonth = (e) => {
        setSortMonth(e.target.value)
    }
    const onChangeSortDaily = (e) => {
        setSortDaily(e.target.value)
    }

    return (
        <>
            {isLoading ? (<Loading/>) : (
                <Container>
                    <Wrapper>
                        <Title>종합 챌린지 랭킹</Title>
                        <KakaoShareButton/>
                    </Wrapper>
                    <Top3Wrapper>
                        <RankingItem>
                            <img src={ranking2} alt="ranking2" style={{width: '80px'}}/>
                            <Name>{rankingList.all[1].nickname}</Name>
                            <Like>{rankingList.all[1].score}개</Like>
                        </RankingItem>
                        <RankingItem>
                            <img src={ranking1} alt="ranking1" style={{width: '100px'}}/>
                            <Name>{rankingList.all[0].nickname}</Name>
                            <Like>{rankingList.all[0].score}개</Like>
                        </RankingItem>
                        <RankingItem>
                            <img src={ranking3} alt="ranking3" style={{width: '70px'}}/>
                            <Name>{rankingList.all[2].nickname}</Name>
                            <Like>{rankingList.all[2].score}개</Like>
                        </RankingItem>
                    </Top3Wrapper>
                    <TitleWrapper>
                        <Title>월간 랭킹</Title>
                        <SortSelect value={sortMonth} onChange={e => onChangeSortMonth(e)}>
                            <option value="all">전체</option>
                            <option value="electricity">전기부문</option>
                            <option value="traffic">교통부문</option>
                            <option value="airCondition">냉난방부문</option>
                            <option value="resource">자원부문</option>
                        </SortSelect>
                    </TitleWrapper>
                    <Desc>이번 달 좋아요를 많이 받은 회원님입니다.</Desc>
                    {rankingList.monthly.rank.map((user, index) =>
                        <RankingList index={index} id={user.nickname} like={user.score} key={user.userId}/>
                    )}
                    <TitleWrapper>
                        <Title>일간 랭킹</Title>
                        <SortSelect value={sortDaily} onChange={e => onChangeSortDaily(e)}>
                            <option value="all">전체</option>
                            <option value="electricity">전기부문</option>
                            <option value="traffic">교통부문</option>
                            <option value="airCondition">냉난방부문</option>
                            <option value="resource">자원부문</option>
                        </SortSelect>
                    </TitleWrapper>
                    <Desc>오늘 좋아요를 많이 받은 회원님입니다.</Desc>
                    {rankingList.daily.rank.map((user, index) =>
                        <RankingList index={index} id={user.nickname} like={user.score} key={user.userId}/>
                    )}
                </Container>)

            }
        </>
    );
}

const Container = styled.div`
margin 0 auto;
`;
const TitleWrapper = styled.div`
width: 95%;
margin: 0 auto;
display: flex;
justify-content: space-between;
align-items: center;
`;
const Wrapper = styled.div`
width: 95%;
margin: 0 auto;
display: flex;
justify-content: space-between;
`;

const SortSelect = styled.select`
 width: 80px;
  height:20px;
  font-size:0.8rem;
  color: grey;
  line-height:20px;
  background: white;
  
`;
const Title = styled.div`
font-weight: bold;
margin: 2vh auto;
width: 70%;
font-size: 1.3rem;
`;

const Desc = styled.div`
font-weight: bold;
margin: 2vh auto;
width: 90%;
font-size: 1rem;
color:#707070;
`

const Top3Wrapper = styled.ul`
display: flex;
text-align: center;
justify-content: center;
background-color:#CCE0C4;
height: 30vh;
`;
const RankingItem = styled.li`
display: flex;
flex-direction: column;
justify-content: flex-end;
height: 25vh;
`;
const Name = styled.div`
text-align: center;
font-weight: bold;
font-size: 1rem;
width: 100px;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
`;
const Like = styled.div`
font-weight: bold;
margin: 0.5vh 0;
`;


export default Ranking;