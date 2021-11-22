import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';


import {API_URL} from "../../config";
import {Button, Col, Form, FormLabel, Modal, Row} from "react-bootstrap";
import {helpApi} from "../../helper/helpApi";

/**
 * Verifíca que el email ingresa sea valido, que contenga un nombre, arroba y dominio validos.
 * @param email string a validar
 * @returns {boolean}
 */
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Verifica que una contraseña tenga un largo dentro de 8 y 32 caracteres,
 * mayusculas, minusculas y números.
 * @param password string a validar
 */
const validatedPassword = (password) => {
    const re = {
        'capital': /[A-Z]/,
        'digit': /[0-9]/,
        'full': /^[A-Za-z0-9]{7,32}$/
    };
    return password.length > 7 && password.length < 32 &&
        re.capital.test(password) && re.digit.test(password) && re.full.test(password);
}

function UpdateUserForm({id}) {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState()
    const [deleteMessage, setDeleteMessage] = useState(false);


    let history = useHistory();

    let api = helpApi();

    useEffect(
        () => {
            if (!email) {
                setEmailError(false);
            } else {
                if (validateEmail(email)) {
                    setEmailError(false);
                } else {
                    setEmailError(true);
                }
            }
        },
        [email]
    );

    useEffect(
        () => {
            if (password) {
                if (validatedPassword(password)){
                    setPasswordError(false);
                    if(confirmPassword !== password){
                        setConfirmPasswordError(true);
                    }
                    else{
                        setConfirmPasswordError(false);
                    }
                }
                else if (password !== "") {
                    setPasswordError(true);
                    setConfirmPasswordError(true);
                }
            }
        },
        [password, confirmPassword]
    );

    const update_user = () => {
        const endPoint = `${API_URL}update-user/${id}`
        const credentials = JSON.parse(localStorage.getItem("credentials"));
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + credentials.token
            },
            body: {id: id, email: email, password: password, admin: admin}
        };
        api.post(endPoint, requestOptions)
            .then(
                (response) => {
                    if (!response.err) {
                        history.push("/users");
                    }
                    else{
                        setError(true);
                    }
                });
    }

    const delete_user = () => {
        const endPoint = `${API_URL}delete-user/${id}`
        const credentials = JSON.parse(localStorage.getItem("credentials"));
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + credentials.token
            },
            body: {id: id, email: email, password: password, admin: admin}
        };
        api.del(endPoint, requestOptions)
            .then(
                (response) => {
                    if (!response.err) {
                        history.push("/users");
                    }
                    else{
                        setError(true);
                    }
                });
    }

    function handleSubmit() {
        if(!emailError && !passwordError && !confirmPassword){
            setValidated(true);
        }
        else{
            setValidated(true);
            update_user();
        }
    }

    return (
        <Form noValidate validated={validated} style={{paddingLeft: "61px",}}>
            <FormLabel>Información</FormLabel>
            <Form.Group className='form-group' md="1" controlId="validationEmail">
                <Form.Label className='form-label'>Correo Electrónico:</Form.Label>
                <Form.Control
                    name='email'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    required
                    type="text"
                    isValid={!emailError}
                    isInvalid={emailError}
                    placeholder='Correo'
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese un correo electrónico valido.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='form-group' md="1" controlId="validationPassword">
                <Form.Label className='form-label'>Contraseña:</Form.Label>
                <Form.Control
                    name='password'
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                    type={hidePassword ? "password" : "text"}
                    isValid={!passwordError}
                    isInvalid={passwordError && password}
                    placeholder='Contraseña'
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese una contraseña que contenga: mayusculas, minusculas y números.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='form-group' md="1" controlId="validationName">
                <Form.Label className='form-label'>Confirmar Contraseña:</Form.Label>
                <Form.Control
                    name='password'
                    onChange={e => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                    type={hidePassword ? "password" : "text"}
                    isValid={!confirmPasswordError}
                    isInvalid={confirmPasswordError && confirmPassword}
                    placeholder='Confirme la Contraseña'
                />
                <Form.Control.Feedback type="invalid">
                    Las contraseñas no coninciden.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 form-label" size="lg" id="formGridCheckbox">
                <Form.Check
                    type="checkbox"
                    label="Mostrar contraseña"
                    value={hidePassword}
                    onChange={() => setHidePassword(!hidePassword)}
                />
            </Form.Group>
            <Form.Group className='form-group' md="1" controlId="validationConfirmPassword">
                <Form.Label className='form-label'>Usuario administrador:</Form.Label>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="¿Es un administrador?"
                    value={admin}
                    onChange={() => setAdmin(!admin)}
                />
            </Form.Group>
            <Row className='text-center'>
                <Col md>
                    <Button
                        variant='danger'
                        onClick={handleSubmit}
                        className='confirm-button'>Actualizar
                    </Button>
                    <Button
                        variant='danger'
                        onClick={() => setDeleteMessage(true)}
                        className='delete-button'>Eliminar
                    </Button>
                </Col>
            </Row>
            <Modal show={error} onHide={() => setError(!error)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error al Actualizar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    A ocurrido un error al actualizar el usuario, puede ser que el correo
                    electronico ingresado ya se encuentre registrado
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setError(!error)}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={deleteMessage} onHide={() => setDeleteMessage(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>Esta seguro que desea eliminar los datos del usuario </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setDeleteMessage(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={delete_user}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
}


export default UpdateUserForm;
