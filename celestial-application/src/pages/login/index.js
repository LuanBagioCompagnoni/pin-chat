import ProtectedRoute from '@/components/ProtectedRoute';
import Form from '@/components/login/index.js';
import PageLayout from '@/components/basics/auth/pageLayout/index.js';

function Login() {
  return (
    <section className='flex w-screen h-screen'>
      <PageLayout>
        <Form />
      </PageLayout>
    </section>
  );
}

export default ProtectedRoute(Login);