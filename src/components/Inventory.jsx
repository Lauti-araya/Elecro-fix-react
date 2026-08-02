import { useState } from "react";
import { supabase } from "../supabase";


export function Inventory({products, setProducts, deleteProduct}) {
    
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [search, setSearch] = useState('');

    const [newCode, setNewCode] = useState('');
    const [newName, setNewName] = useState('');
    const [newStock, setNewStock] = useState('');
    const [newPrice, setNewPrice] = useState('');

    const [addMessage, setAddMessage] = useState('');

    const showMessage = (mensaje) => {
        setAddMessage(mensaje);
        setTimeout(() => {
            setAddMessage('');
        }, 3000);
    }

    const addProductDB = async (newProduct) =>{
        const {data, error} = await supabase.from('repuestos').insert([newProduct]).select();
        if (error) {
            console.error('Error al guardar: ', error);
            return;
        }
        showMessage('¡Repuesto agregado con exito!');
        setProducts([...products, data[0]]);
        
        setNewCode('');
        setNewName('');
        setNewStock('');
        setNewPrice('');
        setIsFormVisible(false)
    }

    const addProduct = (e)=>{
        e.preventDefault();

        const newProduct={
            codigo: newCode,
            nombre: newName,
            stock: parseInt(newStock),
            precio: parseFloat(newPrice)
        }


        addProductDB(newProduct);

    };

    

    const filteredProducts = products.filter(product => product.nombre.toLowerCase().includes(search.toLowerCase()));

    return(
        <section className="inventory">
            <div className="inventory__header">
                <h3 className="section__title">Gestion de inventario</h3>
                <div className="search__add">
                    <span className="material-symbols-outlined search__icon">search</span>
                    <input type="text" className="inventory__input" placeholder="Buscar repuesto" value={search} onChange={(e)=> setSearch(e.target.value)}/>
                    <span className="material-symbols-outlined add__icon" onClick={()=> setIsFormVisible(true)}>add</span>
                </div>
            </div>
            <div className={`section inventory__section ${isFormVisible?'hidden':''}`}>
                <table>
                    <thead className="text__title">
                        <tr>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Stock</th>
                            <th>Precio</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="inventory__table">
                        {
                            filteredProducts.length === 0 ?(
                                <tr>
                                    <td colSpan="5" className="text__alert">No se encontraron repuestos</td>
                                </tr>
                            ):(
                                filteredProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.codigo}</td>
                                        <td>{product.nombre}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.precio}</td>
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

            <form className={`inventory__form form ${!isFormVisible? 'hidden': ''}`} onSubmit={addProduct}>
                <div className="form__header">
                    <h4 className="form__title">Agregar nuevo repuesto</h4>
                    <span className="material-symbols-outlined inventor__close__icon close__icon" onClick={()=>setIsFormVisible(false)}>close</span>
                </div>

                <label htmlFor="cod" className="item__title">Codigo de serie</label>
                <input type="text" className="input__form" id="cod" required value={newCode} onChange={(e)=>setNewCode(e.target.value)} />

                <label htmlFor="name" className="item__title">Nombre del repuesto</label>
                <input type="text" className="input__form" id="name" required value={newName} onChange={(e)=>setNewName(e.target.value)} />

                <label htmlFor="stock" className="item__title">Cantidad en stock</label>
                <input type="number" className="input__form" id="stock" required value={newStock} onChange={(e)=>setNewStock(e.target.value)} />

                <label htmlFor="price" className="item__title">Precio unitario</label>
                <input type="number" className="input__form" id="price" required step="0.01" value={newPrice} onChange={(e)=>setNewPrice(e.target.value)} />

                <button type="submit" className="add__button">Agregar</button>
            </form>
            {addMessage && (
                <div className="add__message">
                    {addMessage}
                </div>
            )}
        </section>
    );
}