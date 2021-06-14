import React from 'react';
import styled from 'styled-components'
import FeedItem from "./FeedItem";

function FeedList({category, post}) {

    return (
        <FeedListWrapper>
            {post.map(({writer,fileUrl ,likeNum ,_id ,title, comments})=>
                <FeedItem image={fileUrl} writer={writer.nickname} likeNum={likeNum} key={_id} title={title}  category={category} _id={_id} comments={comments}/>
            )}
        </FeedListWrapper>
    );
}

const FeedListWrapper=styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
width: 100%;
height:100%;
min-height:70vh;
column-gap: 1vw;
row-gap: 2vh;
`;
export default FeedList;
