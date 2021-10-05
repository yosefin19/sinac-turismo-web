import React from 'react';
import {useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import Form from '../../components/Form/FormUpdateProfile'
import '../../assets/Card.css'

function UpdateProfile() {
  let {id} = useParams()
  const id = useLocation().state.id;

  const apiUrl = `http://127.0.0.1:8000/profiles/`+id;
  
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