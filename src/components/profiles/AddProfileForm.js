import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';

import {API_URL} from "../../config";
import {Button, Col, Form, FormLabel, Modal, Row} from "react-bootstrap";
import {helpApi} from "../../helper/helpApi";



function AddProfileForm() {

    const [name, setName] = useState("");
    const [validatedName, setValidatedName] = useState(false);
    const [phone, setPhone] = useState("");
    const [validatedPhone, setValidatePhone] = useState(false);
    const [user, setUser] = useState("");
    const [profile, setProfile] = useState(null);
    const [cover, setCover] = useState(null);
    const [error, setError] = useState(false);


    const [validated, setValidated] = useState(false);
    const history = useHistory();


    const add_profile = () => {
        let api = helpApi();
        const endPoint = API_URL + 'add-profile'
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: {
                id: 0,
                name: name,
                phone: phone,
                user_id: user,
                profile_photo_path: "/",
                cover_photo_path: "/"
            }
        };
        api.post(endPoint, requestOptions)
            .then(
                 (response) => {
                    if (!response.err) {
                        const id = response.id
                        if (profile) addImage(id, "profile")
                        if (cover) addImage(id, "cover")
                        setError(false)
                        history.push("/profiles");
                    } else {
                        setError(true)
                    }

                })
    }
    const addImage = (id, type) => {

        const url = API_URL + 'profiles/photo/' + type + '/' + id
        const credentials = JSON.parse(localStorage.getItem("credentials"));

        const formPhotos = new FormData();
        if (type === 'cover') {
            formPhotos.append(`image`, cover, cover.name)
        } else {
            formPhotos.append(`image`, profile, profile.name)
        }
        const requestOptions = {
            method: 'POST',
            body: formPhotos,
            mimeType: "multipart/form-data",
            headers :{
                Authorization: "Bearer " + credentials.token
            }

        };
        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => setError(error));
    }

    useEffect(() => {
        if(name) setValidatedName(true)
        else setValidatedName(false)
    }, [name])

    useEffect(() => {
        if(phone && phone.length > 7) setValidatePhone(true)
        else setValidatePhone(false)
    }, [phone])

    function handleSubmit() {
        if(user && validatedName && validatedPhone){
            setValidated(true);
            add_profile()
        }
        else setValidated(true);
    }

    return (
        <Form noValidate validated={validated} style={{paddingLeft: "61px",}}>
            <FormLabel>Información</FormLabel>
            <Form.Group className='form-group' md="1" controlId="validationName">
                <Form.Label className='form-label'>Nombre:</Form.Label>
                <Form.Control
                    name='name'
                    onChange={e => setName(e.target.value)}
                    value={name}
                    required
                    type="text"
                    isValid={validatedName}
                    isInvalid={name && !validatedName}
                    placeholder='Nombre'
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese el nombre de la persona.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='form-group' md="1" controlId="validationPhone">
                <Form.Label className='form-label'>Teléfono:</Form.Label>
                <Form.Control
                    name='phone'
                    onChange={e => setPhone(e.target.value)}
                    value={phone}
                    required
                    type="tel"
                    isValid={validatedPhone}
                    isInvalid={phone && !validatedPhone}
                    placeholder='Teléfono'
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese el télefono de la persona.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='form-group' md="1" controlId="validationUser">
                <Form.Label className='form-label'>Identificador Usuario asociado:</Form.Label>
                <Form.Control
                    name='userId'
                    onChange={e => setUser(e.target.value)}
                    value={user}
                    required
                    type="number"
                    isValid={user}
                    isInvalid={!user}
                    placeholder='Identificador de Usuario'
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese un identificador.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='form-group' md="1" controlId="validateProfile">
                <Form.Label className='form-label'>Foto de Perfil:</Form.Label>
                <Form.Control
                    required
                    type="file"
                    onChange={e => setProfile(e.target.files[0])}
                />
                <Form.Control.Feedback type="invalid">
                    Por favor agrege una foto de perfil.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='form-group' md="1" controlId="validateCover">
                <Form.Label className='form-label'>Foto de Portada:</Form.Label>
                <Form.Control
                    required
                    type="file"
                    onChange={e => setCover(e.target.files[0])}
                />
                <Form.Control.Feedback type="invalid">
                    Por favor agrege una foto de portada.
                </Form.Control.Feedback>
            </Form.Group>
            <Modal show={error} onHide={() => setError(!error)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error al Registrar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    A ocurrido un error al crear el perfil, verifique que el identificador
                    corresponda con un usuario registrado en el sistema.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setError(!error)}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row className='text-center'>
                <Col md>
                    <Button variant='danger' onClick={handleSubmit} className='confirm-button'>Registrar</Button>
                </Col>
            </Row>
        </Form>
    );
}


export default AddProfileForm;
