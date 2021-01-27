import React from 'react';
import NaviBar from "./NaviBar";
import '../css/styl.css'

export default function Body(props) {
    return (
        <>
            <NaviBar/> <br/><br/>
            <div className="w-100">
                <div className="row justify-content-md-center">
                    {console.log(props)}
                    {props.photos.map((data, index) => {
                            return (
                                <div id="img__wrap" className="col-3 m-2">
                                    <img className="img__img w-100" src={data.urls.small}/>
                                    <p className="img__description ">@Author: {data.user.username}</p>
                                </div>
                            )
                        })}
                </div>
            </div>
        </>
    )
}
