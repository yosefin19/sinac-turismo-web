import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "../../assets/Form.css";

const urlApi = 'http://127.0.0.1:8000/' 

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function Form(props) {
  const pdata = props.data;
  const idUser = props.id;
  const [name, setName] = useState(pdata[0].name);
  const [email, setEmail] = useState(pdata[0].email);
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState(pdata[0].phone);
  const [admin, setAdmin] = useState(pdata[0].admin);
  
  const dirUpdateButton = '/profiles'
  
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
  const Actualizar = () => {

    const url =  'http://127.0.0.1:8000/update-profile/'+idUser;

    const requestOptions = {
     method: 'POST',
     body: JSON.stringify({email:email, name:name, phone:phone, admin:admin })
   };
     fetch(url, requestOptions)
     .then(response => response.json())
     
    history.push({
     pathname: dirUpdateButton,
    })
    window.history.go()
  }

  const Eliminar = () => {
    const url = 'http://127.0.0.1:8000/delete-profile/' + idUser ;

    fetch(url, { method: 'DELETE' }).then(response => response.json())
      
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
          placeholder = {pdata[0].name}
        />
         <hr  className="line"/>

        <h1 className='text'>Correo:</h1>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder = {pdata[0].email}
        />
         <hr  className="line"/>
        <div className="error">{emailError}</div>


        <h1 className='text'>Telefono:</h1>
        <input
          value={phone}
          onChange={e => setPhone(e.target.value)}
          type="text"
          placeholder= {pdata[0].phone}
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
         


         <button onClick={Actualizar} type="submit">Actualizar</button>

        <button  onClick={Eliminar} type="submit">Eliminar</button>

       
       
    
      </form>
    </div>
  );
}



export default Form;
