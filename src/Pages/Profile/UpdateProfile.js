import React from 'react';
import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import Form from '../../components/Form/FormUpdateProfile'


function UpdateProfile() {
  let {id} = useParams()

  const apiUrl = `http://40.76.245.64:8000/profiles/`+id;
  
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
      <h1 className='header-text'>Administrar Perfiles</h1>
      <hr  />
 </div>
<div className='body'>
      <Form data={user} id ={id}/>

</div>

    </section>
  );
}

export default UpdateProfile;
