import { useState, useEffect } from "react";
import { Inventory } from "./Inventory";
import { Ticket } from "./Ticket";
import { Home } from "./Home";

export function Main({ onContentClick, currentView }) {

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
                <Home products={products} tickets={tickets} />
            )}
            {currentView === 'inventario' && (
                <Inventory products = {products} setProducts={setProducts} />
            )}

            {currentView === 'ticket' && (
                <Ticket tickets = {tickets} setTickets = {setTickets} />
            )}
            
        </main>
    );
}