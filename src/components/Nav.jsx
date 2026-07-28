export function Nav ({hidden, onChangeView, currentView}){
    return (
        <nav className={`nav ${hidden ? 'hidden': ''}`}>
                <button onClick={()=> onChangeView('inicio')} className={`nav__item home__option ${currentView === 'inicio'? 'active__filter':''}`}>Inicio</button>
                <button onClick={()=> onChangeView('inventario')} className={`nav__item inventory__option ${currentView === 'inventario'? 'active__filter':''}`}>Inventario</button>
                <button onClick={()=> onChangeView('ticket')} className={`nav__item ticket__option ${currentView === 'ticket'? 'active__filter':''} `}>Ticket</button>
        </nav>
    );
}