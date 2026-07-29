export function Home({ products, tickets, deleteProduct, updateTicketStatus }) {
    
    const activeTickets = tickets.filter(ticket => ticket.estado !== "Reparado");
    const lowStockProducts = products.filter(product => product.stock <= 2);

    return (
        <section className="home">
            <h3 className="section__title">Equipos en el taller</h3>
            <div className="section">
                <table className="home__table">
                    <thead className="text__title">
                        <tr>
                            <th>Cliente</th>
                            <th>Modelo</th>
                            <th>Falla/Error</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody className="home__table-ticket">
                        {
                            activeTickets.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text__alert">No hay equipos pendientes</td>
                                </tr>
                            ) : (
                                activeTickets.map(ticket => (
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

            <h3 className="section__title">Repuestos con stock crítico</h3>
            <div className="section">
                <table className="home__table">
                    <thead className="text__title">
                        <tr>
                            <th>Cod.</th>
                            <th>Nombre</th>
                            <th>Stock</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody className="home__table-inventory">
                        {
                            lowStockProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text__alert">Stock en niveles óptimos</td>
                                </tr>
                            ) : (
                                lowStockProducts.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.codigo}</td>
                                        <td>{product.nombre}</td>
                                        <td>{product.stock}</td>
                                        <td>${product.precio}</td>
                                        <td>
                                            <button className="delete__icon" onClick={()=> deleteProduct(product.id)}>
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
}