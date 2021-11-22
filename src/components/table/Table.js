import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Col, Row, Spinner} from "react-bootstrap";
import MySearch from "./MySearch";
import {MdAddCircle} from "react-icons/md";
import Message from "../Message";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

const Table = ({error, loading, data, columns, title, componentName}) => {
    return (
        <ToolkitProvider
            search
        >
            {
                props => (
                    <div className='panel'>
                        <Row>
                            <Col sm={6}><h3 className="title">{title}</h3></Col>
                            <Col sm={3}>
                                <MySearch
                                    {...props.searchProps}
                                    placeholder="Buscar"
                                />
                            </Col>
                            <Col sm={3}>
                                <Link to={'/' + componentName + '/add'}>
                                    <Button className='confirm-button'
                                            variant="success">
                                        <MdAddCircle/> Agregar Nuevo</Button>
                                </Link>
                            </Col>
                        </Row>
                        <hr className="hr"/>
                        <div className="menu-options">
                            {error && (
                                <Message
                                    msg={`Error ${error.status}: ${error.statusText}`}
                                    bgColor="#dc3545"
                                />
                            )}
                            {/**loading ? <Spinner style={{marginLeft:'45%'}} as="span" variant="dark" size="100" role="status" aria-hidden="true" animation="border"/>
                             :
                             dataBase && (
                             <TableCA
                             data={dataBase}
                             />
                             )
                             **/}
                            {loading ? <Spinner style={{marginLeft: '45%'}} as="span" variant="dark" size="100"
                                                role="status" aria-hidden="true" animation="border"/>
                                :
                                data && (
                                    <BootstrapTable
                                        {...props.baseProps}
                                        keyField='id'
                                        data={data}
                                        columns={columns}
                                        bootstrap4
                                        rowStyle={{
                                            display: 'flow list-item block',
                                            textAlign: 'center',
                                            whiteSpace: "nowrap",
                                            textOverflow: 'clip',
                                            overflow: "hidden"
                                        }}
                                        striped
                                        hover
                                        pagination={paginationFactory({sizePerPage: 6})}
                                        wrapperClasses="table-responsive-lg"
                                    />
                                )
                            }
                        </div>
                    </div>
                )
            }
        </ToolkitProvider>
    );
}

export default Table;