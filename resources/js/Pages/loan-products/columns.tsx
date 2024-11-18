
import { numberFormat } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table'
import { Eye } from 'lucide-react';
import { LoanFeeProps } from '../loan-fees/columns';
export interface LoanProduct {
    id: number;
    name: string;
    from_amount: number;
    to_amount: number;
    interest: number;
    penalt_type: string;
    penalt_amount: number;
    loan_fees_by_loan_product: LoanFeeProps[];
}

export const loanProductColumns: ColumnDef<LoanProduct>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'from_amount',
        header: 'Minimum Amount',
        cell: ({ row }) => {
            return (
                    <span>{numberFormat(row.original.from_amount)}</span>
            )
        }
    },
    {
        accessorKey: 'to_amount',
        header: 'Maximum Amount',
        cell: ({ row }) => {
            return (
                    <span>{numberFormat(row.original.to_amount)}</span>
            )
        }
    },
    {
        accessorKey: 'interest',
        header: 'Interest',
    },
    {
        accessorKey: 'penalt_type',
        header: 'Penalt Type',
    },
    {
        accessorKey: 'penalt_amount',
        header: 'Penalt Amount',
        cell: ({ row }) => {
            return (
                    <span>{numberFormat(row.original.penalt_amount)}</span>
            )
        }
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-x-2">
                    <Link
                        href={route('loan-products.edit', row.original.id)}
                        className="text-blue-500 hover:text-cyan-600 flex items-center gap-x-1"
                    >
                        <Eye className="w-4 h-4" />
                        <span>view</span>
                    </Link>
                </div>
            )
        },
    }
]