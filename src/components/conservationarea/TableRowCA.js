import {Image} from "react-bootstrap";
import {IoOpenOutline} from "react-icons/all";
import {Link} from "react-router-dom";
import {IMAGE_BASE_URL} from "../../config"

const styles = {
    maxHeight:'50px',
    maxWidth:'auto',
    flex: "center",
    borderRadius: "3px"
};

const TableRowCA = ({element}) => {
    let {name, description, id, photos_path} = element;

    let photos = photos_path.split(",");
    return(
        <tr>
            <td style={{display: "flex", justifyContent: 'center', alignItems: 'center',}}>
                <Image style={styles} src={`${IMAGE_BASE_URL}${photos[0]}`}/>
            </td>
            <td style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center',}}>{id}</td>
            <td style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center',}}>{name}</td>
            <td style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center',}}>{description.slice(0, 30).concat('...')}</td>
            <td style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center',}}>
                <Link to={`/conservation-area/${id}`}>
                    <IoOpenOutline style={{color:"#769f5e", fontSize: 22}}/>
                </Link>
            </td>
        </tr>
    );
};

export default TableRowCA;