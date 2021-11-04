import React, {useEffect, useState} from "react";
import NavBar from "../../components/NavBar";
import {Button, Col, Row} from "react-bootstrap";

import {MdAddCircle} from "react-icons/md"
import "./TouristDestination.css"
import {helpApi} from "../../helper/helpApi";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {Link} from "react-router-dom";
import TableTD from "../../components/tourist-destination/TableTD";

import {API_URL, DESTINATIONS_URL} from "../../config";

const TouristDestination = () => {

    const [dataBase, setDataBase] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let url = `${API_URL}${DESTINATIONS_URL}`

    useEffect(() => {
        setLoading(true);
        helpApi()
            .get(url)
            .then((res) => {
                //console.log(res);
                if (!res.err) {
                    setDataBase(res);
                    setError(null);
                } else {
                    setDataBase(null);
                    setError(res);
                }
                setLoading(false);
            });
    }, [url]);

    return (
        <div>
            <NavBar/>
            <div className="section">
                <div className='panel'>
                    <Row>
                        <Col sm={9}><h3 className="title">Administrar Destinos Turísticos</h3></Col>
                        <Col sm={3}>
                            <Link to='/tourist-destination/add'>
                                <Button className='confirm-button' variant="success">
                                    <MdAddCircle/> Agregar Nuevo
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                    <hr className="hr"/>
                    <div className="menu-options">
                        {loading && <Loader/>}
                        {error && (
                            <Message
                                msg={`Error ${error.status}: ${error.statusText}`}
                                bgColor="#dc3545"
                            />
                        )}
                        {dataBase && (
                            <TableTD
                                data={dataBase}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TouristDestination;
