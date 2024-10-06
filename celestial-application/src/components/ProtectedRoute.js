import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loading from './basics/loading';

const ProtectedRoute = (Component) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
      if (!loading) {
        if (!user && router.pathname !== '/login' && router.pathname !== '/register') {
          router.replace('/login');
        } else if (user && (router.pathname === '/login' || router.pathname === '/register')) {
          router.replace('/chat');
        }
      }
    }, [user, loading, router]);

    if (loading) {
      return <Loading />;
    }

    return <Component {...props} />;
  };

  Wrapper.displayName = `ProtectedRoute(${Component.displayName || Component.name || 'Component'})`;

  return Wrapper;
};

export default ProtectedRoute;
