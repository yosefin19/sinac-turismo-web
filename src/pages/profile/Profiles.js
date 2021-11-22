import React, {useEffect, useState} from 'react'
import NavBar from "../../components/NavBar";
import {API_URL, IMAGE_BASE_URL} from "../../config";
import {Image} from "react-bootstrap";
import Table from "../../components/table/Table";
import {Link} from "react-router-dom";
import {IoOpenOutline} from "react-icons/all";


const Profiles = () => {

    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const styles = {
        maxHeight: '50px',
        maxWidth: 'auto',
        flex: "center",
        borderRadius: "3px"
    };

    useEffect(() => {
        const endPoint = API_URL + 'profiles'
        const credentials = JSON.parse(localStorage.getItem("credentials"));
        const options = {
            method: "GET",
            headers : {
                "content-type": "application/json",
                Authorization: "Bearer " + credentials.token
            }
        }
        setLoading(true);
        fetch(endPoint, options)
            .then(res => res.json())
            .then((data) => {
                setProfiles(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, []);

    const columns = [
        {
            dataField: 'profile_photo_path',
            text: 'Foto',
            formatter: (value, row) => {
                let photo = value !== "/" ? `${IMAGE_BASE_URL}${value}` : "avatar.jpg";
                return (
                    <Image className="profile-image-box" src={photo}/>
                );
            },
            headerStyle: () => {
                return {width: '10%', textAlign: 'center', marginLeft: 1, marginRight: 1};
            }
        },
        {
            dataField: "id",
            text: "Identificador",
            sort: true,
            headerStyle: () => {
                return {width: '15%', textAlign: 'center', marginLeft: 1, marginRight: 1};
            }
        },
        {
            dataField: "name",
            text: 'Nombre',
            sort: true,
            style: {textOverflow: "ellipsis", overflow: "hidden", maxWidth: '150%'},
            headerStyle: () => {
                return {width: '30%', textAlign: 'center', marginLeft: 1, marginRight: 1};
            }
        },
        {
            dataField: "cover_photo_path",
            text: "Portada",
            formatter: (value, row) => {
                let photo = value !== "/" ? `${IMAGE_BASE_URL}${value}` : "defaultCover.jpg";
                return (<Image style={styles} src={photo}/>);
            },
            headerStyle: () => {
                return {width: '15%', textAlign: 'center', marginLeft: 1, marginRight: 1};
            }
        },
        {
            dataField: "user_id",
            text: "Usuario Asociado",
            sort: true,
            headerStyle: () => {
                return {width: '15%', textAlign: 'center', marginLeft: 1, marginRight: 1};
            }
        },
        {
            text: "Editar",
            formatter: (value, row) => {
                return (
                    <Link to={`/profile/${row.id}`}>
                        <IoOpenOutline style={{color: "#769f5e", fontSize: 22}}/>
                    </Link>
                );
            },
            headerStyle: () => {
                return {width: '8%', textAlign: 'center'};
            }
        }
    ]

    return (
        <div>
            <NavBar/>
            <div className='section'>
                <Table
                    error={error}
                    loading={loading}
                    data={profiles}
                    columns={columns}
                    title={"Administrar Perfiles"}
                    componentName={"profile"}
                />
            </div>
        </div>
    )
}

export default Profiles;
