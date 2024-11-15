import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { CreateShareholder } from "./actions/create-shareholder";
import { DeleteShareholder } from "./actions/delete-shareholder";
import { EditShareholder } from "./actions/edit-shareholder";
import { Card } from "@/components/ui/card";

export interface Shareholder {
    id: number;
    name: string;
    phone: string;
    email: string;
    gender: string;
}

const ShareHolders = ({ shareholders }: { shareholders: Shareholder[] }) => {
    return (
        <Authenticated>
            <Head title="Shareholders" />

            <section className="p-4">
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="text-2xl font-bold">Shareholders</h1>
                    
                    <div className="">
                        <CreateShareholder />
                    </div>
                </div>

                <Card className="overflow-x-auto whitespace-nowrap">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>S/N</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {shareholders.map((shareholder, index) => (
                                <TableRow key={shareholder.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{shareholder.name}</TableCell>
                                    <TableCell>{shareholder.phone}</TableCell>
                                    <TableCell>{shareholder.email}</TableCell>
                                    <TableCell>{shareholder.gender}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <EditShareholder shareholder={shareholder} />
                                            <DeleteShareholder shareholder={shareholder} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </section>
        </Authenticated>
    );
};

export default ShareHolders;
