import {FaBars} from "react-icons/fa"
import {AiOutlineLeft} from "react-icons/ai"
import {ImExit} from "react-icons/im"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {IconContext} from 'react-icons'
import './NavBar.css'
import {SideBarData} from "./SideBar";
import {Container, Image, Navbar, Row, Spinner} from "react-bootstrap";
import logo from '../assets/sinac.png';
import useAuthentication from "../authentication/useAuthentication";
import {API_URL, IMAGE_BASE_URL} from "../config";
import {helpApi} from "../helper/helpApi";

const NavBar = () => {
    const [sideBar, setSideBar] = useState(true);
    const authentication = useAuthentication();
    const [profile, setProfile] = useState(null);
    const [photo, setPhoto] = useState("");


    /**
     * Obtiene los datos del usuario para mostrarlos en la barra de navegación superior.
     */
    useEffect(() => {
        const api = helpApi();
        const credentials = JSON.parse(localStorage.getItem("credentials"));
        let endPoint = `${API_URL}profile`;
        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + credentials.token,
            },
        }
        api.get(endPoint, options).then(response => {
            if (!response.err) {
                setProfile(response);
                if (response.profile_photo_path) {
                    setPhoto(`${IMAGE_BASE_URL}${response.profile_photo_path}`);
                } else setPhoto("img.png");
            }
        });
    }, []);

    /**
     * Muestra u oculta la barra lateral.
     */
    const handleShowSideBar = () => setSideBar(!sideBar);

    /**
     * Elimina las credenciales del storage.
     */
    const handleLogOut = () => {
        authentication.logout();
    }

    return (
        <div>
            <IconContext.Provider value={{color: '#383838'}}>
                <Navbar>
                    <Container>
                        <Link to='#' className='menu-bars'>
                            <FaBars className='faBars' onClick={handleShowSideBar}/>
                        </Link>
                        <Navbar.Toggle/>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <div className="profile-image-box">
                                    <Image
                                        className="profile-image"
                                        src={
                                            profile && profile.profile_photo_path !== "/" ? photo : "avatar.jpg"
                                        }
                                    />
                                </div>
                            </Navbar.Text>
                            <Row className={"info-user"}>
                                <b className="user-name">{
                                    profile ? (
                                        profile.name
                                    ) : (
                                        <Spinner as="span" variant="dark" size="sm" role="status" aria-hidden="true"
                                                 animation="border"/>
                                    )
                                }</b>
                                <b className="user-description">Administrador</b>
                            </Row>
                            <ImExit className='faBars' color="#808080" onClick={handleLogOut}/>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={handleShowSideBar}>
                        <li className='navbar-toggle'>
                            <Image src={logo} rounded className='logo'/>
                            <h3 className="logo-title">SINAC</h3>
                            <Link to='#' className='menu-bars'>
                                <AiOutlineLeft/>
                            </Link>
                        </li>
                        {SideBarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link className="link" to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </div>
    );
}

export default NavBar;