import {Button, Col, Form, FormLabel, Row} from "react-bootstrap";


import {useState} from "react";
import {helpApi} from "../../helper/helpApi";
import {useHistory} from "react-router-dom";
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

const AddFormCA = () => {
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState(false)
    const [validated, setValidated] = useState(false);
    const [photos, setPhotos] = useState(null);
    const [region, setRegion] = useState(null)

    let url = `${API_URL}${AREAS_URL}`
    let history = useHistory()
    let api = helpApi();


    const validatedData = !!(form.name !== '' && form.description !== '' && photos && region);


    const createData = (data) => {
        const credentials = JSON.parse(localStorage.getItem("credentials"));
        if (validatedData) {
            let options = {
                body: data,
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer " + credentials.token
                },
            };
            api.post(url, options).then((res) => {
                if (!res.err) {
                    sendImages(res.id)
                    setForm(initialForm)
                    setError(false)
                    history.push("/conservation-area")
                } else {
                    window.alert("Error al registrar")
                    setError(res.err)
                }
            });
        }

    };

    const sendImages = (id) => {
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
            headers :{
                Authorization: "Bearer " + credentials.token
            }
        };
        fetch(endpoint, requestOptions)
            .then(response => {
                response.text()})
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

    const handleSubmit = () => {
        if (validatedData) {
            createData(form)
            setValidated(true)
        } else setValidated(true);
    };

    return (
        <Form noValidate validated={validated} style={{paddingLeft: "61px",}}>
            {error && <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545"/>}
            <FormLabel>Informaci??n</FormLabel>
            <Form.Group className='form-group' md="1" controlId="validationName">
                <Form.Label className='form-label'>Nombre:</Form.Label>
                <Form.Control
                    //className="form-control"
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
            <Form.Group className='form-group' md="1" controlId="validationDescription">
                <Form.Label className='form-label'>Descripci??n:</Form.Label>
                <Form.Control
                    //style={{fontSize: '12px', height: '100px',}}
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
            <Form.Group style={{marginTop: '14px', marginBottom: '14px', marginRight: '50%'}} md="1"
                        controlId="formFileMultiple">
                <Form.Label style={{fontSize: '14px'}}>Seleccione fotograf??as del lugar:</Form.Label>
                <Form.Control
                    //className="form-control"
                    required
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
                    //className="form-control"
                    required
                    type="file"
                    onChange={handleRegion}
                />
                <Form.Control.Feedback type="invalid">
                    Por favor agrege una imagen del mapa de la regi??n.
                </Form.Control.Feedback>
            </Form.Group>
            <Row className='text-center'>
                <Col md>
                    <Button variant='danger' onClick={handleSubmit} className='confirm-button'>Registrar</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default AddFormCA;