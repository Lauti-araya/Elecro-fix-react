import { useState, useEffect } from "react";
import { Inventory } from "./Inventory";
import { Ticket } from "./Ticket";
import { Home } from "./Home";
import {Routes, Route,} from "react-router-dom";
import { supabase } from "../supabase";

export function Main({ onContentClick }) {
    
const deleteProduct = async (id) => {
    const {error} = await supabase.from('repuestos').delete().eq('id', id);
    if (error) {
        console.error('Error al eliminar de la base de datos: ', error);
        return;
    }
        const updateProducts = products.filter(product => product.id !== id);

        setProducts(updateProducts);
    }
    
    const updateTicketStatus = async (id, newStatus) =>{

        const {error} = await supabase.from('tickets').update({estado: newStatus}).eq('id', id);
        if (error) {
            console.error('Error al actualizar el estado del ticket: ', error);
            return;
        }

        const updatedTickets = tickets.map(ticket =>{
            if (ticket.id === id){
                return {...ticket, estado: newStatus};
            }
            return ticket;
        });

        setTickets(updatedTickets);
    };

    const [products, setProducts] = useState([]);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const cargarInventario = async () => {
            const { data, error } = await supabase.from('repuestos').select('*');
            if (error) {
                console.error('Error al cargar el inventario:', error);
            } else {
                setProducts(data);
            }
        }
        cargarInventario();
    },[]);

    useEffect(()=> {
        const cargarTickets = async () => {
            const { data, error } = await supabase.from('tickets').select('*');
            if (error) {
                console.error('Error al cargar los tickets:', error);
            } else {
                setTickets(data);
            }
        }
        cargarTickets();
    },[])

    return (
            <main className="main" onClick={onContentClick}>
                <Routes>

                    <Route path="/" element={<Home products={products} tickets={tickets} deleteProduct={deleteProduct} updateTicketStatus={updateTicketStatus}/>} />
                    <Route path="/Inventory" element={<Inventory products = {products} setProducts={setProducts} deleteProduct={deleteProduct} />} />
                    <Route path="/Ticket" element={<Ticket tickets = {tickets} setTickets = {setTickets} updateTicketStatus={updateTicketStatus}/>} />
                    

                </Routes>
            </main>
    );
}