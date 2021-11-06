import {Button, Form} from "react-bootstrap";
import "../../pages/Login.css"
import {Link} from "react-router-dom";

const LoginForm = ({validated}) => {
    return(
        <Form noValidate validated={validated}>
            <Form.Group className="mb-3 form-col-form-group" size="lg" controlId="formEmail">
                <Form.Label className='form-col-label'>Correo Electronico:</Form.Label>
                <Form.Control  className="form-col-input" type="email"/>
            </Form.Group>

            <Form.Group className="mb-3 form-col-form-group"  size="lg" controlId="formPassword">
                <Form.Label className='form-col-label'>Contraseña:</Form.Label>
                <Form.Control className="form-col-input" type="password"/>
                <Link className={"link-text"} to="/reset-password">¿Olvidó su contraseña?</Link>
            </Form.Group>
            <div style={{textAlign: "center", margin: "10%"}}>
                <Button className='submit-button' variant="success">Ingresar</Button>
            </div>
        </Form>
    );
}

export default LoginForm;