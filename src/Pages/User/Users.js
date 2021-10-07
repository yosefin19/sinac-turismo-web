import '../../assets/Card.css';
import Table, {   UpdateButton } from '../../components/Table/Table';
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
    fetch('http://127.0.0.1:8000/users')
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
    
    <section className='card'>

    <main className="main">
    
    <Table name = "Administrar Usuarios"  columns={columns} data={this.state.users} dir = 'user'/>
 
   </main>

      </section>
  )

    }
      }



