import React, {useEffect} from 'react'
import MainPage_Challenge from './MainPage_Challenge'
import MainPage_Charts from './MainPage_Charts'
import MainPage_Current from './MainPage_Current'
import MainPage_Info from './MainPage_Info'
import MainPage_Start from './MainPage_Start'
import {useDispatch} from "react-redux";
import {setUserTemp} from "../../actions/user_actions";

function MainPage() {
const dispatch = useDispatch();
    useEffect(() => {
     dispatch(setUserTemp())
    }, [])

    return (
        <div id="main_page">
            <MainPage_Current/>
            <MainPage_Start/>
            {/* <MainPage_Info/>*/}
            <MainPage_Charts/>
           {/* <MainPage_Challenge/>*/}
        </div>
    )
}

export default MainPage
