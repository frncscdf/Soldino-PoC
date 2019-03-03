import React from 'react';
import logo from './../../img/logo.png';

function Header () {
    return (
        <header>
            <img src={logo} className="logo" alt="logo-Soldino" />
            <h1>Soldino - PoC</h1>
        </header>
    );
}

export default Header;
