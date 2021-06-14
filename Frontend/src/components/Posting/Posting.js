import React, {useEffect, useState} from 'react'
import moment from 'moment';
import Image from "./Image";
import {category, electricity, traffic, airCondition, resource} from '../util/selectOption'
import Select from "./Select";
import axios from "axios";

function Posting({match, history}) {
    const [submitFlag, setSubmitFlag] = useState(false)
    const writer = sessionStorage.getItem('user');
    const [date, setDate] = useState('');
    const urlCategory = match.params.category;
    const [selectPlan, setSelectPlan] = useState([]);
    const [etc, setEtc] = useState(false);
    const [calculate, setCalculate] = useState(false);
    const [min, setMin] = useState('');
    const [postContent, setPostContent] = useState(
        {
            writer: `${writer}`,
            category: `${urlCategory}`,
            fileUrl: '',
            title: '',
            plan: '',
            etcPlan: '',
            reducedCarbon: '',
            content: '',

        }
    )

    useEffect(() => {
        if (postContent.category === 'electricity') {
            setSelectPlan(electricity)
            setCalculate(true)
        }
        if (postContent.category === 'traffic') {
            setSelectPlan(traffic)
            setCalculate(false)
        }
        if (postContent.category === 'airCondition') {
            setSelectPlan(airCondition)
            setCalculate(true)
        }
        if (postContent.category === 'resource') {
            setSelectPlan(resource)
            setCalculate(false)
            setPostContent({
                ...postContent,
                plan: '',
                etcPlan: '',
                reducedCarbon: ''
            })
        }
        setPostContent({
            ...postContent,
            plan: '',
            etcPlan: '',
            reducedCarbon: ''
        })
        setMin('')
    }, [postContent.category])

    useEffect(() => {
        if (postContent.plan === 'etc') {
            setEtc(true)
            setPostContent({
                ...postContent,
                reducedCarbon: ''
            })
        } else {
            setPostContent({
                ...postContent,
                reducedCarbon: ''
            })
            setEtc(false)
        }
        setMin('')
    }, [postContent.plan])

    const onChangeContent = (e) => {
        const {name, value} = e.target;
        setPostContent({
            ...postContent,
            [name]: value
        })
    }
    const onChangeMin = (e) => {
        setMin(e.target.value)
    }
    const onChangeCategory = (e) => {
        setPostContent({
            ...postContent,
            category: e.target.value
        })
    }
    const onChangePlan = (e) => {
        setPostContent({
            ...postContent,
            plan: e.target.value
        })
    }
    const doubleSubmitCheck = () => {
        if (submitFlag) {
            return submitFlag
        } else {
            setSubmitFlag(true);
            return false;
        }
    }
    const handleUpload = () => {
        if (postContent.fileUrl === '') {
            alert('인증사진을 추가해주세요')
            return
        }
        if (postContent.title === '' || postContent.title.length > 100) {
            alert('제목을 100글자 이하로 입력해주세요')
            return
        }
        if (postContent.plan === 'select') {
            alert('실천방안을 선택해주세요')
            return
        }
        if (postContent.plan === "etc" && postContent.etcPlan === '') {
            alert('기타 실천방안을 입력해주세요')
            return
        }
        if (postContent.content === '' || postContent.content.length < 5) {
            alert('내용을 5글자 이상으로 입력해주세요')
            return
        }
        if (doubleSubmitCheck()) return;
        axios.post(`https://api.challenchallen.com/api/challen/posts`, postContent, {withCredentials: true})
            .then(() => {
                    alert('챌린지 등록이 완료되었습니다.')
                    history.push('/challenge/all')
                }
            )
    }

    useEffect(() => {
        const nowDate = new Date();
        setDate(moment(nowDate).format('YYYY-MM-DD'))
    }, [])

    useEffect(() => {
        if ((postContent.category === 'resource' || postContent.category === 'traffic') && postContent.plan !== '' && postContent.plan !== 'etc') {
            axios.get(`https://api.challenchallen.com/api/calculator?category=${postContent.category}&plan=${postContent.plan}`, {withCredentials: true})
                .then(response => {
                        setPostContent({...postContent, reducedCarbon: response.data.reducedCarcon})
                    }
                )

        }
    }, [postContent.category, postContent.plan])


    const onCalculate = () => {
        axios.get(`https://api.challenchallen.com/api/calculator?category=${postContent.category}&plan=${postContent.plan}&sparedTime=${min}`, {withCredentials: true})
            .then(response => {
                    setPostContent({...postContent, reducedCarbon: response.data.reducedCarcon})
                }
            )
    }
    return (
        <div className="Posting">
            <div className="Posting_title">
                <p style={{
                    border: '1px solid #707070',
                    padding: '0.5vh 0.5vw',
                    width: '100px',
                    margin: '1vh auto'
                }}>{date}</p>
                <p>당신의 <strong
                    style={{backgroundColor: 'rgba(64,124,79,0.2)'}}>작은 실천</strong>이 지구를 바꿉니다.</p>
            </div>
            <div className="Posting_cont">
                <p>챌린지 인증 사진</p>
                <Image postContent={postContent} setPostContent={setPostContent}/>
            </div>
            <div className="Posting_cont_input">
                <p>카테고리</p>
                <form>
                    <Select options={category} onChange={onChangeCategory} defaultValue={urlCategory}/>
                </form>
                <p>제목</p>
                <form>
                    <input name="title" onChange={onChangeContent} placeholder="제목"/>
                </form>
                <p>실천 방안</p>
                <form>
                    {selectPlan && <Select options={selectPlan} onChange={onChangePlan}/>}
                </form>
                {etc &&
                <div>
                    <p>기타 실천 방안</p>
                    <form>
                        <input name="etcPlan" onChange={onChangeContent} placeholder="실천 방안"/>
                    </form>
                </div>
                }
                <p>내용</p>
                <form>
                    <textarea name="content" onChange={onChangeContent} rows="4"/>
                </form>
                {calculate && postContent.plan !== '' && !etc &&
                <div>
                    <p>탄소 저감량 계산하기</p>
                    <div className="cal_input">
                        <input className="minutes" value={min} onChange={onChangeMin}
                               placeholder="실천하신 시간(분 단위)을 입력해주세요."/>
                        <button className="cal_btn" type="button" onClick={onCalculate}>계산하기</button>
                    </div>
                </div>
                }
                {postContent.reducedCarbon && <div className="reduce_carcon"><strong
                    style={{backgroundColor: 'rgba(64,124,79,0.2)'}}>{postContent.reducedCarbon}</strong>g 만큼의
                    <p>탄소를
                        감량했습니다
                    </p></div>}
                <div className="Posting_btn">
                    <button onClick={handleUpload}>등록하기</button>
                </div>
            </div>
        </div>
    )
}

export default Posting