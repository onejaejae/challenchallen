import React, {useState} from 'react';
import styled from "styled-components";
import CommentItem from "./CommentItem";
import axios from "axios";

function Comment({comments, id}) {
    const writer = sessionStorage.getItem('user')
    const [commentsArray, setCommentsArray] = useState(comments);
    const [comment, setComment] = useState('');

    const onChangeComment = (e) => {
        setComment(e.target.value)
    }
    const addComment = () => {
        if (!comment) {
            alert('댓글을 입력해주세요')
            return
        }
        const body = {
            postId: `${id}`,
            writer,

            content: comment,
        }
        axios.post(`https://api.challenchallen.com/api/comments`, body, {withCredentials: true})
            .then(response => {
                const newComments = commentsArray.concat(response.data.comment)
                setCommentsArray(newComments)
                alert('댓글이 등록되었습니다.')
                setComment('')
            })
    }
    const deleteComment = (id) =>{
        const newComments = commentsArray.filter((item)=>item._id !== id)
        setCommentsArray(newComments);
        alert('댓글이 삭제되었습니다.')
    }
    return (
        <CommentContainer>
            <Title>{commentsArray && commentsArray.length}개의 댓글</Title>
            {writer &&
                <div style={{display:'flex', flexDirection:'column'}}>
                <Textarea placeholder="댓글을 입력해주세요." value={comment} onChange={onChangeComment}/>
                <Button type="button" value="댓글 작성" onClick={addComment}/>
                <Line/>
                </div>
            }
            {commentsArray && commentsArray.map(({_id, writer, content, createdAt}) =>
                <CommentItem key={_id}
                             id={_id} writer={writer?.nickname} content={content} date={createdAt} deleteComment={deleteComment}/>)}
        </CommentContainer>
    );
}

const CommentContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
`;
const Title = styled.div`
font-weight: bold;
font-size: 1.2rem;
margin: 1vh 0 2vh 0;
`;

const Textarea = styled.textarea`
width: 100%;
height: 15vh;
margin-top: 1vh;
border: 1px solid gray;
resize: none;
background-color: white;
`;
const Button = styled.input`
  font-size: 1rem;
  cursor: pointer;
  width: 100px;
  height: 40px;
  text-align: center;
  padding: 8px 10px;
  border-radius: 30px;
  background-color: #40804F;
  color: white;
  font-weight: bold;
  border: none;
  margin: 2vh 0 3vh auto;
`;
const Line = styled.div`
border-bottom: 1px solid gray;
margin: 2vh 0;
`;
export default Comment;