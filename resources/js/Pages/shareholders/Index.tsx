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
import { Head, Link } from "@inertiajs/react";
import React from "react";
import { CreateShareholder } from "./actions/create-shareholder";

interface Shareholder {
    id: number;
    name: string;
    phone: string;
    email: string;
    gender: "male" | "female";
}

const ShareHolders = ({ shareholders }: { shareholders: Shareholder[] }) => {
    return (
        <Authenticated>
            <Head title="Shareholders" />

            <section className="p-4">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Shareholders</h1>

                    <div className="">
                        <CreateShareholder />
                    </div>
                </div>

                <div className="overflow-x-auto bg-muted whitespace-nowrap">
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>
        </Authenticated>
    );
};

export default ShareHolders;
