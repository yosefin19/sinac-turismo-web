import NavBar from "../NavBar";
import {Col, Row} from "react-bootstrap";
import React from "react";
import "./ConservationAreaSection.css"
import AddFormCA from "./AddFormCA";

const AddConservationArea = () => {
    return(
        <div>
            <NavBar/>
            <div className="section">
                <div className='panel'>
                    <div className="menu-options">
                        <Row>
                            <Col className='row'><h3 className="title">Administrar Áreas de Conservación</h3></Col>
                        </Row>
                        <hr/>
                        <Row>
                            <AddFormCA/>
                        </Row>
                        <hr/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddConservationArea;