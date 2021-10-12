import '../../assets/cuadro.css';
import CustonTable, {   UpdateButton } from '../../components/Table/CustonTable';

import NavBar from "../../components/NavBar";
import React,{ Component} from 'react'
import {API_URL} from "../../config";

export default class Users extends Component {

  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }
  async getData () {
    fetch(`${API_URL}users`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ users: data })
    })
    .catch(console.log)
  }

componentDidMount(){
  this.getData()
}



render(){

  const columns =  [    
    {
      Header: "Identificador",
      accessor: "id",
    },
    {
      Header: "Correo",
      accessor: "email",
    },
    {
      Header: "Contrasena",
      accessor: "password",
    },
    {
      Header: "Administrador",
      accessor: 'admin',
    },
    {
      Header: "Editar",
      Cell: UpdateButton,
    }
  ]


  return (
    <div>
      <NavBar/>
    <div className='panel'>
        <CustonTable name = "Administrar Usuarios" columns={columns} data={this.state.users} dir = 'user'/>
        </div>
        </div>
  )

    }
      }



