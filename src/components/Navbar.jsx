import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
    const logout = () => {
        localStorage.clear();
    };

    return (
        <nav class="navbar row justify-content-between">
            <div class="col-4">
                <span class="navbar-brand mb-0 h1">
                    Taller de Desarrollo Front End - Obligatorio
                </span>
            </div>
            <div class="col-2">
                <span class="navbar-text">
                    <NavLink className="navbar-link" to="/" onClick={logout}>Cerrar Sesión</NavLink>
                </span>
            </div>
        </nav>
    );
};

export default Navbar;
