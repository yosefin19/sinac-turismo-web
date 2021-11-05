import {FaBars} from "react-icons/fa"
import {AiOutlineLeft} from "react-icons/ai"
import {Link} from "react-router-dom";
import {useState} from "react";
import {IconContext} from 'react-icons'
import './NavBar.css'
import {SideBarData} from "./SideBar";
import {Image, Navbar} from "react-bootstrap";
import logo from '../assets/sinac.png';
import useAuthentication from "../authentication/useAuthentication";

const NavBar = () => {
    const [sideBar, setSideBar] = useState(true);
    const authentication = useAuthentication();

    const handleShowSideBar = () => setSideBar(!sideBar);

    const handleLogOut = () => {
        authentication.logout();
    }

    return (
        <div>
            <IconContext.Provider value={{color: '#383838'}}>
                <Navbar>
                    <Link to='#' className='menu-bars'>
                        <FaBars className='faBars' onClick={handleShowSideBar}/>
                    </Link>
                    <button onClick={handleLogOut}>cerrar</button>
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
                                    <Link to={item.path}>
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