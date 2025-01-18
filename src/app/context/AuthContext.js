// app/context/AuthContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const UserAuth = async (token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/userapp/user/me`, {
            method: 'GET',
            credentials: 'include' // This replaces 'withCredentials'
        });

        if (response.ok) {
            const userData = await response.json();
            return userData;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error during user authentication:', error.message);
        return false;
    }
};


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        let token = Cookies.get('token');
        setLoading(true) 
        // setUser(token);
        const userdata = async()=>{
            if (token) {
                const user = await UserAuth(token);
                setUser(user);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }
        }

        userdata(); // Fetch user data when component mounts or token changes

    }, []);

    const login = async(data) => {
        // setCookie(null, 'token', token, { path: '/' }); // Store token in cookies
        // setUser({ token });
        console.log(data);
        let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/userapp/auth/login`,
            {
                method: 'POST',
                body: JSON.stringify(data)
            });
        response = await response.json();
        console.log("response: ",response);
        if (response.data) {
            setUser(response.data);
            router.push('/');
        }
        else {
            console.error('Failed to log in:', response.message);
        }
    };

    const logout = () => {
        destroyCookie(null, 'token'); // Remove token from cookies
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
