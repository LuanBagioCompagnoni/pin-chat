import ProtectedRoute from '@/components/ProtectedRoute';
import Form from '@/components/login/form';

function Login() {
  return (
    <section className='flex w-screen h-screen'>
      <Form />
    </section>
  );
}

export default ProtectedRoute(Login);