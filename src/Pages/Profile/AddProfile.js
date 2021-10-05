import React from 'react';
import { useLocation } from 'react-router-dom';
import Form from '../../components/Form/FormAddProfile'
import '../../assets/Card.css'
  
function AddUser() {
  
  return (
  <section className='card'>
  <div className='header'>
      <h1 className='header-text'>Administrar Usuarios</h1>
      <hr  />
 </div>
<div className='body'>
      <Form/>

</div>

    </section>
  );
}

export default AddUser;