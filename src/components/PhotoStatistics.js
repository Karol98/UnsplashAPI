import React, {useRef, useState} from "react";
import logo from "../img/logo.png";
import Footer from "./Footer";
import NaviBar from "./NaviBar";
import unsplash from '../apiInitializate/unsplash'
import {Bar, Line} from "react-chartjs-2";
import ErrorHandling from "./ErrorHandling";

export default function PhotoStatistics() {

    const photoId = useRef();
    const [forceUpdate, SetForceUpdate] = useState(1);
    const [views, SetViews] = useState([]);
    const [likes, SetLikes] = useState([]);
    const [downloads, SetDownloads] = useState([]);
    const [error, SetError] = useState();

    async function getPhotoStats(e) {
        e.preventDefault();
        console.log(photoId.current.value);
        await unsplash.photos.getStats({
            photoId: photoId.current.value
        }).then(response => {
            SetError(undefined);
            SetViews(response.response.views.historical.values);
            SetLikes(response.response.likes.historical.values);
            SetDownloads(response.response.downloads.historical.values);
            SetForceUpdate(forceUpdate + 1);
        }).catch(error => {
            SetForceUpdate(1);
            SetError("Nie znaleziono zdjęcia");
        })
    }

    const extractValuesData = (data) => {
        return data.map(d => d.date);
    }
    const extractValues = (data) => {
        return data.map(d => d.value);
    }

    return (
        <>
            <NaviBar/>
            <meta charSet="utf-8"/>
            <div className="jumbotron_statistics jumbotron">
                <div className="container justify-content-center d-flex">
                    <img src={logo} alt="logo" className="logoUnsplash"/>
                    <form onSubmit={getPhotoStats} className="w-25 justify-content-center text-center ">
                        <input type="text" className="mt-2 form-control" placeholder="ID zdjęcia" ref={photoId}
                               required/>
                        <button className="btn-primary form-control mt-4">Pokaż statystyki</button>
                    </form>
                </div>
            </div>
            {error === undefined ? null : <ErrorHandling type="danger" error={error}/>}
            {forceUpdate !== 1 ?
                <Bar data={
                    {
                        labels: extractValuesData(views),
                        datasets: [{
                            label: 'Wyświetlenia',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: extractValues(views)
                        },
                            {
                                label: 'Polubienia',
                                backgroundColor: 'rgb(10, 122, 222)',
                                borderColor: 'rgb(10, 122, 222)',
                                data: extractValues(likes),
                            },
                            {
                                label: 'Liczba pobrań',
                                backgroundColor: 'rgb(222, 222, 122)',
                                borderColor: 'rgb(10, 122, 222)',
                                data: extractValues(downloads),
                            }
                        ]
                    }}
                     height={100}
                /> : null}
            <Footer/>
        </>
    )
}