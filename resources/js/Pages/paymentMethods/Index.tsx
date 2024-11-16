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

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label"
import { useState } from "react";

export interface paymentMethod {
    id: number;
    name: string;
}

function paymentMethods () {


    const[selectIndex , setSelectedIndex] = useState(false)

    const payments = [
        'CASH',
        'M-PESA',
        'AIRTEL MONEY',
        'HALOPESA',
        'TIGO-PESA',
        'NMB',
        'CRDB',
        'NBC'
        
    ]

    return (
        <Authenticated>
            <Head title="paymentMethods" />

            <section className="p-4">
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="text-2xl font-bold">Transactions Accounts</h1>
                    
                    
                </div>

                <Card className="overflow-x-auto whitespace-nowrap">
                <div className="grid grid-cols-4 gap-3">
                {payments.map((payment, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 border rounded-md">
                                <Switch id={`payment-${index}`} />
                                <Label htmlFor={`payment-${index}`}>{payment}</Label>
                            </div>
                        ))}
      
    </div>
                </Card>
            </section>
        </Authenticated>
    );
};

export default paymentMethods;
