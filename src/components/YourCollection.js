import React from 'react';
import {useSelector} from 'react-redux'
import Photos from "./Photos";
import logo from "../img/logo.png";

function YourCollection() {
    const photos = useSelector(state => state.yourcollection);

    return (
        <>
            <div className="jumbotron_yourcollection jumbotron">
                <div className="container justify-content-center d-flex">
                    <img src={logo} alt="logo" className="logoUnsplash position-relative"/>
                </div>
            </div>
            <Photos photos={photos.photos} myCollection={true}/>
        </>

    );
}

export default YourCollection;