import InputError from "@/breeze-components/InputError";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Fragment, useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";
import { loanFeeColumns, LoanFeeProps } from "./columns";
import { LoanProduct } from "../loan-products/columns";
import { CreateLoanFeeByGeneral } from "./actions/create-loan-feeby-general";
import { CreateLoanFeeByLoanProduct } from "./actions/create-loan-feeby-loan-product";

export interface LoanFee {
    id: number;
    type: string;
    loan_fees_by_general: LoanFeeProps[];
    loan_fees_by_loan_product: LoanFeeProps[];
    created_at: string;
}

const LoanFees = ({
    loanFee,
    loanProducts,
}: {
    loanFee: LoanFee;
    loanProducts: LoanProduct[];
}) => {
    const [feeType, setFeeType] = useState<string>(loanFee.type);

    const saveLoanType = useDebouncedCallback((value: string) => {
        setFeeType(value);

        if (loanFee) {
            //update
            router.patch(
                route("loan-fees.update", loanFee.id),
                { type: value },
                {
                    onSuccess: () => {
                        toast.success("Loan Fee type updated successfully");
                    },
                    onError: () => {
                        toast.error("Something went wrong");
                    },
                }
            );
        } else
            router.post(
                route("loan-fees.store"),
                { type: value },
                {
                    onSuccess: () => {
                        toast.success("Loan Fee type created successfully");
                    },
                    onError: () => {
                        toast.error("Something went wrong");
                    },
                }
            );
    }, 1000);

    console.log(loanFee);

    return (
        <Authenticated>
            <Head title="Loan Fees" />

            <section className="md:p-4 space-y-6">
                <div className="mb-6 px-4 md:p-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="text-2xl font-bold">Loan Fees</h1>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Loan Fee type</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Select onValueChange={saveLoanType} value={feeType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a fee type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    key={"by_general"}
                                    value="by_general"
                                >
                                    Loan fee by General
                                </SelectItem>
                                <SelectItem
                                    key={"by_loan_product"}
                                    value="by_loan_product"
                                >
                                    Loan fee by Loan Product
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                {feeType == "by_general" ? (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Loan Fees by General</span>
                                <CreateLoanFeeByGeneral loanFee={loanFee} />
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <DataTable
                                columns={loanFeeColumns}
                                data={loanFee.loan_fees_by_general}
                            />
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Loan Fees By Loan Product</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {loanProducts.map((loanProduct, index) => (
                                <ol
                                    key={loanProduct.id}
                                    className="list-disc list-inside"
                                >
                                    <li className="text-lg  mb-2  flex gap-3 items-center justify-between flex-wrap">
                                        <span>{loanProduct.name}</span>
                                        <CreateLoanFeeByLoanProduct
                                            loanProduct={loanProduct}
                                        />
                                    </li>
                                    <DataTable
                                        columns={loanFeeColumns}
                                        data={
                                            loanProduct.loan_fees_by_loan_product
                                        }
                                    />
                                </ol>
                            ))}
                        </CardContent>
                    </Card>
                )}
            </section>
        </Authenticated>
    );
};

export default LoanFees;
