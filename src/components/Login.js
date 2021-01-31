import React, {useRef, useState} from "react"
import {Form, Button, Card, Alert} from "react-bootstrap"
import {useAuth} from "../contexts/AuthContext"
import {Link, useHistory} from "react-router-dom"
import NaviBar from "./NaviBar";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import {useAuthState} from 'react-firebase-hooks/auth';

export default function Login() {
    const emailRef = useRef()
    const auth = firebase.auth();
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [user] = useAuthState(auth);

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/Home")
        } catch {
            setError("Failed to log in")
        }

        setLoading(false)
    }


    function SignIn() {
        const signInWithGoogle = () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider);
        }
        return (
            <>
                <Button className="w-100" onClick={signInWithGoogle}>Zaloguj się przez google</Button>
            </>
        )
    }

    return (
        <>
            <NaviBar/>
            <Card className="align-items-center mt-5 justify-content-center w-100 d-flex">
                <Card.Body>
                    <h2 className="text-center mb-4">Zaloguj się</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Adres e-mail:</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Hasło:</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>

                        <Button disabled={loading} className="w-100" type="submit">
                            Zaloguj
                        </Button>
                        <br></br> <br></br>
                        <SignIn/>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Zapomniałeś hasła?</Link>
                    </div>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                Nie masz konta? <Link to="/signup">Zarejestruj się</Link>
            </div>
        </>
    )
}
