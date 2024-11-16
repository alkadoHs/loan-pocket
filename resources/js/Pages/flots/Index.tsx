import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Branch } from "../Auth/Register";
import { paymentMethod } from "../paymentMethods/Index";
import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { dateFormat, numberFormat } from "@/lib/utils";
import EmptyPlaceholder from "@/components/empty-placeholder";
import { CreateCapital } from "../capitals/actions/create-capital";
import { CreateFloti } from "./actions/create-floti";

export interface Floti {
    id: number;
    to_branch: Branch;
    payment_method: paymentMethod;
    amount: number;
    created_at: string;
}

const Flots = ({
    flotis,
    paymentMethods,
    branches,
    capital,
}: {
    flotis: Floti[];
    paymentMethods: paymentMethod[];
    branches: Branch[];
    capital: number;
}) => {
    return (
        <Authenticated>
            <Head title="Floats" />

            <section className="p-4">
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="text-2xl font-bold">Floats</h1>

                    <div className="">
                        {/* <CreateCapital shareholders={shareholders} /> */}
                        <CreateFloti
                            paymentMethods={paymentMethods}
                            branches={branches}
                            capital={capital}
                        />
                    </div>
                </div>

                <Card className="overflow-x-auto whitespace-nowrap">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>S/N</TableHead>
                                <TableHead>To Branch</TableHead>
                                <TableHead>Payment Method</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {flotis.map((floti, index) => (
                                <TableRow key={floti.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        {floti.to_branch.name}
                                    </TableCell>
                                    <TableCell>
                                        {floti.payment_method.name}
                                    </TableCell>
                                    <TableCell>
                                        {numberFormat(floti.amount)}
                                    </TableCell>
                                    <TableCell>
                                        {dateFormat(floti.created_at)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {!flotis.length && <EmptyPlaceholder />}
                </Card>
            </section>
        </Authenticated>
    );
};

export default Flots;
