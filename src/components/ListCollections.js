import React, {useState} from 'react';
import '../css/styl.css'
import unsplash from "../contexts/unsplash";
import Photos from "./Photos";

export default function ListCollections(props) {

    const [collectionPhotos, SetCollectionPhotos] = useState(props.forceUpdate);

    async function getCollectionById(id) {
        let x = await unsplash.collections.getPhotos({
            collectionId: id,
            perPage: 30
        });
        console.log(x.response.results);
        SetCollectionPhotos(x.response.results);
    }

    if (collectionPhotos === undefined) {
        return (
            <>
                <div className="row justify-content-md-center w-100">
                    {props.collections.map((data) => {
                        return (
                            <div id="collection4" className="col-3 m-4">
                                <div id="pointer__collection" onClick={() => getCollectionById(data.id)}>
                                    {data.preview_photos.map((photo, index) => {
                                        if (index < 3)
                                            return (
                                                <img className="coll1 img__img w-100" alt="collection"
                                                     src={photo.urls["small"]}/>
                                            )
                                    })}
                                </div>
                                <h4 className="collection_title text-center mt-2">{data.title}</h4>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    } else {
        return (
            <>
                <button className="button_back btn-primary mb-4 form-control" onClick={() => SetCollectionPhotos(undefined)}> Wróć</button>
                <Photos photos={collectionPhotos}/>
            </>
        )
    }
}
