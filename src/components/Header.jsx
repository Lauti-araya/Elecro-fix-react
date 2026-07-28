export function Header ({onToggleNav, onChangeView, currentView}){
    return (
    <header className="header">
            <div className="header__title">
                <h1 className="title">Electro Fix</h1>
                <h2 className="subtitle">Taller de reparaciones</h2>
            </div>
            <nav className="nav__computer">
                <button onClick={()=> onChangeView('inicio')} className={`nav__item-computer home__option-computer ${currentView === 'inicio'? 'active__filter':''}`}>Inicio</button>
                <button onClick={()=> onChangeView('inventario')}className={`nav__item-computer inventory__option-computer ${currentView === 'inventario'? 'active__filter':''}`}>Inventario</button>
                <button onClick={()=> onChangeView('ticket')}className={`nav__item-computer ticket__option-computer ${currentView === 'ticket'? 'active__filter':''}`}>Ticket</button>
            </nav>
            <button className="menu__button" onClick={onToggleNav}>
                <span className="material-symbols-outlined">
                    menu
                </span>
            </button>
        </header>
        );
}