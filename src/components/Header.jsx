import {NavLink} from "react-router-dom";


export function Header ({onToggleNav, logOut}){
    return (
        <header className="header">
                <div className="header__title">
                    <h1 className="title">Electro Fix</h1>
                    <h2 className="subtitle">Taller de reparaciones</h2>
                </div>
                <nav className="nav__computer">
                    <NavLink to="/"  className={({ isActive }) =>`nav__item-computer home__option-computer ${isActive ? 'active__filter' : ''}`}>Inicio</NavLink>

                    <NavLink to="/Inventory" className={({ isActive }) =>`nav__item-computer inventory__option-computer ${isActive ? 'active__filter' : ''}`}>Inventario</NavLink>

                    <NavLink to="/Ticket" className={({ isActive }) =>`nav__item-computer ticket__option-computer ${isActive ? 'active__filter' : ''}`}>Ticket</NavLink>
                    <button onClick={logOut} className="nav__item-computer logout__option-computer">
                        Cerrar sesión
                    </button>
                </nav>
                <button className="menu__button" onClick={onToggleNav}>
                    <span className="material-symbols-outlined">
                        menu
                    </span>
                </button>
            </header>
    );       
}