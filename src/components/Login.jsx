import {useState} from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    
    
    const handleLogin = async (e) => {
        const user = {
            email: email,
            password: password
        }

        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword(user);
        if (error) {
            setErrorMsg('Correo electrónico o contraseña incorrectos. Intente nuevamente.');
            return;
        } else {
            console.log('Inicio de sesión exitoso: ', data);
            navigate('/'); 
        }
    }
    
    
    return (
        <div className="login__container">
            <form onSubmit={handleLogin} className="form">
                <h4 className="form__title">Inicio de sesion</h4>
                <label htmlFor="email" className="item__title">Correo electronico</label>
                <input type="email" className="input__form" id="email" name="email" placeholder="Ingrese su correo electronico" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password" className="item__title">Contraseña</label>
                <input type="password" className="input__form" id="password" name="password" placeholder="Ingrese su contraseña" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                {errorMsg && <p className="error__alert">{errorMsg}</p>}
                <button type="submit" className="add__button">Iniciar sesión</button>
            </form>
        </div>
    )
}