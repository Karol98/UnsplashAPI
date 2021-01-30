import React, {useState, useRef} from "react"
import NaviBar from "./NaviBar";
import Footer from "./Footer";
import '../css/styl.css'
import unsplash from "../contexts/unsplash";
import logo from '../img/logo.png';
import ListCollections from "./ListCollections";
import ErrorHandling from "./ErrorHandling";

export default function FindUserCollection() {

    const [listOfCollections, SetListOfCollections] = useState();
    const username = useRef();
    const [error, SetError] = useState();

    async function getUserCollection(e) {
        e.preventDefault();
        await unsplash.users.getCollections({
            username: username.current.value,
        }).then(response => {
            if (response.response.results.length !== 0) {
                SetListOfCollections(response.response.results);
                SetError(undefined);
            } else
                SetError("Użytkownik nie posiada żadnych kolekcji");
        }).catch(err => {
            SetListOfCollections(undefined);
            SetError("Błąd nie znaleziono użytkownika");
        })
    }

    return (
        <>
            <NaviBar/>
            <meta charSet="utf-8"/>
            <div className="jumbotron_collection jumbotron">
                <div className="container justify-content-center d-flex">
                    <img src={logo} alt="logo" className="logoUnsplash"/>
                    <form onSubmit={getUserCollection} className="w-25 justify-content-center text-center">
                        <input type="text" className="mt-2 form-control" placeholder="Nazwa użytkownika" ref={username}
                               required/>
                        <button className="btn-primary form-control mt-4">Pokaż kolekcje</button>
                    </form>
                </div>
            </div>
            {error === undefined ? null : <ErrorHandling error={error}/>}
            {listOfCollections === undefined ? null : <ListCollections collections={listOfCollections}/>}
            <Footer/>
        </>
    )
}