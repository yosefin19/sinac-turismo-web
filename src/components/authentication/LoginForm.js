import {Button, Form, Modal, Spinner} from "react-bootstrap";
import "../../pages/Login.css"
import {Link} from "react-router-dom";
import {useState} from "react";

const LoginForm = ({history, location, authentication}) => {

    const previewsObjectURL = location.state?.from;
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [unauthorized, setUnauthorized] = useState(false);

    /**
     * Verifica si un correo coincide con la expresión regular
     * @param email
     */
    const emailValidation = (email) => {
        let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(email);
    }

    /**
     * Verifica que una contraseña tenga un largo dentro de 8 y 32 caracteres,
     * mayusculas, minusculas y números.
     * @param password
     */
    const passwordValidation = (password) => {
        const re = {
            'capital': /[A-Z]/,
            'digit': /[0-9]/,
            'full': /^[A-Za-z0-9]{7,32}$/
        };
        return password.length > 7 && password.length < 32 &&
            re.capital.test(password) && re.digit.test(password) && re.full.test(password);
    }

    /**
     * Función para validar que las credenciales de inicio de sesión sean validas
     * y tengan los permisos necesarios.
     */
    function handleValidated() {
        if (emailValidation(email) && passwordValidation(password)) {
            setValidated(true);
            setLoading(true);
            authentication.login(email, password);
            if (authentication.logged()) {
                history.push(previewsObjectURL || "/menu");
                setUnauthorized(false);
            } else {
                setUnauthorized(true);
                authentication.logout()
            }
            setLoading(false);
        } else {
            setValidated(true);
        }
    }

    /**
     * Activa y desactiva la opción para visualizar la contraseña
     */
    const handleHidePassword = () => {
        setHidePassword(!hidePassword)
    }

    return(
        <Form noValidate validated={validated}>
            <Form.Group className="mb-3 form-col-form-group" size="lg" controlId="validationEmail">
                <Form.Label className='form-col-label'>Correo Electronico:</Form.Label>
                <Form.Control
                    className="form-col-input"
                    name="email"
                    type="email"
                    onChange={(e) => {
                        setEmail(e.target.value.trim())
                    }}
                    value={email}
                    isValid={emailValidation(email)}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    El correo electrónico es invalido.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 form-col-form-group"  size="lg" controlId="formPassword">
                <Form.Label className='form-col-label'>Contraseña:</Form.Label>
                <Form.Control
                    className="form-col-input"
                    name="current-password"
                    type={!hidePassword ? "password" : "text"}
                    value={password}
                    autoCapitalize="none"
                    onChange={(e) => {
                        setPassword(e.target.value.trim())
                    }}
                    isInvalid={password ? !passwordValidation(password) : false}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Debe contener: mayusculas, minusculas y números
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 form-col-form-group"  size="lg" id="formGridCheckbox">
                <Form.Check
                    type="checkbox"
                    label="Mostrar contraseña"
                    value={hidePassword}
                    onChange={handleHidePassword}
                />
            </Form.Group>
            <Form.Group className="mb-3 form-col-form-group"  size="lg" id="formGridCheckbox">
                <Link className={"link-text text-center"} to="/reset-password">¿Olvidó su contraseña?</Link>
            </Form.Group>
            <div style={{textAlign: "center", margin: "10%"}}>
                <Button className='submit-button' variant="success" onClick={handleValidated}>
                    Ingresar
                    {
                        loading && <Spinner as="span" variant="dark" size="sm" role="status" aria-hidden="true" animation="border"/>
                    }
                </Button>
            </div>
            <Modal show={unauthorized} onHide={() => {setUnauthorized(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    El correo y constraseña ingresados son incorrectos o no tiene los permisos necesarios para acceder.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={() => {setUnauthorized(false)}}>Cerrar </Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
}

export default LoginForm;