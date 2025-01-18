// app/components/ProtectedRoute.js
'use client';

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Loader from '@/components/Loader/Loader';

export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        let token = Cookies.get('token');
        if(!token){
            if(pathname !== '/register'){
                router.replace('/login');

            }
        }
        else if (!user && !loading) {
            if(pathname !== '/register'){
                router.replace('/login');

            }
        }
    }, [user, router,loading]);

    if(loading){
        return <Loader/>
    }

    if (!user) {
        return null; // or a loading indicator
    }

    return children;
};
