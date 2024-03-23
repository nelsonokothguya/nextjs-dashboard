'use server'

import {z} from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {signIn} from "../auth"
import { AuthError } from 'next-auth'
import Form from '../ui/customers/create-form'




const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',}),
    amount: z.coerce
    .number()
    .gt(0, {message: 'Amount must be greater than $0.'}),
    status: z.enum(['paid', 'pending'], {
        invalid_type_error: 'Please select an invoice status'
    }),
    date: z.string(),
    customerName: z.string(),
    customerEmail: z.string(),
    
})

const CreateInvoice = FormSchema.omit({id: true, date: true})
const CreateCustomer = FormSchema.omit({id: true, status: true, amount: true, customerId: true, date: true})

export type InvoiceFormState = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    }
    message?: string | null;
}
export type CustomerFormState = {
    errors?: {
        customerName?: string[];
        customerEmail?: string[];
    }
    message?: string | null;

}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);  
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';    
        }
    }
    throw error
}
}
export async function createCustomer(prevState: CustomerFormState, formData: FormData) {
    const validatedFields = CreateCustomer.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Customer.'
        }
    }
    const {customerName, customerEmail} = CreateCustomer.parse(Object.fromEntries(formData.entries()));
    try {
        await sql`INSERT INTO customers (name, email) VALUES (${customerName}, ${customerEmail})`;
    } catch (error: any) {
        return {error: error.message}
    }
    revalidatePath('/dashboard/customers')
    redirect('/dashboard/customers')

}

export async function createInvoice(prevState: InvoiceFormState, formData : FormData) {

   const validatedFields = CreateInvoice.safeParse(Object.fromEntries(formData.entries()));

   if (!validatedFields.success) {
         return {
            errors: validatedFields.error.flatten().fieldErrors, 
            message: 'Missing Fields. Failed to Create Invoice.'
        }
   }
 
   const {customerId, amount, status} = CreateInvoice.parse(Object.fromEntries(formData.entries()))
   const amountInCents = amount * 100;
   const date = new Date().toISOString().split('T')[0];

  try {
    await sql`INSERT INTO invoices (customer_id, amount, status, date) VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;
  } catch (error: any) {
    return {error: error.message}
  }

    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')

}


const UpdateInvoice = FormSchema.omit({id: true, date: true})

export async function updateInvoice(id: string, prevState: InvoiceFormState, formData : FormData) {
    
    const validatedFields = UpdateInvoice.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors, 
            message: 'Missing Fields. Failed to Update Invoice.'
        }
    }
    const {customerId, amount, status} = UpdateInvoice.parse(Object.fromEntries(formData.entries()))

    const amountInCents = amount * 100;

    try {
        await sql`UPDATE invoices SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status} WHERE id = ${id}`;
    } catch (error: any) {
        return {error: error.message}
    }

    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
}

export async function deleteInvoice(id: string) {
    // throw new Error('Not implemented')
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices') //only if try succeeds
    } catch (error: any) {
        return {error: error.message}
    }

    
    
}