import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as CgIcons from 'react-icons/cg';

export const routes = [
    {
        title: 'Inicio',
        path: '/',
        icon: <RiIcons.RiDashboardFill/>,
        cName: 'nav-text'
    },
    {
        title: 'Areas de Conservacion',
        path: '/',
        icon: <FaIcons.FaMountain/>,
        cName: 'nav-text'
    },
    {
        title: 'Destinos Turisticos',
        path: '/',
        icon: <FaIcons.FaHiking/>,
        cName: 'nav-text'
    },
    {
        title: 'Usuarios',
        path: '/users',
        icon: <FaIcons.FaUserAlt/>,
        cName: 'nav-text'
    },
    {
        title: 'Perfiles',
        path: '/profiles',
        icon: <CgIcons.CgProfile/>,
        cName: 'nav-text'
    },
];