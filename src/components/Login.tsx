import { useState } from 'react';
import { router, supabase } from "../main";
import { Link } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setError] = useState<string | null>(null);

    const handleRegister = async () => {
        const { error } = await supabase.auth.signUp({
            email,
            password
        });
        if (error) {
            setError(error.message)
        } else {
            alert('Revisa tu email')
        }
    };

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) {
            setError(error.message)
        } else {
            // Handle successful login
            console.log('User logged in:', data);
            router.navigate('movies')
        }
    };

    return (
        <div className='flex flex-col'>
            <h1 className='mb-5'>Cinemateca UAO</h1>
            <h2 className='mb-5'><strong>Inicio de sesión</strong></h2>
            <Link to='/about'>*About</Link>
            {errorText && <div>{errorText}</div>}
            <div className='flex flex-col max-w-96 min-w-80 gap-5 mx-auto my-7'>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleRegister}>Registrar</button>
            </div>
            <h2>Usuarios de prueba</h2>
            <pre>
                <div>
                    user1@example.com user1example

                </div>
                <div>
                    user2@example.com user2example

                </div>
            </pre>
        </div>
    );
};

export const Logout = () => {
    const doLogout = async () => {
        await supabase.auth.signOut()
        router.navigate('/')
    }
    doLogout()
    return (
        <>
            <h1>Cerrando...</h1>
        </>
    )
}