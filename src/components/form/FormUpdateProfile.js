import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';
import "../../assets/Form.css";


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function Form(props) {
    const pdata = props.data;
    const idUser = props.id;
    const [name, setName] = useState(pdata.name);
    const [email, setEmail] = useState(pdata.email);
    const [emailError, setEmailError] = useState("");
    const [phone, setPhone] = useState(pdata.phone);
    const [profile, setProfile] = useState(null);
    const [cover, setCover] = useState(null);

    const dirUpdateButton = '/profiles'

    const history = useHistory();


    useEffect(
        () => {
            if (!email) {
                setEmailError("");
            } else {
                if (validateEmail(email)) {
                    setEmailError("");
                } else {
                    setEmailError("Ingrese un correo valido.");
                }
            }
        },
        [email]
    );

    const updateImage = (type) => {
        const url = 'http://40.76.245.64:8000/profiles/photo/' + type + '/' + idUser

        const formPhotos = new FormData();
        if (type === 'cover') {
            formPhotos.append(`photo`, cover)
        } else {
            formPhotos.append(`photo`, profile)
        }
        const requestOptions = {
            method: 'POST',
            body: formPhotos,
            mimeType: "multipart/form-data",

        };
        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))

    }
    const Actualizar = () => {

        //primero agrego cada foto, me retorna el path de cada foto y los guardo
        // const profile_path = updateImage(profile, 'profile');
        //const cover_path = updateImage(cover, 'cover');

        const url = 'http://40.76.245.64:8000/update-profile/' + idUser;

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                email: email, name: name, phone: phone

            })
        };
        fetch(url, requestOptions)
            .then(response => response.json())
        /* if(cover){
            updateImage('cover')
         }
         if(profile){
           updateImage('profile')
         }
         */
        history.push({
            pathname: dirUpdateButton,
        })
        window.history.go()
    }

    const Eliminar = () => {
        const url = 'http://40.76.245.64:8000/delete-profile/' + idUser;

        fetch(url, {method: 'DELETE'}).then(response => response.json())

        history.push({
            pathname: dirUpdateButton,
        })
        window.history.go()
    }


    return (


        <div>

            <form>
                <h3>Ingrese la informacion</h3>


                <h1 className='text'>Nombre:</h1>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                    placeholder={pdata.name}
                />
                <hr className="line"/>

                <h1 className='text'>Correo:</h1>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                    placeholder={pdata.email}
                />
                <hr className="line"/>
                <div className="error">{emailError}</div>


                <h1 className='text'>Telefono:</h1>
                <input
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    type="text"
                    placeholder={pdata.phone}
                />
                <hr className="line"/>


                <h1 className='text'>Foto de perfil:</h1>
                <input
                    value={profile}
                    onChange={e => setProfile(e.target.value)}
                    type="file"
                    placeholder='Identificador'
                />
                <hr className="line"/>
                <h1 className='text'>Foto de portada:</h1>
                <input
                    value={cover}
                    onChange={e => setCover(e.target.value)}
                    type="file"
                    placeholder='Identificador'
                />
                <hr className="line"/>

                <button onClick={Actualizar} type="submit">Actualizar</button>

                <button onClick={Eliminar} type="submit">Eliminar</button>


            </form>
        </div>
    );
}


export default Form;
