import InputLabel from "@/breeze-components/InputLabel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import React from "react";
import { LoanProduct } from "./columns";
import { toast } from "sonner";
import InputError from "@/breeze-components/InputError";
import { DialogFooter } from "@/components/ui/dialog";
import {
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import EmptyPlaceholder from "@/components/empty-placeholder";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftCircle } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { loanFeeColumns, LoanFeeProps } from "../loan-fees/columns";
import { CreateLoanFeeByLoanProduct } from "../loan-fees/actions/create-loan-feeby-loan-product";

const EditLoanProduct = ({ loanProduct, loanFees }: { loanProduct: LoanProduct, loanFees: LoanFeeProps[] }) => {
    const { data, setData, patch, reset, processing, errors } = useForm({
        ...loanProduct,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        patch(route("loan-products.update", loanProduct.id), {
            onSuccess: () => {
                toast.success("Loan product updated successfully");
            },
            onError: (errors) => {
                reset();
                toast.error(<pre>{JSON.stringify(errors, null, 2)}</pre>);
            },
        });
    };

    return (
        <Authenticated>
            <Head title="Edit Loan Product" />

            <section className="md:p-4 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <div className="flex justify-between items-center">
                                <span>{loanProduct.name.toUpperCase()}</span>
                                <Button size={"sm"} onClick={() => router.visit(route("loan-products.index"))}>
                                    <ArrowLeftCircle className="size-4 mr-1"/> Back</Button>
                            </div>
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>
                            Update - {loanProduct.name.toString()}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <Input
                                        id="name"
                                        type="string"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="from_amount"
                                        value="Minimum Amount"
                                    />

                                    <Input
                                        id="from_amount"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.from_amount}
                                        onChange={(e) =>
                                            setData(
                                                "from_amount",
                                                parseInt(e.target.value)
                                            )
                                        }
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.from_amount}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="to_amount"
                                        value="Maximum Amount"
                                    />

                                    <Input
                                        id="to_amount"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.to_amount}
                                        onChange={(e) =>
                                            setData(
                                                "to_amount",
                                                parseInt(e.target.value)
                                            )
                                        }
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.to_amount}
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="interest"
                                        value="Interest"
                                    />

                                    <Input
                                        id="interest"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.interest}
                                        onChange={(e) =>
                                            setData(
                                                "interest",
                                                parseInt(e.target.value)
                                            )
                                        }
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.interest}
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="penalt_type"
                                        value="To Branch"
                                    />

                                    <Select
                                        onValueChange={(value) =>
                                            setData("penalt_type", value)
                                        }
                                        value={data.penalt_type}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select branch" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem
                                                    key={"money_value"}
                                                    value={"money_value"}
                                                >
                                                    Money value
                                                </SelectItem>
                                                <SelectItem
                                                    key={"percentage"}
                                                    value={"percentage_value"}
                                                >
                                                    Percentage value
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    <InputError
                                        className="mt-2"
                                        message={errors.penalt_type}
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="penalt_amount"
                                        value="Penalt Amount"
                                    />

                                    <Input
                                        id="penalt_amount"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.penalt_amount}
                                        onChange={(e) =>
                                            setData(
                                                "penalt_amount",
                                                parseInt(e.target.value)
                                            )
                                        }
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.penalt_amount}
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button type="submit" disabled={processing}>
                                    Save changes
                                </Button>
                            </DialogFooter>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Loan Fees</span>
                            <CreateLoanFeeByLoanProduct loanProduct={loanProduct} />
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <DataTable columns={loanFeeColumns} data={loanFees} />
                    </CardContent>
                </Card>
            </section>
        </Authenticated>
    );
};

export default EditLoanProduct;
