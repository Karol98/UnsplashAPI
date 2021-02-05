import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyBNgk24NV6xJwS0Rl0Xs5plAuZfga1X84o",
    authDomain: "quizbiu.firebaseapp.com",
    projectId: "quizbiu",
    storageBucket: "quizbiu.appspot.com",
    messagingSenderId: "512126771398",
    appId: "1:512126771398:web:dee367788bedbde98cb7c7"
})

export const auth = app.auth()
export default app
