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
import { Shareholder } from "@/Pages/shareholders/Index";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";

export function CreateCapital({
    shareholders,
}: {
    shareholders: Shareholder[];
}) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, reset, processing, errors } = useForm({
        share_holder_id: "",
        amount: "",
        type: "",
        principal: "0",
        loan_amount: "0",
        loan_term: "0",
        institution_name: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("capitals.store"), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success("Capital created successfully");
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create capital</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Create Capital</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        <div>
                            <InputLabel
                                htmlFor="share_holder_id"
                                value="Shareholder"
                            />

                            <Select
                                onValueChange={(value) =>
                                    setData("share_holder_id", value)
                                }
                                value={data.share_holder_id}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select shareholder" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {shareholders.map((shareholder) => (
                                            <SelectItem
                                                key={shareholder.id}
                                                value={shareholder.id.toString()}
                                            >
                                                {shareholder.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <InputError
                                className="mt-2"
                                message={errors.share_holder_id}
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="amount"
                                value="Capital Amount"
                            />

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
