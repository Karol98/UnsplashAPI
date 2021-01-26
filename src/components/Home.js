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
        let x = await unsplash.search.getPhotos({
            query: keyWord.current.value,
            page: 1,
            perPage: numberOfResults.current.value,
            orientation: 'portrait',
        });
        console.log(x.response.results);
        SetRandomPhotos(x.response.results);

    }

    async function getRandom() {
        let x = await unsplash.photos.getRandom({
            count: 10,
            orientation: 'portrait',
        });
        SetRandomPhotos(x.response);
    }

    useEffect(() => {
        (getRandom())
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

            <Footer/>
        </>
    )
}