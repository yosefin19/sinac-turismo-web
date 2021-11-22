import NavBar from "../../components/NavBar";
import React, {useEffect, useState} from 'react'
import {API_URL} from "../../config";
import {Link} from "react-router-dom";
import {IoOpenOutline} from "react-icons/all";
import Table from "../../components/table/Table";

const Users = () => {

    const [users, setUsers] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let endPoint = `${API_URL}users`
        const credentials = JSON.parse(localStorage.getItem("credentials"));
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + credentials.token
            }
        }
        setLoading(true);
        fetch(endPoint, options)
            .then(res => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, []);


    const columns = [
        {
            dataField: "id",
            text: "Identificador",
            sort: true,
            headerStyle: () => {
                return {width: '20%', textAlign: 'center', marginLeft: 1, marginRight: 1};
            }
        },
        {
            dataField: "email",
            text: 'Correo',
            sort: true,
            style: {textOverflow: "ellipsis", overflow: "hidden", maxWidth: '150%'},
            headerStyle: () => {
                return {width: '30%', textAlign: 'center', marginLeft: 1, marginRight: 1};
            }
        },
        {
            dataField: "password",
            text: 'Contraseña',
            sort: true,
            style: {textOverflow: "ellipsis", overflow: "hidden", maxWidth: '150%'},
            headerStyle: () => {
                return {width: '30%', textAlign: 'center', marginLeft: 1, marginRight: 1};
            }
        },
        {
            dataField: "admin",
            text: 'Administrador',
            sort: true,
            style: {textOverflow: "ellipsis", overflow: "hidden", maxWidth: '150%'},
            headerStyle: () => {
                return {width: '20%', textAlign: 'center', marginLeft: 1, marginRight: 1};
            }
        },
        {
            text: "Editar",
            formatter: (value, row) => {
                return (
                    <Link to={`/user/${row.id}`}>
                        <IoOpenOutline style={{color: "#769f5e", fontSize: 22}}/>
                    </Link>
                );
            },
            headerStyle: () => {
                return {width: '8%', textAlign: 'center'};
            }
        }
    ]

    return (
        <div>
            <NavBar/>
            <div className='section'>
                <Table
                    error={error}
                    loading={loading}
                    data={users}
                    columns={columns}
                    title={"Administrar Usuarios"}
                    componentName={"user"}
                />
            </div>
        </div>
    )
}

export default Users;



