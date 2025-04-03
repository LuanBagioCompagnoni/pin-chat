import PageLayout from '@/shared/components/auth/pageLayout/layout';

import ProtectedRoute from '@/components/ProtectedRoute';
import Form from '@/pages/register/components/form';

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
