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
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Shareholder } from "@/Pages/shareholders/Index";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import { Capital } from "../Index";
import { Edit } from "lucide-react";

export function EditCapital({
    shareholders,
    capital,
}: {
    shareholders: Shareholder[];
    capital: Capital;
}) {
    const [open, setOpen] = useState(false);
    const { data, setData, patch, reset, processing, errors } = useForm({
        ...capital,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        patch(route("capitals.update", capital.id), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success("Capital updated successfully");
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={"icon"} variant={'secondary'}>
                    <Edit className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Update Capital</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        <div>
                            <InputLabel
                                htmlFor="share_holder_id"
                                value="Shareholder"
                            />

                            <Select
                                onValueChange={(value) =>
                                    setData("share_holder_id", value as any)
                                }
                                value={data.share_holder_id.toString()}
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
                                    setData("amount", e.target.value as any)
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
