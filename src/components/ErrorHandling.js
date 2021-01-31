import React, {useState} from "react";
import {Alert} from "react-bootstrap";
import '../css/fonts.scss'

export default function ErrorHandling(props) {

    return (
        <>
            <div className="RegistrationAlert w-100 d-flex justify-content-center">
                <Alert variant="danger">
                    <Alert.Heading>Błąd!</Alert.Heading>
                    <p>
                        {props.error}
                    </p>
                </Alert>
            </div>
        </>
    )
}
