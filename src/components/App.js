import React from "react"
import {AuthProvider} from "../contexts/AuthContext"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import Home from "./Home"
import Signup from "./Signup";
import FindUserCollection from "./FindUserCollection";
import YourCollection from "./YourCollection";
import PhotoStatistics from "./PhotoStatistics";
import UserStatistics from "./UserStatistics";

function App() {

    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <Route path="/usercollection" component={FindUserCollection}/>
                    <Route path="/signup" component={Signup}/>
                    <PrivateRoute path="/yourcollection" component={YourCollection}/>
                    <Route path="/photostatistics" component={PhotoStatistics}/>
                    <Route path="/userstatistics" component={UserStatistics}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/forgot-password" component={ForgotPassword}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </AuthProvider>
        </Router>
    )
}

export default App
