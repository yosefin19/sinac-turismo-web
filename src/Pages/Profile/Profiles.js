
import Table, {  AvatarCell, UpdateButton } from '../../components/Table/Table';
import React,{ Component} from 'react'
import NavBar from "../../components/NavBar";


export default class Users extends Component {

  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }
  async getData () {
    fetch('http://40.76.245.64:8000/profiles')
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
  const columns = [    
    {
      Header: "",
      accessor: 'profile_photo_path',
      Cell:AvatarCell,
    },
    {
      Header: "Identificador",
      accessor: 'id',
    },
    {
      Header: "Nombre",
      accessor: 'name',
    },
    {
      Header: "Correo",
      accessor: 'email',
    },
    {
      Header: "Portada",
      accessor: 'cover_photo_path',
    },
    {
      Header: "Usuario asociado",
      accessor: 'user_id',
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
        
        <Table name = "Administrar Perfiles"  columns={columns} data={this.state.users} dir = 'profile'/>

        </div>
      </div>
  )
      }}
