import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { Branch } from '../Auth/Register';
import { Capital } from '../capitals/Index';

interface Floti {
    id: number;
    to_branch: Branch;
    capital: Capital;
    amount: number;
    withdraw_charges: number;
}

const Flots = () => {
  return (
    <Authenticated>
        <Head title='Floats' />

        <section className='p-4'>
            Flots page
        </section>
    </Authenticated>
  )
}

export default Flots