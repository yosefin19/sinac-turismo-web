import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "../../assets/Form.css";


function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


function Form() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [admin, setAdmin] = useState("");

  const dirUpdateButton = '/profiles'
  const urlApi = 'http://127.0.0.1:8000/add-profile' 
  const history = useHistory();
  
  useEffect(
    () => {
      if (!email) {
        setEmailError("");
      } else {
        if (validateEmail(email)) {
          setEmailError("");
        } else {
          setEmailError("Ingrese un correo valido.");
        }
      }
    },
    [email]
  );


  const Agregar = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email:email, password: password })
    };
      fetch(urlApi, requestOptions)
      .then(response => response.json())


    history.push({
      pathname: dirUpdateButton,
     })
     window.history.go()
  }
  return (


    <div>
      
      <form>
        <h3>Ingrese la informacion</h3>


        <h1 className='text'>Nombre:</h1>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          placeholder = 'Nombre'
        />
         <hr  className="line"/>

        <h1 className='text'>Correo:</h1>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder ='Correo'
        />
         <hr  className="line"/>
        <div className="error">{emailError}</div>


        <h1 className='text'>Telefono:</h1>
        <input
          value={phone}
          onChange={e => setPhone(e.target.value)}
          type="text"
          placeholder= 'Telefono'
        />
         <hr  className="line"/>

         <h1 className='text'>Usuario Administrador:</h1>
        <input
          className = 'switch'
          value={admin}
          onChange={e => setAdmin(e.target.value)}
          type="checkbox"
          placeholder= 'Admin'
        />       
       
       
        <button onClick={Agregar} type="submit">Agregar</button>
      </form>
    </div>
  );
}



export default Form;
