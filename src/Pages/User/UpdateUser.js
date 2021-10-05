import React from 'react';
import { useParams } from 'react-router-dom';
import Form from '../../components/Form/FormUpdateUser'
import '../../assets/Card.css'
import {useState, useEffect} from "react";

  
function UpdateUser() {

let {id} = useParams()

const apiUrl = `http://127.0.0.1:8000/users/`+id;

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
  <section className='card'>

  <div className='header'>
       
      <h1 className='header-text'>Administrar Usuarios</h1>
      <hr/>
    </div>

    <div className='body'>

     <Form data = {user} id = {id} /> 

    </div>

  </section>
  );


}

export default UpdateUser;