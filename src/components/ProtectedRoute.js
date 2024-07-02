// frontend/components/ProtectedRoute.js
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loading from './basics/loading';

function ProtectedRoute(Component) {
  return (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!user && router.pathname !== '/login') {
          router.push('/login');
        } else if (user && router.pathname === '/login') {
          router.push('/chat');
        }
      }
    }, [user, loading, router]);

    if (loading) {
      return <Loading />; 
    }

    return <Component {...props} />;
  };
}

export default ProtectedRoute;
