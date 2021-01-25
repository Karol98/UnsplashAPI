import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyCUKL12bEdFsKvMNaVoWh5iNlCLet3rjfw",
    authDomain: "telemed-300210.firebaseapp.com",
    projectId: "telemed-300210",
    storageBucket: "telemed-300210.appspot.com",
    messagingSenderId: "574925208539",
    appId: "1:574925208539:web:7519ec26326e948de245fe"
})

export const auth = app.auth()
export default app
