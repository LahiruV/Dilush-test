const TOKEN_KEY = 'auth_token';
const TOKEN_EXPIRY_KEY = 'auth_token_expiry';

export const authService = {
    setToken(token: string): void {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(
            TOKEN_EXPIRY_KEY,
            // new Date(new Date().getTime() + 30 * 1000).getTime().toString()
            new Date(new Date().getTime() + 60 * 60 * 1000).getTime().toString()
        );
    },

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },

    clearToken(): void {
        localStorage.removeItem(TOKEN_KEY);
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    },

    expireToken(): boolean {
        const tokenExpiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
        if (tokenExpiry) {
            const expiryDate = new Date(parseInt(tokenExpiry));
            return expiryDate < new Date();
        }
        return false;
    }
};
