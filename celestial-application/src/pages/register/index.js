import Form from '@/components/register/index.js';
import PageLayout from '@/components/basics/auth/pageLayout/index.js';
import ProtectedRoute from '@/components/ProtectedRoute.js';

function Register() {
  return (
    <section className='flex w-screen h-screen'>
      <PageLayout>
        <Form />
      </PageLayout>
    </section>
  );
}

export default ProtectedRoute(Register);