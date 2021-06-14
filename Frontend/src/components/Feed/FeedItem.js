import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {RiPlantFill,RiChat1Line} from 'react-icons/ri'

function FeedItem({writer,likeNum ,_id ,title,category, image, comments}) {

    return (
        <ItemContainer>
        <Link to={`/challenge/${category}/${_id}`} style={{textDecoration:'none'}}>
            <div style={{height:'150px'}}>
        <Img src={`https://api.challenchallen.com/${image}`} alt="image"/>
            </div>
            <Title>{title}</Title>
        </Link>
            <InfoContainer>
                    <div>{writer}</div>
            </InfoContainer>
            <Wrapper>
                <RiChat1Line size={20}/>
                <div style={{marginRight:'1vw'}}>{comments?.length}개</div>
                <RiPlantFill size={20} style={{marginRight:'0.5vw'}}/>
                <div>{likeNum}개</div>
            </Wrapper>
        </ItemContainer>
    );
}

const ItemContainer = styled.div`
display: flex;
flex-direction: column;
width: 180px;
height : 200px;
margin: 2.5vh auto;
`;
const Title = styled.div`
width: 50%;
height : 20px;
overflow: hidden;
text-overflow: ellipsis;
width: 100%;
white-space: nowrap;
text-decoration: none;
color: black;
font-weight: bold;
margin: 1vh 0;
`;
const Img = styled.img`
width: 100%;
height:150px;
border-radius: 5px;
margin-bottom: 1.2vh;
`;
const InfoContainer = styled.div`
display: flex;
justify-content: space-between;
`;
const Wrapper = styled.div`
display: flex;
align-items: center;
opacity: 0.5;
margin: 1vh 0;
`;
export default FeedItem;