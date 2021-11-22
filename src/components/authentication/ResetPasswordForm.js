import {Button, Form, Modal, Spinner} from "react-bootstrap";
import {useState} from "react";
import {helpApi} from "../../helper/helpApi";
import {API_URL} from "../../config";
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

    /**
     * Valida que el correo electronico sea valido mediante una expresión regular.
     * @returns {boolean} true si es valido, false en otro caso
     */
    const emailValidation = () => {
        let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(email) && email.length > 4;
    }

    const phoneValidation = () => {
        return phoneNumber !== "" && phoneNumber === profile.phone
    }

    /**
     * Función que consulta a la API, si existe un usuario con un correo electronico en especifico.
     * en caso que existe, establece los datos del usuario para validar, o sino muestra un mensaje
     * de error.
     */
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
            if (!res.err) {
                setProfile(res)
                setError(false)
                setExistUser(true)
            } else {
                setError(res.err)
                setExistUser(false)
            }
            setLoading(false)
            setValidated(false)
        });
    }

    /**
     * Función para solicitar a la API en la generación de una nueva contraseña y se envíe un correo
     * electrónico al usuario, o bien muestre un mensaje de error.
     */
    function changePassword() {
        setLoading(true);
        let endPoint = `${API_URL}reset-password`;
        let options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: {
                email: email,
                password: "",
            },
        }
        api.post(endPoint, options).then((res) => {
            if (!res.err) {
                setIsChange(true);
                setError(false);
                setExistUser(true);
            } else {
                setError(res.err);
                setExistUser(false);
                setIsChange(false);
            }
            setValidated(false);
            setLoading(false);
        });
    }

    /**
     * Valida que el correo sea valido para poder buscar al usuario.
     */
    function handleFindUser() {
        if (emailValidation()) {
            setValidated(true);
            findUser();
        } else {
            setValidated(true);
        }
    }

    /**
     * Valida que el correo y teléfono coincidan y sean validos,
     * para proceder con el cambio de contraseña.
     */
    function handleChangePassword() {
        if (emailValidation() && phoneValidation()) {
            setValidated(true);
            changePassword()
        } else {
            setValidated(true);
        }
    }

    /**
     * Redirecciona a la página de inciar sesión en caso que se haya completado
     * con exito el cambio de contraseña
     */
    function handleOk() {
        history.push("/login");
        setIsChange(false);
    }

    return (
        <Form noValidate validated={validated}>
            <Form.Group className="mb-3 form-col-form-group" size="lg" controlId="validationEmail">
                <Form.Label className='form-col-label'>Correo Electronico:</Form.Label>
                <Form.Control
                    className="form-col-input"
                    type="email"
                    name="email"
                    value={email}
                    required
                    onChange={(e) => {
                        setEmail(e.target.value.trim());
                        setExistUser(false);
                        setProfile(null);
                        setPhoneNumber("")
                    }}
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
                            loading && <Spinner as="span" variant="dark" size="sm" role="status" aria-hidden="true"
                                                animation="border"/>
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
                            loading && <Spinner as="span" variant="dark" size="sm" role="status" aria-hidden="true"
                                                animation="border"/>
                        }
                    </Button>
                )
                }
            </div>
            <Modal show={error} onHide={() => {
                setError(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {existUser ?
                            "No se pudo realizar el cambio de contraseña"
                            :
                            "No se a encontrado un usuario"
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {existUser ?
                        "No ha sido posible restablecer la contraseña, ha ocurrido un error mientras se generaba."
                        :
                        "El correo indicado  no corresponde con ningun usuario: " + email}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={() => {
                        setError(false)
                    }}>Reintentar</Button>
                </Modal.Footer>
            </Modal>
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