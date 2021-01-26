import React from 'react';
import NaviBar from "./NaviBar";
import '../css/styl.css'

export default function Body(props) {

    return (
        <>
            <NaviBar/> <br/><br/>
            <div className="w-100">
                <div className="row justify-content-md-center">
                    {props.photos.map((data, index) => {
                            return (
                                <div className="col-3 m-2 ">
                                    <img src={data.urls.small}/>
                                </div>
                            )
                        })}
                </div>
            </div>
        </>
    )
}
