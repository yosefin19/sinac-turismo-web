
import '../../assets/Card.css';
import Table, {  AvatarCell, UpdateButton } from '../../components/Table/Table';
import "../../assets/Table.css"
import React,{ Component} from 'react'


export default class Users extends Component {

  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }
  async getData () {
    fetch('http://127.0.0.1:8000/profiles')
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
    
    <section className='card'>

      
    <main className="main">
        
        <Table name = "Administrar Perfiles"  columns={columns} data={this.state.users} dir = 'profile'/>
      
     </main>

     </section>

  )
      }}
