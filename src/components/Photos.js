import React, {useRef, useState} from 'react';
import NaviBar from "./NaviBar";
import '../css/styl.css'
import {addPhoto} from "../store/photos/Collection";
import {useDispatch} from "react-redux";
import collect from '../img/collection.png';
import ErrorHandling from "./ErrorHandling";
import {useAuth} from "../contexts/AuthContext";

export default function Photos(props) {

    const {currentUser} = useAuth()
    const [error, SetError] = useState();
    const [forceUpdate, SetForceUpdate] = useState(1);
    const sortType = useRef();
    const dispatch = useDispatch();

    function sortData(e) {
        e.preventDefault();
        if (sortType.current.value === "views") {
            props = props.photos.sort((a, b) => a.views >= b.views ? 1 : -1);
        }
        if (sortType.current.value === "likes") {
            props = props.photos.sort((a, b) => a.likes >= b.likes ? 1 : -1);
        }
        if (sortType.current.value === "created_at") {
            props = props.photos.sort((a, b) => a.created_at >= b.created_at ? 1 : -1);
        }
        SetForceUpdate(forceUpdate + 1);
    }

    function addToCollection(data) {
        dispatch(addPhoto(data));
        SetError("Udało się");
        setTimeout(function () {
            SetError(undefined);
        }, 4000);
    }

    return (
        <>
            <NaviBar/>
            <div id="myHeader">
                <form onSubmit={sortData} className="sorting">
                    <select className="form-control" ref={sortType}>
                        <option value="likes">Polubienia</option>
                        <option value="views">Wyświetlenia</option>
                        <option value="created_at">Data</option>
                    </select>
                    <button type="submit" className="form-control btn-success mt-1">Sortuj</button>
                </form>
            </div>
            {error === undefined ? null : <ErrorHandling type={"success"} error={error}/>}
            <div className="w-100">
                <div className="row justify-content-md-center">
                    {props.photos.map(data => {
                        return (
                            <div id="img__wrap" className="col-xl-3 col-sm-5   m-2">
                                <img className="img__img w-100" src={data.urls.small}/>
                                <p className="img__description ">@Author: {data.user.username}</p>
                                {props.myCollection || !currentUser ? null :
                                    <div className="img__button " onClick={() => addToCollection(data)}><img
                                        src={collect} alt="add to"/></div>}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
