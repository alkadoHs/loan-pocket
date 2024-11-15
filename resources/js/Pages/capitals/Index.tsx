import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { CreateShareholder } from '../shareholders/actions/create-shareholder';
import { Shareholder } from '../shareholders/Index';
import EmptyPlaceholder from '@/components/empty-placeholder';
import { numberFormat } from '@/lib/utils';
import { CreateCapital } from './actions/create-capital';
import { EditCapital } from './actions/edit-capital';
import { DeleteCapital } from './actions/delete-capital';

export interface Capital {
    id: number;
    share_holder_id: number;
    share_holder: Shareholder;
    type: string;
    amount: number;
    principal: number;
    loan_amount: number;
    loan_term: number;
    institution_name: string;
}
const Capitals = ({ capitals, shareholders }: { capitals: Capital[], shareholders: Shareholder[] }) => {
  return (
    <Authenticated>
        <Head title='Capitals' />

        <section className="p-4">
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="text-2xl font-bold">Capitals</h1>
                    
                    <div className="">
                        <CreateCapital shareholders={shareholders} />
                    </div>
                </div>

                <Card className="overflow-x-auto whitespace-nowrap">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>S/N</TableHead>
                                <TableHead>Shareholder</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Principal</TableHead>
                                <TableHead>Loan Amount</TableHead>
                                <TableHead>Loan Term</TableHead>
                                <TableHead>Institution</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {capitals.length && capitals.map((capital, index) => (
                                <TableRow key={capital.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{capital.share_holder.name}</TableCell>
                                    <TableCell>{capital.type}</TableCell>
                                    <TableCell>{numberFormat(Number(capital.amount))}</TableCell>
                                    <TableCell>{numberFormat(Number(capital.principal))}</TableCell>
                                    <TableCell>{numberFormat(Number(capital.loan_amount))}</TableCell>
                                    <TableCell>{Number(capital.loan_term)}</TableCell>
                                    <TableCell>{capital.institution_name}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <EditCapital capital={capital} shareholders={shareholders} />
                                            {/* <DeleteCapital capital={capital} /> */}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {!capitals.length && ( <EmptyPlaceholder /> )}
                </Card>
            </section>
    </Authenticated>
  )
}

export default Capitals