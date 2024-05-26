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
            <h2>Login</h2>
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
        </div>
    );
};
