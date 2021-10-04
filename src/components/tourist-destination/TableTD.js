import {Table} from "react-bootstrap";
import TableRowCA from "./TableRowTD";

const styles = {textAlign: 'center', alignItems: 'center',}

const TableTD = ({data}) => {
    return(
        <Table striped bordered hover size="lg" responsive="lg">
            <thead>
            <tr>
                <th style={styles}>Imagen</th>
                <th style={styles}>Identificador</th>
                <th style={styles}>Nombre</th>
                <th style={styles}>Descripción</th>
                <th style={styles}>Editar</th>
            </tr>
            </thead>
            <tbody>
            {
                (data.length > 0) ? (
                    data.map((element) => (
                        <TableRowCA
                            key={element.id}
                            element={element}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className='text-center'>Sin Datos</td>
                    </tr>
                )
            }
            </tbody>

        </Table>
    );
};

export default TableTD;