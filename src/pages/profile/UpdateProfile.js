import React from 'react';
import {useParams} from 'react-router-dom';
import NavBar from "../../components/NavBar";
import {Col, Row} from "react-bootstrap";
import UpdateProfileForm from "../../components/profiles/UpdateProfileForm";


function UpdateProfile() {
    let {id} = useParams()

    return (
        <div>
            <NavBar/>
            <div className="section">
                <div className='panel'>
                    <div className="menu-options">
                        <Row>
                            <Col className='row'><h3 className="title">Administrar Perfiles</h3></Col>
                        </Row>
                        <hr/>
                        <Row>
                            <UpdateProfileForm id={id}/>
                        </Row>
                        <hr/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfile;
