import React, {useRef, useState} from 'react';
import NaviBar from "./NaviBar";
import '../css/styl.css'

export default function Photos(props) {

    const [forceUpdate, SetForceUpdate] = useState(1);
    const sortType = useRef();

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
            <div className="w-100">
                <div className="row justify-content-md-center">
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
