import { DataTable } from "@/components/data-table";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow } from "@/components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { LoanProduct, loanProductColumns } from "./columns";
import { CreateLoanProduct } from "./actions/create-loanproduuct";


const LoanProducts = ({ loanProducts }: { loanProducts: LoanProduct[] }) => {
    return (
        <Authenticated>
            <Head title="Loan product" />

            <section className="p-4">
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="text-2xl font-bold">Loan Products</h1>

                    <div className="">
                        <CreateLoanProduct />
                    </div>
                </div>

                <DataTable columns={loanProductColumns} data={loanProducts} />
            </section>
            
        </Authenticated>
    );
};

export default LoanProducts;
