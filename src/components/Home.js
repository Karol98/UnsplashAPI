import React, {useState, useEffect, useRef} from "react"
import NaviBar from "./NaviBar";
import Footer from "./Footer";
import Body from "./Body";
import '../css/styl.css'
import nodeFetch from 'node-fetch';
import {createApi} from 'unsplash-js';
import logo from '../img/logo.png';

export default function Home() {

    const [randomPhotos, SetRandomPhotos] = useState();
    const keyWord = useRef();
    const numberOfResultsRandom = useRef();
    const numberOfResults = useRef();

    const unsplash = createApi({
        accessKey: 'ot1DbXB4IikmR2QOHGacf4ADbnOauST1OrwTH3lNBPc',
        fetch: nodeFetch,
    });

    async function getRandom(e) {
        e.preventDefault();
        let y=10;
        if(numberOfResultsRandom.current.value !== "") {
            y = numberOfResultsRandom.current.value;
        }
        let x = await unsplash.photos.getRandom({
            count: y,
            mode: 'no-cors',
            orientation: 'portrait',
        });
        SetRandomPhotos(x.response);
    };

    const getPhoto = async e => {
        e.preventDefault();
        let y=10;
        if(numberOfResults.current.value >= 0 && numberOfResults.current.value < 100) {
            y = numberOfResults.current.value;
        }
        let x = await unsplash.search.getPhotos({
            query: keyWord.current.value,
            page: 1,
            perPage: y,
            orientation: 'portrait',
        });
        SetRandomPhotos(x.response.results);
    };

    async function initPagePhotos() {
        let x = await unsplash.photos.getRandom({
            count: 10,
            mode: 'no-cors',
            orientation: 'portrait',
        });
        SetRandomPhotos(x.response);
    };

    useEffect(() => {
        (initPagePhotos())
    }, []);

    return (
        <>
            <NaviBar/>
            <meta charSet="utf-8"/>
            <div className="jumbotron">
                <div className="container justify-content-center d-flex">
                    <img src={logo} alt="logo" className="logoUnsplash"/>
                    <form onSubmit={getPhoto} className="w-25 justify-content-center text-center">
                        <input type="number" className="form-control" ref={numberOfResults} placeholder="Ile zdjęć checsz wyszukiwać" />
                        <input type="text" className="mt-2 form-control" placeholder="Słowo klucz" ref={keyWord} required/>
                        <button className="btn-primary mt-4">Wyszukaj zdjęcia</button>
                    </form>
                </div>
            </div>
            {randomPhotos === undefined ? null : <Body photos={randomPhotos}/>}
            <div className="d-flex justify-content-center">
                <form onSubmit={getRandom}>
                    <input type="number" className="form-control" ref={numberOfResultsRandom} placeholder="Ilość losowych zdjęć"/>
                    <button className="mt-3 btn-primary form-control">Przewijaj dalej</button>
                </form>
            </div>
            <Footer/>
        </>
    )
}