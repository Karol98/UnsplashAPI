import React, {useState, useEffect, useRef} from "react"
import NaviBar from "./NaviBar";
import Footer from "./Footer";
import Body from "./Body";
import '../css/styl.css'
import nodeFetch from 'node-fetch';
import {createStore} from "redux";
import {createApi} from 'unsplash-js';
import {Nav} from "react-bootstrap";

export default function Home() {
    const [randomPhotos, SetRandomPhotos] = useState();
    const keyWord = useRef();
    const numberOfResults = useRef(10);

    const unsplash = createApi({
        accessKey: 'ot1DbXB4IikmR2QOHGacf4ADbnOauST1OrwTH3lNBPc',
        fetch: nodeFetch,
    });


    const getPhoto = async e => {
        e.preventDefault();
        console.log("szukam zdjęć");
        let x = await unsplash.search.getPhotos({
            query: keyWord.current.value,
            page: 1,
            perPage: numberOfResults.current.value,
            orientation: 'portrait',
        });
        console.log(x.response.results);
        SetRandomPhotos(x);

    }

    async function getRandom() {
        console.log("ładuje losowe zdjęcia")
        let x = await unsplash.photos.getRandom({
            count: 10,
            mode: 'no-cors',
            orientation: 'portrait',
        });
        SetRandomPhotos(x.response);
    }

    useEffect((e) => {
        (getRandom(e))
    }, []);


    return (
        <>
            <NaviBar/>
            <meta charSet="utf-8"/>
            <div className="jumbotron">
                <div className="container justify-content-center d-flex">
                    <form onSubmit={getPhoto} className="w-25 justify-content-center text-center">
                        <input type="number" ref={numberOfResults} placeholder="Ile zdjęć checsz wyszukiwać" required/>
                        <input type="text" className="m-2 w-75" placeholder="Słowo klucz" ref={keyWord} required/>
                        <button className="btn-primary">Wyszukaj zdjęcia</button>
                    </form>
                </div>
            </div>
            {randomPhotos === undefined ? null : <Body photos={randomPhotos}/>}
            <div className="d-flex justify-content-center">
                <form onSubmit={getRandom}>
                    <button className="btn-primary">Przewijaj dalej</button>
                </form>
            </div>
            <Footer/>
        </>
    )
}