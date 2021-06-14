import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import MainPage from './components/Main/MainPage';
import Posting from './components/Posting/Posting';
import MyPage from './components/MyPage/MyPage';
import Feed from "./components/Feed/Feed";
import FeedDetail from "./components/FeedDetail/FeedDetail";
import Ranking from "./components/Rankging/Ranking";
import AppLayout from "./components/AppLayout";
import Login from "./components/Login/Login";


function LoginRoutes() {
    return (
        <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/" component={MainPage}/>
            <Route exact path="/mypage" component={MyPage}/>
            <Route exact path="/posting/:category" component={Posting}/>
            <Route exact path="/challenge/:category" component={Feed}/>
            <Route path="/challenge/:category/:id" component={FeedDetail}/>
            <Route path="/ranking" component={Ranking}/>
        </Switch>
    )
}

function HomeRoutes() {
    return (
        <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route exact path="/mypage" component={MyPage}/>
            <Route exact path="/posting/:category" component={Posting}/>
            <Route exact path="/challenge/:category" component={Feed}/>
            <Route path="/challenge/:category/:id" component={FeedDetail}/>
            <Route path="/ranking" component={Ranking}/>
        </Switch>
    )
}

function AppRouter({user}) {
    return (
        <Router>
            <Switch>
            {user ?
                (<AppLayout>
                    <HomeRoutes/>
                </AppLayout>) :
                <AppLayout>
                    <LoginRoutes/>
                </AppLayout>}
            </Switch>
        </Router>
    )
}

export default AppRouter
