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

export function CreateLoanProduct() {
    const [open, setOpen] = useState(false);
    const { data, setData, post, reset, processing, errors } = useForm({
        name: "",
        from_amount: "",
        to_amount: "",
        interest: "",
        penalt_type: "",
        penalt_amount: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("loan-products.store"), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success("Loan product created successfully");
            },
            onError: (errors) => {
                toast.error(<pre>
                    {JSON.stringify(errors, null, 2)}
                </pre>);
            },
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
                        <DialogTitle>Create Loan Product</DialogTitle>
                    </DialogHeader>

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
                                    setData("from_amount", e.target.value)
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
                                    setData("to_amount", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.to_amount}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="interest" value="Interest" />

                            <Input
                                id="interest"
                                type="number"
                                className="mt-1 block w-full"
                                value={data.interest}
                                onChange={(e) =>
                                    setData("interest", e.target.value)
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
                                    setData("penalt_amount", e.target.value)
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
            </DialogContent>
        </Dialog>
    );
}
