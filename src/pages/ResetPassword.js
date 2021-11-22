import {Col, Row} from "react-bootstrap";
import ResetPasswordForm from "../components/authentication/ResetPasswordForm";

const ResetPassword = () => {
    return (
        <div className="login-section">
            <div className="login-panel">
                <Row className="row">
                    <Col className="form-col">
                        <h3 className="form-col-title">Cambiar Contraseña</h3>
                        <ResetPasswordForm/>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default ResetPassword;