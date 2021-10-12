import {Card, Col, Figure, Row} from "react-bootstrap";
import {FaHiking, FaUserAlt, FaUserCircle} from 'react-icons/fa'
import {GiMountainRoad} from 'react-icons/gi'

import "./Menu.css"
import NavBar from "../components/NavBar";
import {Link} from "react-router-dom";

const Menu = () => {
  return(
      <div>
          <NavBar/>
          <div className="section">
              <div className='panel'>
                      <h3 className="title">Hola, [usuario]</h3>
                      <div className="menu-options">
                          <Row className="row">
                              <Col className="col">
                                  <Link to='/conservation-area'>
                                      <Card className='card text-center' to="/conservation-area">
                                          <Figure className="figure">
                                              <GiMountainRoad  className='icon'/>
                                              <Figure.Caption className='caption'>
                                                  Administrar Áreas de Conservación
                                              </Figure.Caption>
                                          </Figure>
                                      </Card>
                                  </Link>

                              </Col>
                              <Col className="col">
                                  <Link to='/tourist-destination'>
                                      <Card className='card text-center'>
                                          <Figure className="figure">
                                              <FaHiking  className='icon'/>
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
                                      <Card className='card text-center' >
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
                                      <Card className='card text-center'>
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