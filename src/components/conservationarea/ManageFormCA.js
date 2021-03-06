import {Button, Col, Form, FormLabel, Modal, Row} from "react-bootstrap";


import {useEffect, useState} from "react";
import {helpApi} from "../../helper/helpApi";
import {useHistory, useParams} from "react-router-dom";
import Message from "../Message";
import './ConservationAreaForm.css'
import {API_URL, AREAS_URL} from "../../config";

const initialForm = {
    id: 0,
    name: "",
    description: "",
    photos_path: "",
    region_path: ""
};

const ManageFormCA = () => {
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState(false)
    const [validated, setValidated] = useState(false);
    const [photos, setPhotos] = useState(null);
    const [region, setRegion] = useState(null)

    const [show, setShow] = useState(false);

    let {id} = useParams()
    let url = `${API_URL}${AREAS_URL}update/`
    let history = useHistory()
    let api = helpApi()

    useEffect(() => {
            let endpoint = `${API_URL}${AREAS_URL}${id}`
            helpApi()
                .get(endpoint)
                .then((res) => {
                    if (!res.err) {
                        setForm(res);
                        setError(false);
                    } else {
                        setForm(initialForm);
                        setError(res.err);
                    }
                });
        },
        [id])

    const updateData = (data) => {
        let endpoint = `${url}${id}`
        const credentials = JSON.parse(localStorage.getItem("credentials"));
        let options = {
            body: data,
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + credentials.token
            },
        };
        api.post(endpoint, options).then((res) => {
            if (!res.err) {
                updateImages(res.id)
                setForm(initialForm)
                setError(false)
                history.push("/conservation-area")
            } else {
                window.alert("Error al actualizar")
                setError(res.err)
            }
        });
    };

    const updateImages = (id) => {
        let endpoint = `${url}${id}/photos`
        const credentials = JSON.parse(localStorage.getItem("credentials"));
        const formPhotos = new FormData();
        for (let i = 0; i < photos.length; i++) {
            formPhotos.append(`photos`, photos[i])
        }
        formPhotos.append('region_photo', region, region.name)
        const requestOptions = {
            method: 'POST',
            body: formPhotos,
            mimeType: "multipart/form-data",
            redirect: 'follow',
            headers: {
                Authorization: "Bearer " + credentials.token
            },
        };
        fetch(endpoint, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => setError(error));
    }

    const handlePhoto = (e) => {
        setPhotos(e.target.files)
    }

    const handleRegion = (e) => {
        setRegion(e.target.files[0])
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const validatedData = !!(form.name !== '' && form.description !== '' && photos && region);

    const handleSubmit = () => {
        if (validatedData && !error) {
            updateData(form)
            setValidated(true)
        } else setValidated(true);
    };

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleDelete = () => {
        let endpoint = `${API_URL}${AREAS_URL}${id}`
        const credentials = JSON.parse(localStorage.getItem("credentials"));
        let options = {
            headers: {
                Authorization: "Bearer " + credentials.token
            },
        };
        api.del(endpoint, options).then((res) => {
            if (!res.err) {
                setForm(initialForm)
                setError(false)
                history.push("/conservation-area")
            } else {
                window.alert("Error al eliminar")
                setError(res.err)
            }
        });
    }

    return (
        <Form to="/conservation-area" noValidate validated={validated} style={{paddingLeft: "61px",}}>
            {error && <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545"/>}
            <FormLabel>Informaci??n</FormLabel>
            <Form.Group className='form-group' md="1" controlId="validationCustom03">
                <Form.Label className='form-label'>Nombre:</Form.Label>
                <Form.Control
                    className='form-control'
                    name='name'
                    onChange={handleChange}
                    value={form.name}
                    required
                    type="text"
                    placeholder="Nombre del ??rea de Conservaci??n"
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese un nombre valido.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='form-group' md="1" controlId="validationCustom04">
                <Form.Label className='form-label'>Descripci??n:</Form.Label>
                <Form.Control
                    className='form-control'
                    as="textarea"
                    name='description'
                    onChange={handleChange}
                    value={form.description}
                    required
                    placeholder="Ingrese una descripci??n del Lugar"
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese una descripci??n.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='form-group' controlId="formFileMultiple">
                <Form.Label className='form-label'>Seleccione fotograf??as del lugar:</Form.Label>
                <Form.Control
                    className='form-control'
                    required
                    //value={URL.createObjectURL()}
                    type="file"
                    multiple
                    onChange={handlePhoto}
                />
                <Form.Control.Feedback type="invalid">
                    Por favor agrege imagenes del lugar.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='form-group' md="1" controlId="formFile">
                <Form.Label className='form-label'>Seleccione una imagen de la regi??n:</Form.Label>
                <Form.Control
                    className='form-control'
                    required
                    type="file"
                    multiple
                    onChange={handleRegion}
                />
                <Form.Control.Feedback type="invalid">
                    Por favor agrege una imagen del mapa de la regi??n.
                </Form.Control.Feedback>
            </Form.Group>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar ??rea de Conservaci??n</Modal.Title>
                </Modal.Header>
                <Modal.Body>Esta seguro que desea eliminar los datos del ??rea de conservaci??n: {form.name}</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Cancelar</Button>
                    <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
            <Row className='text-center'>
                <Col md>
                    <Button variant='success' onClick={handleSubmit} className='confirm-button'>Actualizar</Button>
                    <Button variant='danger' onClick={handleShow} className='delete-button'>Eliminar</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default ManageFormCA;