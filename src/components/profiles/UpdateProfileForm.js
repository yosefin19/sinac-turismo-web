import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';
import {API_URL} from "../../config";
import {Button, Col, Form, FormLabel, Modal, Row} from "react-bootstrap";
import {helpApi} from "../../helper/helpApi";


function UpdateProfileForm({id}) {
    const [userId, setUserId] = useState(0);
    const [name, setName] = useState( "");
    const [validatedName, setValidatedName] = useState(true);
    const [phone, setPhone] = useState( "");
    const [validatedPhone, setValidatePhone] = useState(true);
    const [profilePath, setProfilePath] = useState( "");
    const [coverPath, setCoverPath] = useState( "");
    const [profile, setProfile] = useState(null);
    const [cover, setCover] = useState(null);
    const [error, setError] = useState(false);
    const [deleteMessage ,setDeleteMessage] = useState(false);


    const [validated, setValidated] = useState(false);
    const history = useHistory();
    let api = helpApi();

    useEffect(() => {
        const apiUrl = `${API_URL}profile/` + id;
        const credentials = JSON.parse(localStorage.getItem("credentials"));
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + credentials.token
            },
        }
        fetch(apiUrl, options)
            .then(res => res.json())
            .then(
                (result) => {
                    setUserId(result.user_id)
                    setName(result.name)
                    setPhone(result.phone)
                    setCoverPath(result.cover_photo_path)
                    setProfilePath(result.profile_photo_path)
                },
            )
    }, [id])

    useEffect(() => {
        if(name) setValidatedName(true)
        else setValidatedName(false)
    }, [name])

    useEffect(() => {
        if(phone && phone.length > 7) setValidatePhone(true)
        else setValidatePhone(false)
    }, [phone])

    const update_image = (type) => {
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
            .then(result => {
                if (type === 'cover') setCoverPath(result)
                if (type === 'profile') setProfilePath(result)
            })
            .catch(error => setError(error));

    }
    const update_profile = () => {

        //primero agrego cada foto, me retorna el path de cada foto y los guardo
        if(profile) update_image('profile');
        if(cover) update_image('cover');

        let api = helpApi();
        const url = API_URL + 'update-profile/' + id;
        const credentials = JSON.parse(localStorage.getItem("credentials"));

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + credentials.token
            },
            body:{
                id: id,
                name: name,
                phone: phone,
                user_id: userId,
                profile_photo_path: profilePath,
                cover_photo_path: coverPath
            }
        };
        api.post(url, requestOptions)
            .then((response) => {
                if (!response.err) {
                    history.push("/profiles");
                }
                else{
                    setError(true);
                }
            })
    }

    const delete_profile = () => {
        const endPoint = API_URL + 'delete-profile/' + id;
        const credentials = JSON.parse(localStorage.getItem("credentials"));
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + credentials.token
            },
        };
        api.del(endPoint, requestOptions)
            .then(
                (response) => {
                    if (!response.err) {
                        history.push("/profiles");
                    }
                    else{
                        setError(true);
                    }
                });
    }


    function handleSubmit() {
        if(userId && validatedName && validatedPhone){
            setValidated(true);
            update_profile()
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
                    placeholder={name ? name : 'Nombre'}
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese el nombre de la persona.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='form-group' md="1" controlId="validationPhone">
                <Form.Label className='form-label'>Teléfono:</Form.Label>
                <Form.Control
                    placeholder={phone ? phone : 'Teléfono'}
                    name='phone'
                    onChange={e => setPhone(e.target.value)}
                    value={phone}
                    required
                    type="tel"
                    isValid={validatedPhone}
                    isInvalid={phone && !validatedPhone}
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese el télefono de la persona.
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
                    A ocurrido un error al registrar el usuario.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setError(!error)}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={deleteMessage} onHide={() => setDeleteMessage(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>Esta seguro que desea eliminar el perfil del usuario </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setDeleteMessage(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={delete_profile}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
}


export default UpdateProfileForm;
