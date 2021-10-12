import React from 'react';
import NavBar from "../../components/NavBar";
import Form from '../../components/Form/FormAddUser'
import '../../assets/cuadro.css'
 
function AddUser() {
  
  return (
    <div>
    <NavBar/>
    <div className='panel'>
      <div className='header'>
       
      <h1 className='header-text'>Administrar Usuarios</h1>
      <hr  />
     </div>

<div className='body'>

      <Form />

</div>
</div>
</div>
  );
}

export default AddUser;