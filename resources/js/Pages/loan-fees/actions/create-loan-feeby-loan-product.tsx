import InputError from "@/breeze-components/InputError";
import InputLabel from "@/breeze-components/InputLabel";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import { LoanProduct } from "@/Pages/loan-products/columns";

export function CreateLoanFeeByLoanProduct({ loanProduct }: { loanProduct: LoanProduct }) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, reset, processing, errors } = useForm({
        loan_product_id: loanProduct.id,
        description: "",
        type: "",
        amount: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("loan-fee-by-loan-product.store"), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success("Fee created successfully");
            },
            onError: (errors) => {
                toast.error(<pre>{JSON.stringify(errors, null, 2)}</pre>);
            },
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Create loan fee</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        <div>
                            <InputLabel
                                htmlFor="description"
                                value="description"
                            />

                            <Input
                                id="description"
                                type="string"
                                className="mt-1 block w-full"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.amount}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="type" value="Type" />
                            {/* loan fee type| in: "percent_valuee", "money_value" select */}
                            <Select
                                value={data.type}
                                onValueChange={(value) =>
                                    setData("type", value)
                                }
                            >
                                <SelectTrigger className="w-full" id="type">
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem key={'pv'} value="percent_value">
                                            Percent Value
                                        </SelectItem>
                                        <SelectItem key={'mv'} value="money_value">
                                            Money Value
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                className="mt-2"
                                message={errors.type}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="amount" value="Amount" />

                            <Input
                                id="amount"
                                type="number"
                                className="mt-1 block w-full"
                                value={data.amount}
                                onChange={(e) =>
                                    setData("amount", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.amount}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={processing}>
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
