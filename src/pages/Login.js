import useAuthentication from "../authentication/useAuthentication";
import {useHistory, useLocation} from "react-router-dom";
import {useState} from "react";
import {Col, Image, Row} from "react-bootstrap";
import "./Login.css"
import logo from '../assets/sinac.png';
import LoginForm from "../components/authentication/LoginForm";

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    const previewsObjectURL = location.state?.from;
    const authentication = useAuthentication();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleLogin = () => {
        authentication.login(email, password);
        history.push(previewsObjectURL || "/menu")
    }

    return (
        <div className="login-section">
            <div className="login-panel">
                <Row className="row">
                    <Col className="logo-col">
                        <Image className="logo-col-icon" src={logo}/>
                    </Col>
                    <Col className="form-col">
                        <h3 className="form-col-title">Iniciar Sesión</h3>
                        <LoginForm validated={validated}/>
                    </Col>
                </Row>
            </div>
        </div>
    );

}

export default Login;