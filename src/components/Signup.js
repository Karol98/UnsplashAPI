import React, {useRef, useState} from "react"
import {Form, Button, Card, Alert} from "react-bootstrap"
import {useAuth} from "../contexts/AuthContext"
import {Link, useHistory} from "react-router-dom"
import NaviBar from "./NaviBar";

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Podane hasła nie pasują do siebie")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/Login")
        } catch {
            setError("Błąd podczas tworzenia konta")
        }

        setLoading(false)
    }

    return (
        <>
            <NaviBar/>
            <Card className="align-items-center mt-5 justify-content-center w-100 d-flex">
                <Card.Body>
                    <h2 className="text-center mb-4">Zarejestruj się</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Adres e-mai:</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Hasło: </Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Powtórz hasło:</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Zarejestruj się
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Posiadasz konto? <Link to="/login">Zaloguj się</Link>
            </div>
        </>
    )
}
