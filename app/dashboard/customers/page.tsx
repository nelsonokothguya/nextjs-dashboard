import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'Customers overview.',
  keywords: ['customers', 'clients', 'users'],
};

export default function Page() {
  return <p>Customers Page</p>;
}
