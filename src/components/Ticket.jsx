import { useState } from "react";
import { supabase } from "../supabase";

export function Ticket({tickets, setTickets, updateTicketStatus}) {

    const [isFormVisible, setIsFormVisible] = useState(false);

    const [currentFilter, setCurrentFilter] = useState('all');

    const [newName, setNewName] = useState('');
    const [newModel, setNewModel] = useState('');
    const [newError, setNewError] = useState('');
    const [newState, setNewState] = useState('Ingresado');

    const addTicketDB = async (newTicket) =>{
        const {data, error} = await supabase.from('tickets').insert([newTicket]).select();
        if (error) {
            console.error('Error al guardar: ', error);
            return;
        }

        setTickets([...tickets, data[0]]);
    }

    const openTicket = (e)=>{
        e.preventDefault();

        const newTicket ={
            nombre: newName,
            modelo: newModel,
            error: newError,
            estado: newState
        }

        addTicketDB(newTicket);

        setNewName('');
        setNewModel('');
        setNewError('');
        setNewState('Ingresado');
        setIsFormVisible(false);
    };

    
const ticketFilter = tickets.filter(ticket=>{
    if (currentFilter === 'all') return true;
    if (currentFilter === 'active') return ticket.estado !== 'Reparado';
    if (currentFilter === 'record') return ticket.estado === 'Reparado';
    return true
}) 

return (
    
    <section className="ticket">
                <div className="ticket__header-computer">
                    <div className="ticket__header">
                        <h3 className="ticket__title">Tickets de reparacion</h3>
                        <button className="ticket__button" onClick={()=> setIsFormVisible(true)}>Abrir ticket</button>
                    </div>
                    <div className="filter">
                        <button className={`ticket__filter ${currentFilter === 'all'? 'active__filter':''}`} onClick={()=>setCurrentFilter('all')}>TODOS</button>
                        <button className={`ticket__filter ${currentFilter === 'active'? 'active__filter': ''}`} onClick={()=>setCurrentFilter('active')}>ACTIVOS</button>
                        <button className={`ticket__filter ${currentFilter === 'record'? 'active__filter': ''}`} onClick={()=> setCurrentFilter('record')}>HISTORIAL</button>
                    </div>
                </div>
                <div className={`section ticket__section ${isFormVisible? 'hidden':''}`}>
                    <table>
                        <thead className="text__title">
                            <tr>
                                <th>Cliente</th>
                                <th>Modelo</th>
                                <th>Falla/Error</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody className="ticket__table">
                            {
                                ticketFilter.length === 0? (
                                    <tr>
                                        <td colSpan='4' className="text__alert">No hay tickets</td>
                                    </tr>
                                ):(
                                    ticketFilter.map((ticket)=> (
                                        <tr key={ticket.id}>
                                            <td>{ticket.nombre}</td>
                                            <td>{ticket.modelo}</td>
                                            <td>{ticket.error}</td>
                                            <td>
                                                <select className="menu__status" value={ticket.estado} onChange={(e)=> updateTicketStatus(ticket.id, e.target.value)}>
                                                    <option value="Ingresado" className="status__option">Ingresado</option>
                                                    <option value="Revision" className="status__option">En revision</option>
                                                    <option value="Esperando repuesto" className="status__option">Esperando repuesto</option>
                                                    <option value="Reparado" className="status__option">Reparado</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                </div>

                <form className={`ticket__form form ${!isFormVisible? 'hidden':''}`} onSubmit={openTicket}>
                    <div className="form__header">
                        <h4 className="form__title">Complete el formulario</h4>
                        <span className="material-symbols-outlined ticket__close__icon close__icon" onClick={()=>setIsFormVisible(false)}> close</span>
                    </div>
                    
                    <label htmlFor="ticket__name" className="item__title">Nombre del cliente</label>
                    <input type="text" className="input__form" id="ticket__name" required value={newName} onChange={(e)=>setNewName(e.target.value)} />

                    <label htmlFor="ticket__model" className="item__title">Modelo del equipo</label>
                    <input type="text" className="input__form" id="ticket__model" required value={newModel} onChange={(e)=>setNewModel(e.target.value)} />

                    <label htmlFor="ticket__failure" className="item__title">Falla reportada / codigo de error</label>
                    <input type="text" className="input__form" id="ticket__failure" required value={newError} onChange={(e)=>setNewError(e.target.value)} />
                    <label htmlFor="ticket__status" className="item__title">Estado</label>

                    <select name="status" id="ticket__status" className="menu__status form__menu" required value={newState} onChange={(e)=>setNewState(e.target.value)}>
                        <option className="status__option" value="Ingresado">Ingresado</option>
                        <option className="status__option" value="Revision">En revision</option>
                        <option className="status__option" value="Esperando repuesto">Esperando repuesto</option>
                        <option className="status__option" value="Reparado">Reparado</option>
                    </select>

                    <button type="submit" className="add__button">Guardar</button>
                </form>
            </section>
    )
}

