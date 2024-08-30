import ProtectedRoute from '@/components/ProtectedRoute';
import Form from '@/components/register/index.js';

function Register() {
  return (
    <section className='flex w-screen h-screen'>
      <Form />
    </section>
  );
}

export default ProtectedRoute(Register);