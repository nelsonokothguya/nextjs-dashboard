'use server'

import {z} from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['paid', 'pending']),
    date: z.string(),
})

const CreateInvoice = FormSchema.omit({id: true, date: true})

export async function createInvoice(formData : FormData) {
   const {customerId, amount, status} = CreateInvoice.parse(Object.fromEntries(formData.entries()))
 
   const amountInCents = amount * 100;
   const date = new Date().toISOString().split('T')[0];

   await sql`INSERT INTO invoices (customer_id, amount, status, date) VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;

    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')

}