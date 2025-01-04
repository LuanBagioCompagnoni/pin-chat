import PageLayout from '@/shared/components/auth/pageLayout/layout.tsx';

import ProtectedRoute from '@/components/ProtectedRoute.js';
import Form from '@/components/register/index.js';

function Register() {
  return (
    <section className="flex w-screen h-screen">
      <PageLayout>
        <Form />
      </PageLayout>
    </section>
  );
}

export default ProtectedRoute(Register);