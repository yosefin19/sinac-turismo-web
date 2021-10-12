import React from 'react';
import '../../assets/cuadro.css';
import { useParams } from 'react-router-dom';
import Form from '../../components/Form/FormUpdateUser'
import {useState, useEffect} from "react";
import NavBar from "../../components/NavBar";
import {API_URL} from "../../config";
  
function UpdateUser() {

let {id} = useParams()

const apiUrl = `${API_URL}users/`+id;

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
  <div className='header'>
       
      <h1 className='header-text'>Administrar Usuarios</h1>
      <hr/>
    </div>

    <div className='body'>

     <Form data = {user} id = {id} /> 

    </div>
   </div>

    </div>


  );


}

export default UpdateUser;