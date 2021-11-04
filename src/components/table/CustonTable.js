import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useAsyncDebounce, useFilters, useGlobalFilter, usePagination, useTable} from 'react-table'
import {MdOpenInNew} from "react-icons/md";
import '../../assets/Table.css'
import {Row, Table} from "react-bootstrap";

var dirUpdateButton = '/';

// Filtro para busqueda para cualquier columna de la tabla
function GlobalFilter({globalFilter, setGlobalFilter,}) {
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <input style={{width: "100%", maxWidth: "30%", marginLeft: 10, marginRight: "10%"}}
               type="text"
               className='search'
               value={value}
               onChange={e => {
                   setValue(e.target.value);
                   onChange(e.target.value);
               }}
               placeholder={`Buscar`}
        />
    )
}

//Acomoda la foto
export function AvatarCell({column, row}) {
    return (
        <img className="avatar" src={row.original[column.img]} alt=""/>

    )
}

//Agrega el boton para actualizar
export function UpdateButton({column, row}) {
    const id = row.original.id;
    return (
        <Link to={dirUpdateButton + id}>
            <MdOpenInNew style={{color: "#769f5e", fontSize: 22}}/>
        </Link>
    )
}

function CustonTable({name, columns, data, dir}) {

    dirUpdateButton = '/update-' + dir + '/';
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
            columns, data,
        },
        useFilters, useGlobalFilter, usePagination,
    )


    return (
        <>
            <Row style={{flexDirection: "row"}}>
                <h3 style={{width: "100%", maxWidth: "40%", margin: 6}}>{name}</h3>
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
                <button style={{width: "100%", maxWidth: "10%"}} onClick={handleClick} type="button" className='button'>
                    Agregar
                </button>
            </Row>
            <hr className="line"/>
            {/* CustonTable */}
            <Table striped hover size="lg" responsive="lg" {...getTableProps()} className="line">
                {/*HEADER DE TBALA*/}
                {headerGroups.map(headerGroup => (
                    <tr style={{textAlign: "center"}} {...headerGroup.getHeaderGroupProps()} className="header-table">
                        {headerGroup.headers.map(column => (
                            <th scope="col" {...column.getHeaderProps(column)}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}


                {/*VALORES TBALA*/}
                <tbody {...getTableBodyProps()} className="column">


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

            </Table>

            <hr className="line"/>
            {/* Pagination */}

            <nav className="pagination-button">
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className='button'
                >
                    <span>Anterior</span>
                </button>

                <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage
                    }
                    className='button'
                >
                    <span className='button'>Siguiente</span>
                </button>

            </nav>


        </>
    )
}

export default CustonTable;