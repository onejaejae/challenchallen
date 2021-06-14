import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import {MdErrorOutline, MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';
import NavBar from "./NavBar";
import FeedList from "./FeedList";
import PostingButton from "./PostingButton";
import DescriptionModal from "./modal/DescriptionModal";
import axios from "axios";


function Feed({match}) {
    const user = sessionStorage.getItem('user');
    const[loading, setLoading] = useState(true);
    const [post, setPost] = useState([])
    const [sort, setSort] = useState('latest')
    const [isOpen, setIsOpen] = useState(false);
    const [skip, setSkip] = useState(0);

    const onChangeSort = (e) => {
        setSort(e.target.value)
    }
    const category = match.params.category;

    useEffect(() => {
        axios.get(`https://api.challenchallen.com/api/challen/posts?category=${category}&sort=${sort}&skip=${skip}`).then(
            response => {
                setLoading(false)
                setPost(response.data.posts)
            }
        ).then(error => error)
    }, [category, sort, skip])

    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false)
    }

    const onPrevClick = (e) => {
        if (skip !== 0) {
            setSkip(skip - 1)
        } else {
            window.alert("첫화면입니다.")
        }
    }
    const onNextClick = (e) => {
        if (post.length !== 0) {
            setSkip(skip + 1)
        }
    }

    return (
        <div>
            <NavBar/>
            <FeedContainer>
                <Line/>
                <TopWrapper>
                    {user && <PostingButton category={category}/>}
                    <MdErrorOutline size={30} color='#40804F' style={{cursor: 'pointer'}} onClick={openModal}/>
                    <SortSelect value={sort} onChange={e => onChangeSort(e)}>
                        <option value="latest">최신순</option>
                        <option value="likes">인기순</option>
                    </SortSelect>
                </TopWrapper>
                {isOpen ? <DescriptionModal closeModal={closeModal}/> : ''}
                {loading && <NoContent>loading...</NoContent>}
                {!loading && post.length === 0 && <NoContent>게시물이없습니다.</NoContent>}
                <FeedList category={category} post={post}/>
            </FeedContainer>
            <ButtonWrapper>
                <Button className="next_btn" onClick={onPrevClick}>
                    <MdKeyboardArrowLeft size={30}/>
                    Previous
                </Button>
                <Button className="next_btn" onClick={onNextClick}>
                    Next
                    <MdKeyboardArrowRight size={30}/>
                </Button>
            </ButtonWrapper>
        </div>
    );
}

const FeedContainer = styled.div`
margin: 0 auto;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
`;

const TopWrapper = styled.div`
display: flex;
justify-content: space-between;
width: 95%;
margin: 1vh auto;
align-items: center;
`;
const SortSelect = styled.select`
 width: 80px;
  height:25px;
  font-size:0.8rem;
  color: grey;
  line-height:20px;
  background: white;
  margin-left: 1vw;
  
`;
const NoContent = styled.div`
text-align: center;
`;
const Line = styled.div`
border-bottom: 1px solid #838383;
margin: 2vh 0;
`;

const ButtonWrapper = styled.div`
margin: 3vh 0;
display:flex;
align-items: center;
justify-content: space-between;
`;

const Button = styled.button`
text-align: center;
width: 100px;
height: 30px;
  color: black;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  :focus {
    outline: none;
  }

`;

export default Feed;
