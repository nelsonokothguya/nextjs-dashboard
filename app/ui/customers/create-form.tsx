'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { Button } from '../button';
import { createCustomer } from '../../lib/actions';

export default function Form({}) {
  const initialState = { message: null, error: {} };

  const [state, dispatch] = useFormState(createCustomer, initialState);

  return (
    <form action={dispatch}>
      <div className="md: rounded-md bg-gray-50 p-4 p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
            placeholder="John Doe"
            aria-describedby="name-error"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerName &&
              state.errors.customerName.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit">Create Customer</Button>
      </div>
    </form>
  );
}
