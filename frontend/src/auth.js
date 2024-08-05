// auth.js
export const saveTokens = (accessToken, refreshToken) => {
    console.log('Saving tokens:', accessToken, refreshToken);
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
};

export const getAccessToken = () => {   
    const token = localStorage.getItem('access_token');
    return token;
};

export const getRefreshToken = () => {
    const token = localStorage.getItem('refresh_token');
    return token;
};

export const refreshToken = async (refreshToken) => {
    console.log('Entering refreshToken function'); // Add this line
    console.log('Refreshing token with:', refreshToken);
    try {
        const response = await fetch('http://127.0.0.1:8055/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error details:', errorData);
            throw new Error(`Failed to refresh token: ${errorData.errors ? errorData.errors[0].message : 'Unknown error'}`);
        }

        const data = await response.json();
        console.log('Refresh token response:', data);
        const newAccessToken = data.data.access_token;
        const newRefreshToken = data.data.refresh_token;

        // Save tokens in localStorage
        saveTokens(newAccessToken, newRefreshToken);

        console.log("hello")
        return newAccessToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};

  