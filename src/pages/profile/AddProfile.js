import React from 'react';
import NavBar from "../../components/NavBar";
import {Col, Row} from "react-bootstrap";
import AddProfileForm from "../../components/profiles/AddProfileForm";


function AddUser() {

    return (
        <div>
            <NavBar/>
            <div className="section">
                <div className='panel'>
                    <div className="menu-options">
                        <Row>
                            <Col className='row'><h3 className="title">Administrar Usuarios</h3></Col>
                        </Row>
                        <hr/>
                        <Row>
                            <AddProfileForm/>
                        </Row>
                        <hr/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddUser;