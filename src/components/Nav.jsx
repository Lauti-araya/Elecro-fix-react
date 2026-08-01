import {NavLink} from "react-router-dom";

export function Nav ({hidden, onContentClick}){
    return (
            <nav  className={`nav ${hidden ? 'hidden': ''}`}>
                <NavLink onClick={onContentClick} to="/" className={({ isActive }) =>`nav__item home__option ${isActive ? 'active__filter' : ''}`}>Inicio</NavLink>
                <NavLink onClick={onContentClick} to="/Inventory" className={({ isActive }) =>`nav__item inventory__option ${isActive ? 'active__filter' : ''}`}>Inventario</NavLink>
                <NavLink onClick={onContentClick} to="/Ticket" className={({ isActive }) =>`nav__item ticket__option ${isActive ? 'active__filter' : ''}`}>Ticket</NavLink>
            </nav>
    );
}