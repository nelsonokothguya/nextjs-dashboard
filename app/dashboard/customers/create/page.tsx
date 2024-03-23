import Form from '../../../ui/customers/create-form';
import Breadcrumbs from '../../../ui/invoices/breadcrumbs';
import { fetchCustomers } from '../../../lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Customer',
  description: 'Create a new customer.',
  keywords: ['customer', 'create', 'new'],
};

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'Create Customer',
            href: '/dashboard/customers/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
