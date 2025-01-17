import ProtectedRoute from '@/components/ProtectedRoute';
import Form from '@/pages/login/components/loginForm';

import PageLayout from '../../shared/components/auth/pageLayout/layout';

function Login() {
  return (
    <section className="flex w-screen h-screen">
      <PageLayout>
        <Form />
      </PageLayout>
    </section>
  );
}

export default ProtectedRoute(Login);