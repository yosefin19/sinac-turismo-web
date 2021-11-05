import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Form from '../../components/form/FormUpdateProfile'


function UpdateProfile() {
    let {id} = useParams()

    const apiUrl = `http://40.76.245.64:8000/profiles/` + id;

    const [user, setItems] = useState([]);

    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                },
            )
    }, [apiUrl])

    return (
        <section className='card'>
            <div className='header-cuadro'>
                <h1 className='header-text-cuadro'>Administrar Perfiles</h1>
                <hr/>
            </div>
            <div className='body-cuadro'>
                <Form data={user} id={id}/>

            </div>

        </section>
    );
}

export default UpdateProfile;
