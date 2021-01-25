import {Button} from "react-bootstrap";
import React, {useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import {useHistory} from "react-router-dom";

export default function Logout() {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <Button  className="btn-primary" onClick={handleLogout}>
            Wyloguj
        </Button>

    )
}

