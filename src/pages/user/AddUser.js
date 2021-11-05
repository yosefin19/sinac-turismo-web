import React from 'react';
import NavBar from "../../components/NavBar";
import Form from '../../components/form/FormAddUser'
import '../../assets/cuadro.css'

function AddUser() {

    return (
        <div>
            <NavBar/>
            <div className='panel'>
                <div className='header-cuadro'>
                    <h1 className='header-text-cuadro'>Administrar Usuarios</h1>
                    <hr/>
                </div>
                <div className='body-cuadro'>
                    <Form/>
                </div>
            </div>
        </div>
    );
}

export default AddUser;