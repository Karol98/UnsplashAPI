import React, {useState, useEffect, useRef} from "react"
import NaviBar from "./NaviBar";
import Footer from "./Footer";
import Photos from "./Photos";
import '../css/styl.css'
import unsplash from "../contexts/unsplash";
import logo from '../img/logo.png';
import ListCollections from "./ListCollections";
export default function FindUserCollection() {

    const [listOfCollections, SetListOfCollections] = useState();
    const username = useRef();

    async function getUserCollection(e) {
        e.preventDefault();
        let x = await unsplash.users.getCollections({
            username: username.current.value,
        });
        SetListOfCollections(x.response.results);
    }

    return (
        <>
            <NaviBar/>
            <meta charSet="utf-8"/>
            <div className="jumbotron">
                <div className="container justify-content-center d-flex">
                    <img src={logo} alt="logo" className="logoUnsplash"/>
                    <form onSubmit={getUserCollection} className="w-25 justify-content-center text-center">
                        <input type="text" className="mt-2 form-control" placeholder="Nazwa użytkownika" ref={username}
                               required/>
                        <button className="btn-primary form-control mt-4">Pokaż kolekcje</button>
                    </form>
                </div>
            </div>
            {listOfCollections === undefined ? null : <ListCollections collections={listOfCollections}/>}
            <Footer/>
        </>
    )
}