import {combineReducers} from 'redux';


const ADD_PHOTO = 'ADD_PHOTO';


export function addPhoto(photo) {
    return {
        type: ADD_PHOTO,
        photo,
    }
}

const defaultPhotos = {
    photos: [],
}


function collection(state = defaultPhotos, action) {
    switch (action.type) {
        case ADD_PHOTO:
            return {
                ...state, photos: [...state.photos, action.photo]
            }
        default:
            return state
    }
}

const photoApp = combineReducers({
    yourcollection: collection
});


export default photoApp;