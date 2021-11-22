import React, {useEffect, useState} from "react";
import NavBar from "../../components/NavBar";
import {Image} from "react-bootstrap";
import "./ConservationArea.css"
import {helpApi} from "../../helper/helpApi";
import {Link} from "react-router-dom";
import {API_URL, AREAS_URL, IMAGE_BASE_URL} from "../../config";
import {IoOpenOutline} from "react-icons/all";
import Table from "../../components/table/Table";

const ConservationArea = () => {

    const styles = {
        maxHeight: '50px',
        maxWidth: 'auto',
        flex: "center",
        borderRadius: "3px"
    };

    const [dataBase, setDataBase] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const columns = [
        {
            dataField: "photos_path",
            text: "Imagen",
            formatter: (value, row) => {
                let photos = value.split(",");
                return (<Image style={styles} src={`${IMAGE_BASE_URL}${photos[0]}`}/>);
            },
            headerStyle: () => {
                return {width: '10%', textAlign: 'center', marginLeft: 1, marginRight: 1};
            }
        },
        {
            dataField: "id",
            text: "Identificador",
            sort: true,
            headerStyle: () => {
                return {width: '15%', textAlign: 'center', marginLeft: 1, marginRight: 1};
            }
        },
        {
            dataField: "name",
            text: 'Nombre',
            sort: true,
            style: {textOverflow: "ellipsis", overflow: "hidden", maxWidth: '150%'},
            headerStyle: () => {
                return {width: '30%', textAlign: 'center', marginLeft: 1, marginRight: 1};
            }
        },
        {
            dataField: "description",
            text: "Descripción",
            style: {textOverflow: "ellipsis", overflow: "hidden", maxWidth: '150%'},
            headerStyle: () => {
                return {width: '30%', textAlign: 'center', marginLeft: 1, marginRight: 1};
            }
        },
        {
            text: "Editar",
            formatter: (value, row) => {
                return (
                    <Link to={`/conservation-area/${row.id}`}>
                        <IoOpenOutline style={{color: "#769f5e", fontSize: 22}}/>
                    </Link>
                );
            },
            headerStyle: () => {
                return {width: '8%', textAlign: 'center'};
            }
        }
    ]

    let url = `${API_URL}${AREAS_URL}`

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
                <Table
                    error={error}
                    loading={loading}
                    data={dataBase}
                    columns={columns}
                    title={"Administrar Áreas de Conservación"}
                    componentName={"conservation-area"}
                />
            </div>
        </div>
    );
};

export default ConservationArea;