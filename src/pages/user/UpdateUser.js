import React from 'react';
import {useParams} from 'react-router-dom';
import NavBar from "../../components/NavBar";
import {Col, Row} from "react-bootstrap";
import UpdateUserForm from "../../components/users/UpdateUserForm";

function UpdateUser() {

    let {id} = useParams()

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
                            <UpdateUserForm id={id}/>
                        </Row>
                        <hr/>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default UpdateUser;