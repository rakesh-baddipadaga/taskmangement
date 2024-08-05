// login.js
import { saveTokens } from './auth';

export const handleLogin = async (username, password) => {
    try {
        const response = await fetch('http://127.0.0.1:8055/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, password: password }) // Use appropriate keys as per your API
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Login failed:', errorData);
            throw new Error('Login failed');
        }

        const data = await response.json();
        const accessToken = data.data.access_token;
        const refreshToken = data.data.refresh_token;

        saveTokens(accessToken, refreshToken);
        return accessToken;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};
