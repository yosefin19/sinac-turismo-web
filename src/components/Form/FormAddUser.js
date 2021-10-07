import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "../../assets/Form.css";
import Switch from "../Switch/Switch";


function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


function usePasswordValidator(config = { min: 6, max: 15 }) {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(
    () => {
      setPasswordError("");
      if (!password) return;

      if (password.length < config.min) {
        setPasswordError(`La contrasena debe tener al menos ${config.min} caracteres.`);
      } else if (password.length > config.max) {
        setPasswordError(
          ` La contrasena debe tener maximo ${config.max} caracteres.`
        );
      }
    },
    [password]
  );

  return [password, setPassword, passwordError];
}



function Form() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [admin, setAdmin] = useState(false);
  
  const dirUpdateButton = '/users'
  const urlApi = 'http://127.0.0.1:8000/add-user' 
  let history = useHistory();
  const [password, setPassword, passwordError] = usePasswordValidator({
    min: 8,
    max: 15
  });
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

  useEffect(
    () => {
      if (!confirmPassword || !password) {
        setConfirmPasswordError("");
      } else {
        if (password !== confirmPassword) {
          setConfirmPasswordError("La contrasena debe coincidir");
        } else {
          setConfirmPasswordError("");
        }
      }
    },
    [password, confirmPassword]
  );

  const Agregar = () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email:email, password: password, admin:admin})
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
        <h1 className='text'>Correo:</h1>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder = 'Correo'
        />
         <hr  className="line"/>
        <div className="error">{emailError}</div>


        <h1 className='text'>Contrasena:</h1>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder= 'Contrasena'
        />
         <hr  className="line"/>
        <div className="error">{passwordError}</div>

        <h1 className='text'>Confirmar Contrasena:</h1>
        <input
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          type="password"
          placeholder='Confirmar contrasena'
        />
         <hr  className="line"/>
        
        <div className="error">{confirmPasswordError}</div>

      <Switch
        isTrue={admin}
        handleToggle={() => setAdmin(!admin)}
      />

        <button onClick={Agregar} type="submit" >Agregar</button>
      </form>
    </div>
  );
}



export default Form;
