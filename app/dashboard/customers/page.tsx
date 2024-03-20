import { Metadata } from 'next';
import { CreateCustomer } from '../../ui/customers/buttons';
import { lusitana } from '../../ui/font';
import CustomersTable from '../../ui/customers/table';
import { fetchFilteredCustomers, fetchCustomerPages } from '../../lib/data';
import Search from '../../ui/search';
import Pagination from '../../ui/invoices/pagination';
import { CardsSkeleton } from '../../ui/skeletons';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'View and manage your customers with ease.',
  keywords: ['customers', 'clients', 'users'],
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { search?: string; page?: string };
}) {
  const query = searchParams?.search || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCustomerPages(query);
  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
        <CreateCustomer />
      </div>
      <Suspense key={query + currentPage} fallback={<CardsSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
