import React from 'react';
import styled from "styled-components";
import moment from "moment";
import axios from "axios";

function CommentItem({writer, date, content, id, deleteComment}) {
    const strDate = (moment(date).format('YYYY-MM-DD h:mm a'))
    const onDelete = async () =>{
        await  axios.delete(`https://api.challenchallen.com/api/comments/${id}`,{withCredentials:true})
            .then(
                deleteComment(id)
            )
    }
    return (
        <CommentContainer>
            <Info>
                    <Name>{writer}</Name>
                    <Button type="button" onClick={onDelete}>삭제</Button>
            </Info>
            <div>{strDate}</div>
            <Content>{content}</Content>
            <Line/>
        </CommentContainer>
    );
}

const CommentContainer = styled.div``;

const Name = styled.div`
font-weight: bold;
margin-bottom: 1vh;`;

const Info = styled.div`
display: flex;
justify-content: space-between;
margin: 1vh 0 0 0;

`;
const Button = styled.button`
cursor: pointer;
background: white;
border: none;
height: 10px;
`;
const Content = styled.div`
margin: 2vh 0 3vh 0;
`;
const Line = styled.div`
border-bottom: 1px solid gray;
margin: 2vh 0;
`;
export default CommentItem;