import NavBar from "../NavBar";
import {Col, Row} from "react-bootstrap";
import React from "react";
import "./TouristDestinationSection.css"
import ManageFormTD from "./ManageFormTD";

const ManagerTouristDestination = () => {
    return (
        <div>
            <NavBar/>
            <div className="section">
                <div className='panel'>
                    <div className="menu-options">
                        <Row>
                            <Col className='row'><h3 className="title">Administrar Destinos Turísticos</h3></Col>
                        </Row>
                        <hr/>
                        <Row>
                            <ManageFormTD/>
                        </Row>
                        <hr/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerTouristDestination;