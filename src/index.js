import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import "bootstrap/dist/css/bootstrap.min.css"
import {Provider} from 'react-redux'
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import photoApp from "./store/photos/Collection";

const store = createStore(photoApp, composeWithDevTools());

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
        <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
)
