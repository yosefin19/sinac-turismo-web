import React from "react";
import {FaHiking} from 'react-icons/fa'
import {AiFillHome} from 'react-icons/ai'
import {GiMountainRoad} from 'react-icons/gi'

export const SideBarData = [
    {
        title: 'Inicio',
        path: '/menu',
        icon: <AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Área de Conservación',
        path: '/conservation-area',
        icon: <GiMountainRoad/>,
        cName: 'nav-text'
    },
    {
        title: 'Destinos Turísticos',
        path: '/tourist-destination',
        icon: <FaHiking/>,
        cName: 'nav-text'
    },
]

/*const SideBar = ({open}) => {
    return(
        <div className='sidebar'>

        </div>
    );
};

export default SideBar;*/
