import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import "bootstrap/dist/css/bootstrap.min.css"
import {Provider} from 'react-redux'
import {createApi} from "unsplash-js";
import nodeFetch from "node-fetch";
import {connect} from "react-redux"


ReactDOM.render(
    <React.StrictMode>

        <App/>

    </React.StrictMode>,
    document.getElementById("root")
)


