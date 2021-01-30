import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import "bootstrap/dist/css/bootstrap.min.css"
import {Provider} from 'react-redux'
import {createApi} from "unsplash-js";
import nodeFetch from "node-fetch";
import { createStore } from 'redux';
import {connect} from "react-redux"
import birdApp from "./store/birds/birds";

const store = createStore(birdApp);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
        <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
)


