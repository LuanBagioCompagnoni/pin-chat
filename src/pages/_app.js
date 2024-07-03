// frontend/pages/_app.js
import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer position="bottom-right"/>
    </AuthProvider>
  );
}
