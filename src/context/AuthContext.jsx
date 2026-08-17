import { createContext, useContext, useEffect, useState } from 'react';
import { account, ID } from '../lib/appwrite.js';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUserStatus();
    }, []);

    const checkUserStatus = async () => {
        try {
            const loggedIn = await account.get();
            setUser(loggedIn);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        await account.createEmailPasswordSession(email, password);
        await checkUserStatus();
    };

    const register = async (name, email, password) => {
        await account.create(ID.unique(), email, password, name);
        await login(email, password);
    };

    const logout = async () => {
        await account.deleteSession('current');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
