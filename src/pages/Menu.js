import {Card, Col, Figure, Row} from "react-bootstrap";

import {FaHiking, FaUserAlt, FaUserCircle} from 'react-icons/fa'
import {GiMountainRoad} from 'react-icons/gi'

import "./Menu.css"
import NavBar from "../components/NavBar";
import {Link} from "react-router-dom";
import {helpApi} from "../helper/helpApi";
import {API_URL} from "../config";
import {useEffect, useState} from "react";

const Menu = () => {
    const api = helpApi();
    const credentials = JSON.parse(localStorage.getItem("credentials"));
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        let endPoint = `${API_URL}profile`;
        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + credentials.token,
            },
        }
        api.get(endPoint, options).then(response => {
            if(!response.err) setProfile(response);
        });
    }, []);


    return (
        <div>
            <NavBar/>
            <div className="section">
                <div className='panel'>
                    <h3 className="title">Hola, {profile && profile.name}</h3>
                    <div className="menu-options">
                        <Row className="row">
                            <Col className="col">
                                <Link to='/conservation-area'>
                                    <Card className='element text-center' to="/conservation-area">
                                        <Figure className="figure">
                                            <GiMountainRoad className='icon'/>
                                            <Figure.Caption className='caption'>
                                                Administrar Áreas de Conservación
                                            </Figure.Caption>
                                        </Figure>
                                    </Card>
                                </Link>

                            </Col>
                            <Col className="col">
                                <Link to='/tourist-destination'>
                                    <Card className='element text-center'>
                                        <Figure className="figure">
                                            <FaHiking className='icon'/>
                                            <Figure.Caption className='caption'>
                                                Administrar Destinos Turísticos
                                            </Figure.Caption>
                                        </Figure>
                                    </Card>
                                </Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Link to="/users">
                                    <Card className='element text-center'>
                                        <Figure className="figure">
                                            <FaUserAlt className='icon'/>
                                            <Figure.Caption className='caption'>
                                                Administrar Usuarios
                                            </Figure.Caption>
                                        </Figure>
                                    </Card>
                                </Link>
                            </Col>
                            <Col>
                                <Link to="/profiles">
                                    <Card className='element text-center'>
                                        <Figure className="figure">
                                            <FaUserCircle className='icon'/>
                                            <Figure.Caption className='caption'>
                                                Administrar Perfiles
                                            </Figure.Caption>
                                        </Figure>
                                    </Card>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;