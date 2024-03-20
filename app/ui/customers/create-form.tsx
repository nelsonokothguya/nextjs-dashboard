import { useFormState } from 'react-dom';
import { Customer } from '../../lib/definitions';
import Link from 'next/link';
import { Button } from '../button';

export default function Form({ customers }: { customers: Customer[] }) {
  return (
    <div>
      <p>Provide Customer Details</p>
      <Button>Submit</Button>
    </div>
  );
}
