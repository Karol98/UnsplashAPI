import React from "react"
import {AuthProvider} from "../contexts/AuthContext"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import Chat from "./Chat";
import Home from "./Home"
import Signup from "./Signup";
import FindUserCollection from "./FindUserCollection";
import YourCollection from "./YourCollection";

function App() {

    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <Route path="/chat" component={Chat}/>
                    <Route path="/usercollection" component={FindUserCollection}/>
                    <Route path="/signup" component={Signup}/>
                    <PrivateRoute path="/yourcollection" component={YourCollection}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Home}/>
                    <Route path="/forgot-password" component={ForgotPassword}/>
                </Switch>
            </AuthProvider>
        </Router>
    )
}

export default App
