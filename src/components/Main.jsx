import { useState, useEffect } from "react";
import { Inventory } from "./Inventory";
import { Ticket } from "./Ticket";
import { Home } from "./Home";

export function Main({ onContentClick, currentView }) {
    
const deleteProduct = (id) => {
        const updateProducts = products.filter(product => product.id !== id);

        setProducts(updateProducts);
    }
    
    const updateTicketStatus = (id, newStatus) =>{
        const updatedTickets = tickets.map(ticket =>{
            if (ticket.id === id){
                return {...ticket, estado: newStatus};
            }
            return ticket;
        });

        setTickets(updatedTickets);
    };

    const [products, setProducts] = useState(()=>{
        const savedProducts = localStorage.getItem("Repuestos");
        if (savedProducts){
            return JSON.parse(savedProducts);
        }else{
            return [];
        }
    });

    const [tickets, setTickets] = useState(()=>{
        const savedTickets = localStorage.getItem("Tickets");
        if(savedTickets){
            return JSON.parse(savedTickets);
        } else {
            return [];
        }
    });

    useEffect(()=>{
        localStorage.setItem("Repuestos",JSON.stringify(products));
    }, [products]);

    useEffect(()=>{
        localStorage.setItem("Tickets",JSON.stringify(tickets));
    }, [tickets]);

    return (
        <main className="main" onClick={onContentClick}>
            
            {currentView === 'inicio' && (
                <Home products={products} tickets={tickets} deleteProduct={deleteProduct} updateTicketStatus={updateTicketStatus}/>
            )}
            {currentView === 'inventario' && (
                <Inventory products = {products} setProducts={setProducts} deleteProduct={deleteProduct}/>
            )}

            {currentView === 'ticket' && (
                <Ticket tickets = {tickets} setTickets = {setTickets} updateTicketStatus={updateTicketStatus}/>
            )}
            
        </main>
    );
}