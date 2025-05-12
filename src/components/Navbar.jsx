import React from "react";
import logo from '../assets/icon.png';

export const Navbar = () => {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                <img src={logo} alt="Logo de blog" width="30" className="d-inline-block align-text-top me-2"/>
                <strong>Blog de aprendizaje</strong>
                </a>
            </div>
        </nav>
    );
}