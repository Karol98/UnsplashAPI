import React from "react";
import logo from "../img/logo.png";

export default function Jumbotron() {
    return (
        <div className="jumbotron_yourcollection jumbotron">
            <div className="container justify-content-center d-flex">
                <img src={logo} alt="logo" className="logoUnsplash position-relative"/>
            </div>
        </div>
    );
}