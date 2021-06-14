import React, {useEffect, useState} from 'react';
import styled from "styled-components";

function RankingList({index, id, like}) {
    const colors=['rgba(255,85,109,0.1)','rgba(82,196,188,0.1)','rgba(253,250,190,0.2)','white']
    const [color, setColor] = useState('white')
  
    useEffect(()=>{
        if(index === 0){
            setColor(colors[0])
        }
        if(index === 1){
            setColor(colors[1])
        }
        if(index === 2){
            setColor(colors[2])
        }
        if(index >2 ){
            setColor(colors[3])
        }
    },[index,colors])
    return (
        <Container color={color}>
            <Index>{index+1}위</Index>
            <Id>{id}</Id>
            <LikeList>{like}개</LikeList>
        </Container>
    );
}

const Container = styled.div`
display: flex;
margin: 0.6vh auto;
width: 90%;
height: 50px;
align-items: center;
border: 1px dashed gray;
border-radius: 5px;
 background-color: ${props => props.color};
`;
const Index = styled.div`
font-weight: bold;
width: 20%;
height: 30px;
text-align: center;
line-height: 30px;
`;
const Id = styled.div`
width: 60%;
font-weight: bold;
text-align:center;
font-size: 1.3rem;`;


const LikeList = styled.div`
width: 20%;
text-align: center;
`;
export default RankingList;