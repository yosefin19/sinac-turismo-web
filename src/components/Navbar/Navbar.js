import { React } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import '../../assets/Navbar.css';
import logo from '../../assets/img/logo.png'

function Navbar() {
  return (
    <>
      <nav className='nav-menu'>
        <ul className='nav-menu-items'>
          <nav className='logo'>
          <img className='logo-imagen' src={logo}/>
          <h1 className='sinac'> SINAC</h1>
           </nav>
            <li className='navbar-toggle'>
            
            </li>
            {routes.map((item, index) => {
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
    </>
  );
}

export default Navbar;