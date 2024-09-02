import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/context/AuthContext';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>Celestial Chat</title>
      </Head>
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" />
    </AuthProvider>
  );
}
