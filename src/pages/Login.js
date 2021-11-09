import useAuthentication from "../authentication/useAuthentication";
import {useHistory, useLocation} from "react-router-dom";
import {Col, Image, Row} from "react-bootstrap";
import "./Login.css"
import logo from '../assets/sinac.png';
import LoginForm from "../components/authentication/LoginForm";

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    const authentication = useAuthentication();

    return (
        <div className="login-section">
            <div className="login-panel">
                <Row className="row">
                    <Col className="logo-col">
                        <Image className="logo-col-icon" src={logo}/>
                    </Col>
                    <Col className="form-col">
                        <h3 className="form-col-title">Iniciar Sesión</h3>
                        <LoginForm history={history} location={location} authentication={authentication}/>
                    </Col>
                </Row>
            </div>
        </div>
    );

}

export default Login;