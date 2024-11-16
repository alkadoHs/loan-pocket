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
import { paymentMethod } from "@/Pages/paymentMethods/Index";
import { Branch } from "@/Pages/Auth/Register";
import { DialogDescription } from "@radix-ui/react-dialog";
import { numberFormat } from "@/lib/utils";

export function CreateFloti({
    paymentMethods,
    branches,
    capital,
}: {
    paymentMethods: paymentMethod[];
    branches: Branch[];
    capital: number;
}) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, reset, processing, errors } = useForm({
        to_branch_id: "",
        payment_method_id: "",
        amount: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("flotis.store"), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success("Float created successfully");
            },
            onError: (errors) => {
                toast.error(errors.error);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create float</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogDescription className="text-center text-green-500">
                    {" "}
                    The current capital is{" "}
                    <b className="text-primary">{numberFormat(capital)}</b>
                </DialogDescription>
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Create float</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        <div>
                            <InputLabel htmlFor="branch_id" value="To Branch" />

                            <Select
                                onValueChange={(value) =>
                                    setData("to_branch_id", value)
                                }
                                value={data.to_branch_id}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select branch" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {branches.map((branch) => (
                                            <SelectItem
                                                key={branch.id}
                                                value={branch.id.toString()}
                                            >
                                                {branch.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <InputError
                                className="mt-2"
                                message={errors.to_branch_id}
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="payment_method_id"
                                value="Payment method"
                            />

                            <Select
                                onValueChange={(value) =>
                                    setData("payment_method_id", value)
                                }
                                value={data.payment_method_id}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select payment" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {paymentMethods.map((payment) => (
                                            <SelectItem
                                                key={payment.id}
                                                value={payment.id.toString()}
                                            >
                                                {payment.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <InputError
                                className="mt-2"
                                message={errors.payment_method_id}
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
