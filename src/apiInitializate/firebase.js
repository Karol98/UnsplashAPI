import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    //Put your api Key here
})

export const auth = app.auth()
export default app
