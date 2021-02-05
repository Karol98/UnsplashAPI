import React, {useRef, useState} from "react";
import unsplash from "../apiInitializate/unsplash";
import NaviBar from "./NaviBar";
import logo from "../img/logo.png";
import ErrorHandling from "./ErrorHandling";
import {Bar} from "react-chartjs-2";
import Footer from "./Footer";

export default function UserStatistics() {
    const userName = useRef();
    const [forceUpdate, SetForceUpdate] = useState(1);
    const [views, SetViews] = useState([]);
    const [likes, SetLikes] = useState([]);
    const [downloads, SetDownloads] = useState([]);
    const [error, SetError] = useState();

    async function handleSearch(e) {
        e.preventDefault();
        const url = "https://api.unsplash.com/users/";
        const user = userName.current.value;
        const request = "/statistics";
        const apiKey = "?client_id=ot1DbXB4IikmR2QOHGacf4ADbnOauST1OrwTH3lNBPc";
        const SearchUrl = url + user + request + apiKey;
        await myRespone(SearchUrl).then(response => {
            if (response.errors === undefined) {
                SetError(undefined);
                SetViews(response.views.historical.values);
                SetLikes(response.likes.historical.values);
                SetDownloads(response.downloads.historical.values);
                SetForceUpdate(forceUpdate + 1);
            } else {
                SetError(response.errors)
                SetForceUpdate(1);
            }
        }).catch(error => {
            SetForceUpdate(1);
            SetError(error);
        })
    }

    async function myRespone(SearchUrl) {
        try {
            let res = await fetch(SearchUrl);
            return res.json();
        } catch (err) {
            return err;
        }
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
            <div className="jumbotron_userstatiistics jumbotron">
                <div className="container justify-content-center d-flex">
                    <img src={logo} alt="logo" className="logoUnsplash"/>
                    <form onSubmit={handleSearch} className="w-25 justify-content-center text-center ">
                        <input type="text" className="mt-2 form-control" placeholder="ID zdjęcia" ref={userName}
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