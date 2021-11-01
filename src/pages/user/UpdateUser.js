import React, {useEffect, useState} from 'react';
import '../../assets/cuadro.css';
import {useParams} from 'react-router-dom';
import Form from '../../components/form/FormUpdateUser'
import NavBar from "../../components/NavBar";
import {API_URL} from "../../config";

function UpdateUser() {

    let {id} = useParams()

    const apiUrl = `${API_URL}users/` + id;

    const [user, setItems] = useState([]);

    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                },
            )
    }, [])


    return (
        <div>
            <NavBar/>
            <div className='panel'>
                <div className='header-cuadro'>

                    <h1 className='header-text-cuadro'>Administrar Usuarios</h1>
                    <hr/>
                </div>

                <div className='body-cuadro'>

                    <Form data={user} id={id}/>

                </div>
            </div>

        </div>


    );


}

export default UpdateUser;