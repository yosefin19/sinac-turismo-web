import {Button, Form, Modal, Spinner} from "react-bootstrap";
import {useState} from "react";
import {helpApi} from "../../helper/helpApi";
import {API_URL} from "../../config";
import Message from "../Message";
import {useHistory} from "react-router-dom";

const ResetPasswordForm = () => {

    const history = useHistory()
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const [profile, setProfile] = useState(null);
    const [existUser, setExistUser] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)
    const [isChange, setIsChange] = useState(false)


    let api = helpApi();

    const emailValidation = () => {
        let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(email) && email.length > 4;
    }

    const phoneValidation = () => {
        return phoneNumber !== "" && phoneNumber === profile.phone
    }

    function findUser() {
        setLoading(true)
        let endPoint = `${API_URL}find-user`;
        let options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: {
                email: email,
                password: "",
            },
        }
        api.post(endPoint, options).then((res) => {
            console.log(res)
            if (!res.err) {
                setProfile(res)
                setError(false)
                setExistUser(true)
            } else {
                window.alert("No se ha encontrado un usuario registrado con el correo indicado")
                setError(res.err)
                setExistUser(false)
            }
            setLoading(false)
            setValidated(false)
        });
    }

    function changePassword() {
        setLoading(true);
        let endPoint = `${API_URL}reset-password`;
        console.log(endPoint)
        let options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: {
                email: email,
                password: "",
            },
        }
        api.post(endPoint, options).then((res) => {
            console.log(res);
            if (!res.err) {
                setIsChange(true);
                setError(false);
                setExistUser(true);
            } else {
                window.alert("No se ha podido realizar el tramite");
                setError(res.err);
                setExistUser(false);
                setIsChange(false);
            }
            setValidated(false);
            setLoading(false);
        });
    }

    function handleFindUser() {
        if (emailValidation()) {
            setValidated(true);
            findUser();
        } else {
            setValidated(true);
        }
    }

    function handleChangePassword() {
        if (emailValidation() && phoneValidation()) {
            setValidated(true);
            changePassword()
        } else {
            setValidated(true);
        }
    }

    function handleOk() {
        history.push("/login");
        setIsChange(false);
    }

    return (
        <Form noValidate validated={validated}>
            {error &&
            <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545"/>
            }
            <Form.Group className="mb-3 form-col-form-group" size="lg" controlId="validationEmail">
                <Form.Label className='form-col-label'>Correo Electronico:</Form.Label>
                <Form.Control
                    className="form-col-input"
                    type="email"
                    name="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value.trim())}
                    isValid={emailValidation()}
                />
                {
                    existUser ? null : (
                        <Form.Text className="text-muted">
                            Utilice un correo registrado en el sistema.
                        </Form.Text>
                    )
                }
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese un correo electronico valido.
                </Form.Control.Feedback>
            </Form.Group>
            {
                !existUser ? null : (
                    <Form.Group className="mb-3 form-col-form-group" size="lg" controlId="validationPhone">
                        <Form.Label className='form-col-label'>Número de teléfono:</Form.Label>
                        <Form.Control
                            name='phone'
                            onChange={(e) => {
                                setPhoneNumber(e.target.value.trim())
                            }}
                            value={phoneNumber}
                            type="text"
                            required
                            placeholder={`${profile.phone.substr(0, 2)}####${profile.phone.slice(-2)}`}
                            isValid={phoneNumber === profile.phone}
                            isInvalid={!phoneValidation()}
                        />
                        <Form.Text className="text-muted">
                            Ingrese el número de teléfono asociado a la cuenta.
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            El teléfono registrado no coincide.
                        </Form.Control.Feedback>
                    </Form.Group>
                )
            }
            <div style={{textAlign: "center", margin: "10%"}}>
                {existUser ? (
                    <Button
                        className='submit-button'
                        variant="success"
                        onClick={handleChangePassword}
                    >
                        Cambiar Contraseña
                        {
                            loading && <Spinner as="span" variant="dark" size="sm" role="status" aria-hidden="true" animation="border"/>
                        }
                    </Button>
                ) : (
                    <Button
                        className='submit-button'
                        variant="success"
                        disabled={loading}
                        onClick={handleFindUser}
                    >
                        Buscar Usuario
                        {
                            loading && <Spinner as="span" variant="dark" size="sm" role="status" aria-hidden="true" animation="border"/>
                        }
                    </Button>
                )
                }
            </div>
            <Modal show={isChange} onHide={handleOk}>
                <Modal.Header closeButton>
                    <Modal.Title>Exito</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Se ha cambiado la contraseña, se ha envíado un correo a {email}.
                    Recuerde que puede cambiar su contraseña desde la sección de Perfil en la opción de modificar.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={handleOk}>Listo</Button>
                </Modal.Footer>
            </Modal>
        </Form>
    )
}

export default ResetPasswordForm;