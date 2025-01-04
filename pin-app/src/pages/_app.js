import { ToastContainer } from 'react-toastify';
import {Noto_Sans} from '@next/font/google';
import Head from 'next/head';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from '@/context/AuthContext';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  variable: '--font-noto-sans', 
});

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>Pin Chat</title>
      </Head>
      <main className={`${notoSans.variable} font-sans`}>

        <Component {...pageProps} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </main>

    </AuthProvider>
  );
}
