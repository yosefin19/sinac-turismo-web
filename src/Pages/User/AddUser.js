import React from 'react';

import Form from '../../components/Form/FormAddUser'
import '../../assets/Card.css'
 
function AddUser() {
  
  return (
  <section className='card'>

      <div className='header'>
       
      <h1 className='header-text'>Administrar Usuarios</h1>
      <hr  />
 </div>

<div className='body'>

      <Form />

</div>

    </section>
  );
}

export default AddUser;