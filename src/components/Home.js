import React from "react"
import NaviBar from "./NaviBar";
import Footer from "./Footer";
import Body from "./Body";
import './style.css'


export default function Home() {
    return (
        <>
            <meta charSet="utf-8"/>
        <div className="jumbotron">
            <img className="_29Gk3" role="presentation" src="https://images.unsplash.com/photo-1610823231022-5d1c830a6e96?ixid=MXwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format%2Ccompress&amp;fit=crop&amp;w=1000&amp;h=1000"/>
        </div>
        <Body/>
        <NaviBar/>
        <Footer/>
        </>
    )
}