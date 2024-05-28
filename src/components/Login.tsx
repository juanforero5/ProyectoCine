import { useState } from 'react';
import { router, supabase } from "../main";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setError] = useState<string | null>(null);

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
        <div>
            <h1>Login</h1>
            {errorText && <div>{errorText}</div>}
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