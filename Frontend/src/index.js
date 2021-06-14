import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import {store} from "./store/store";
import "./components/Header.css";
import "./components/Footer.css";
import "./components/Main/MainPage.css";
import "./components/Posting/Posting.css";
import "./components/MyPage/MyPage.css";
import {setUserTemp} from "./actions/user_actions";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function loadLocalUser() {
    try {
        const user = sessionStorage.getItem("user");
        if (!user) return;
        store.dispatch(setUserTemp())

    } catch (e) {
        console.log('sessionStorage is not working');
    }
}

loadLocalUser();

ReactDOM.render(
    <Provider store = {store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);


