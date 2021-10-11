import {Button, Col, Form, FormLabel, Modal, Row} from "react-bootstrap";


import {useEffect, useState} from "react";
import {helpApi} from "../../helper/helpApi";
import {useHistory, useParams} from "react-router-dom";
import Message from "../Message";
import './TouristDestinationAreaForm.css'

import {API_URL, AREAS_URL, DESTINATIONS_URL} from "../../config";

const initialForm ={
    id: 0,
    name: "",
    description: "",
    schedule: "",
    fare: "",
    contact: "",
    recommendation: "",
    difficulty: '',
    latitude: '',
    longitude: '',
    hikes: "",
    photos_path: "",
    is_beach: false,
    is_forest: false,
    is_volcano: false,
    is_mountain: false,
    start_season: '',
    end_season: '',
    conservation_area_id: ''
};

const months = [
    {
        id: 1,
        month:"Enero"
    },
    {
        id: 2,
        month: "Febrero",
    },
    {
        id: 3,
        month: "Marzo",
    },
    {
        id: 4,
        month: "Abril",
    },
    {
        id: 5,
        month: "Mayo",
    },
    {
        id:6,
        month: "Junio",
    },
    {
        id: 7,
        month: "Julio",
    },
    {
        id: 8,
        month: "Agosto",
    },
    {
        id: 9,
        month: "Septiembre",
    },
    {
        id: 10,
        month: "Octubre",
    },
    {
        id: 11,
        month: "Noviembre",
    },
    {
        id: 12,
        month: "Diciembre",
    }
]

const ManageFormTD = () => {
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState(false)
    const [validated, setValidated] = useState(false);
    const [photos, setPhotos] = useState(null);
    const [conservationArea, setConservationArea] = useState([])
    const [show, setShow] = useState(false);

    let {id} = useParams()
    let url = `${API_URL}${DESTINATIONS_URL}update/`
    let history = useHistory()
    let api = helpApi()

    useEffect(() => {
        let endpoint = `${API_URL}${AREAS_URL}`
        helpApi()
            .get(endpoint)
            .then((res) => {
                if (!res.err) {
                    setConservationArea(res);
                    setError(null);
                } else {
                    setConservationArea(null);
                    setError(res.err);
                }
            });
    }, [id]);

    useEffect(() => {
            let endpoint = `${API_URL}${DESTINATIONS_URL}${id}`
            helpApi()
                .get(endpoint)
                .then((res) => {
                    if (!res.err) {
                        //res.photos_path = res.photos_path.split(",").map(e => `${api_url}${e}`)
                        //res.region_path = `${api_url}${res.region_path}`
                        setForm(res);
                        setError(false);
                    } else {
                        setForm(initialForm);
                        setError(res.err);
                    }
                });
        },
        [id, url])

    const updateData = (data) => {
        let endpoint = `${url}${id}`
        let options = {
            body: data,
            headers: { "content-type": "application/json" },
        };
        api.post(endpoint, options).then((res) => {
            if (!res.err) {
                updateImages(res.id)
                setForm(initialForm)
                setError(false)
                history.push("/tourist-destination")
            } else {
                window.alert("Error al actualizar")
                setError(res.err)
            }
        });
    };

    const updateImages = (id) => {
        let endpoint = `${url}${id}/photos`
        const formPhotos = new FormData();
        for (let i = 0; i < photos.length; i++) {
            formPhotos.append(`photos`, photos[i])
        }
        const requestOptions = {
            method: 'POST',
            body: formPhotos,
            mimeType: "multipart/form-data",
            redirect: 'follow'
        };
        fetch(endpoint, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => setError(error));
    }

    const handlePhoto = (e) => {
        setPhotos(e.target.files)
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handlePress = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.checked,
        });
    }

    const validatedData =  !!(form.name !== initialForm.name &&
        form.description !== initialForm.description &&
        form.schedule !== initialForm.schedule  &&
        form.fare !== initialForm.fare  &&
        form.contact !== initialForm.contact  &&
        form.recommendation !== initialForm.recommendation  &&
        form.hikes !== initialForm.hikes  &&
        form.difficulty !== initialForm.difficulty &&
        form.latitude !== initialForm.latitude &&
        form.longitude !== initialForm.longitude &&
        form.difficulty !== initialForm.difficulty &&
        form.start_season !== initialForm.start_season &&
        form.end_season !== initialForm.end_season &&
        photos);

    const handleSubmit = () => {
        if (validatedData && !error){
            updateData(form)
            setValidated(true)
        }
        else setValidated(true);
    };

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleDelete = () => {
        let endpoint = `${API_URL}${DESTINATIONS_URL}${id}`
        api.del(endpoint).then((res) => {
            if (!res.err) {
                setForm(initialForm)
                setError(false)
                history.push("/tourist-destination")
            } else {
                window.alert("Error al eliminar")
                setError(res.err)
            }
        });
    }

    return(
        <Form to="/tourist-destination" noValidate validated={validated} style={{paddingLeft: "61px", }}>
            {error && <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545"/>}
            <FormLabel>Información</FormLabel>
            <Form.Group className='form-group' md="1" controlId="validationName">
                <Form.Label className='form-label'>Nombre:</Form.Label>
                <Form.Control
                    //className="form-control"
                    name='name'
                    onChange={handleChange}
                    value={form.name}
                    required
                    type="text"
                    placeholder="Nombre del Destino"
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese un nombre valido.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='form-group' md="1" controlId="validationConservationArea">
                <Form.Label className='form-label'>Área de Conservación:</Form.Label>
                <Form.Select isValid={form.conservation_area_id !== ''} isInvalid={form.conservation_area_id === ''} name='conservation_area_id' onChange={handleChange}>
                    <option value=''>Seleccione un Área de Conservación</option>
                    {
                        (conservationArea.length > 0) &&
                        conservationArea.map((element) =>
                            <option key={element.id} value={element.id}>{element.name}</option>
                        )
                    }
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    Por favor seleccione un area.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='form-group' md="1" controlId="validationDescription">
                <Form.Label className='form-label'>Descripción:</Form.Label>
                <Form.Control
                    //style={{fontSize: '12px', height: '100px',}}
                    as="textarea"
                    name='description'
                    onChange={handleChange}
                    value={form.description}
                    required
                    placeholder="Ingrese una descripción del Destino"
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese una descripción.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='form-group' md="1" controlId="validationSchedule">
                <Form.Label className='form-label'>Horario:</Form.Label>
                <Form.Control
                    //style={{fontSize: '12px', height: '100px',}}
                    as="textarea"
                    name='schedule'
                    onChange={handleChange}
                    value={form.schedule}
                    required
                    placeholder="Ingrese el Horario Semanal"
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese el Horario de Apertura.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='form-group' md="1" controlId="validationTare">
                <Form.Label className='form-label'>Tarifas:</Form.Label>
                <Form.Control
                    //style={{fontSize: '12px', height: '100px',}}
                    as="textarea"
                    name='fare'
                    onChange={handleChange}
                    value={form.fare}
                    required
                    placeholder="Ingrese las Tarifas"
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese la información de las tarifas.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='form-group' md="1" controlId="validationContact">
                <Form.Label className='form-label'>Contacto:</Form.Label>
                <Form.Control
                    //style={{fontSize: '12px', height: '100px',}}
                    as="textarea"
                    name='contact'
                    onChange={handleChange}
                    value={form.contact}
                    required
                    placeholder="Ingrese información de Contacto"
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese la información de opciones de contacto.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='form-group' md="1" controlId="validationRecommendation">
                <Form.Label className='form-label'>Recomendaciones:</Form.Label>
                <Form.Control
                    as="textarea"
                    name='recommendation'
                    onChange={handleChange}
                    value={form.recommendation}
                    required
                    placeholder="Recomendaciones para la visita"
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese recomendaciones importante para la visita.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='form-group' md="4" controlId="validationHikes">
                <Form.Label className='form-label'>Caminatas:</Form.Label>
                <Form.Control
                    name='hikes'
                    onChange={handleChange}
                    value={form.hikes}
                    required
                    type="text"
                    placeholder="Duración y Distancia"
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese la distancia y duración.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='form-group' md="1" controlId="validationDifficulty">
                <Form.Label className='form-label'>Dificultad:</Form.Label>
                <Form.Select isValid={form.difficulty !== ''} isInvalid={form.difficulty === ''} name='difficulty' onChange={handleChange}>
                    <option value={form.difficulty}>{form.difficulty}</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    Por favor seleccione una dificultad (1:bajo, 5:alto).
                </Form.Control.Feedback>
            </Form.Group>
            <Row lg={2} >
                <Col md='auto'>
                    <Form.Group className='form-group' md="4" controlId="validationLatitude">
                        <Form.Label className='form-label'>Latitud:</Form.Label>
                        <Form.Control
                            name='latitude'
                            onChange={handleChange}
                            value={form.latitude}
                            required
                            type="text"
                            placeholder="Latitud del Destino"
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese el valor de la latitud.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md='auto'>
                    <Form.Group className='form-group' md="1" controlId="validationLongitude">
                        <Form.Label className='form-label'>Longitud:</Form.Label>
                        <Form.Control
                            name='longitude'
                            onChange={handleChange}
                            value={form.longitude}
                            required
                            type="text"
                            placeholder="Longitud del Destino"
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese el valor de la longitud.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row lg={2} >
                <Col md='auto'>
                    <Form.Group className='form-group' md="4" controlId="validationSeasonStart">
                        <Form.Label className='form-label'>Mes inicio de Temporada:</Form.Label>
                        <Form.Select isValid={form.start_season !== ''} isInvalid={form.start_season === ''} name='start_season' onChange={handleChange}>
                            <option value={0}>{(form.start_season > 0) ? months[(form.start_season-1)].month : "Inicio de Temporada"}</option>
                            {
                                months.map( (element) =>
                                    <option key={element.id} value={element.id}>{element.month}</option>
                                )
                            }
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Por favor seleccione una mes de inicio.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md='auto'>
                    <Form.Group className='form-group' md="1" controlId="validationSeasonEnd">
                        <Form.Label className='form-label'>Mes inicio de Temporada:</Form.Label>
                        <Form.Select isValid={form.end_season !== ''} isInvalid={form.end_season === ''} name='end_season' onChange={handleChange}>
                            <option value={0}>{(form.end_season > 0) ? months[(form.end_season-1)].month : "Fin de Temporada"}</option>
                            {
                                months.map( (element) =>
                                    <option key={element.id} value={element.id}>{element.month}</option>
                                )
                            }
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Por favor seleccione una mes de fin.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label className='form-label'>Etiquetas:</Form.Label>
                <Row sm={4}>
                    <Col md="auto">
                        <Form.Check
                            name='is_beach'
                            checked={form.is_beach}
                            value={form.is_beach}
                            onChange={handlePress}
                            label="Playa"
                        /></Col>
                    <Col md="auto">
                        <Form.Check
                            type='checkbox'
                            name='is_forest'
                            value={form.is_forest}
                            onChange={handlePress}
                            checked={form.is_forest}
                            label="Bosque"
                        /></Col>
                    <Col md="auto">
                        <Form.Check
                            name='is_volcano'
                            checked={form.is_volcano}
                            value={form.is_volcano}
                            onChange={handlePress}
                            label="Volcan"
                        /></Col>
                    <Col md="auto">
                        <Form.Check
                            name='is_mountain'
                            checked={form.is_mountain}
                            value={form.is_mountain}
                            onChange={handlePress}
                            label="Montaña"
                        />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className='form-group' md="1" controlId="formFileMultiple">
                <Form.Label className='form-label'>Seleccione fotografías del lugar:</Form.Label>
                <Form.Control
                    required
                    type="file"
                    multiple
                    onChange={handlePhoto}
                />
                <Form.Control.Feedback type="invalid">
                    Por favor agrege imagenes del lugar.
                </Form.Control.Feedback>
            </Form.Group>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Destino Turístico</Modal.Title>
                </Modal.Header>
                <Modal.Body>Esta seguro que desea eliminar los datos del destino: {form.name}</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleDelete}>Cancelar</Button>
                    <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
            <Row className='text-center' >
                <Col md>
                    <Button variant='success' onClick={handleSubmit} className='confirm-button' >Actualizar</Button>
                    <Button variant='danger' onClick={handleShow} className='delete-button'>Eliminar</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default ManageFormTD;