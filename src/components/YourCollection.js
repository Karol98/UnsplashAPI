import React from 'react';
import {useSelector} from 'react-redux'
import Photos from "./Photos";
import logo from "../img/logo.png";
import Jumbotron from "./Jumobtron";
function YourCollection() {
    const photos = useSelector(state => state.yourcollection);

    return (
        <>
            <Jumbotron/>
            <Photos photos={photos.photos} myCollection={true}/>
        </>

    );
}

export default YourCollection;