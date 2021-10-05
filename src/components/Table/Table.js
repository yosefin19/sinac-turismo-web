import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table'
import { MdOpenInNew } from "react-icons/md";
import { PageButton, Button } from '../Button/Button'
import '../../assets/Table.css'

var dirUpdateButton = '/';
// Filtro para busqueda para cualquier columna de la tabla
function GlobalFilter({ globalFilter, setGlobalFilter,}) {
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
      <input
        type="text"
        className = 'search'
        value={value }
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Buscar`}
      />
  )
}

//Acomoda la foto
export function AvatarCell({ column, row }) {
  return (
      <img className="avatar" src={row.original[column.img]} alt="" />
    
  )
}

//Agrega el boton para actualizar
export function UpdateButton({column, row}){
  const id = row.original.id ;
return(
<Link to={dirUpdateButton+id}>
<MdOpenInNew style={{color:"#769f5e", fontSize: 22}}/>
</Link>
)
}

function Table({ name, columns, data, dir }) {

  dirUpdateButton = '/update-'+ dir +'/' ;
  const add = '/add-' + dir;

  let history = useHistory();
  //Clickear boton agregar elementos
  const handleClick = () => {

    history.push({
     pathname: add
    })
      


  }


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, 
    canPreviousPage,
    canNextPage,
    nextPage, 
    previousPage,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable({
    columns,    data,
  },
    useFilters,     useGlobalFilter,    usePagination,  
  
  )


  return (
    <>
  <section >
    <h1 >{name} </h1>

    <Button 
        onClick={handleClick} type="button" >
      Agregar
      </Button>


        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        
</section>

<hr  className="line" />
      {/* Table */}
      
             <table {...getTableProps()} className="line" >
                 
                 {/*HEADER DE TBALA*/}
                 
                 {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="header-table">
                      {headerGroup.headers.map(column => (
                        <th
                          scope="col"
                          
                          {...column.getHeaderProps(column)}
                        >
                            {column.render('Header')}
                            
                        </th>
                      ))}
                    </tr>
                  ))}

                
                  {/*VALORES TBALA*/}
                <tbody {...getTableBodyProps()}  className="column">
                  

                  {page.map((row, i) => {  
                    prepareRow(row)
                    return (
                      <tr {...row.getRowProps()} >
                        {row.cells.map(cell => {
                          return (
                            
                            <td {...cell.getCellProps()}>
                           

                                 <div className="text-table">{cell.render('Cell')}</div>

                            </td>
                            
                          )

                        })}
          
                      </tr> 
                      
                    )
                  })} 
                 
                </tbody>
               
              </table>
        
              <hr  className="line" />
      {/* Pagination */}  

          <nav className="pagination" >
              <PageButton 
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span >Anterior</span>
              </PageButton>

              <PageButton
                onClick={() => nextPage()}
                disabled={!canNextPage
                }>
                <span className='button' >Siguiente</span>
              </PageButton>

            </nav>


    </>
  )
}

export default Table;