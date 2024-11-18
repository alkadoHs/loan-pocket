import { numberFormat } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export type LoanFeeProps = {
    id: number;
    descrition: string;
    amount: number;
    type: string;
}


export const loanFeeColumns: ColumnDef<LoanFeeProps>[] = [
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
            return (
                <span>
                    {numberFormat(row.original.amount)}
                </span>
            )
        }
    },
    {
        accessorKey: "type",
        header: "Type",
    },
];