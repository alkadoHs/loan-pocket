import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";

export function CreateShareholder() {
    const [open, setOpen] = useState(false);
    const { data, setData, post, reset, progress, errors } = useForm({
        name: "",
        phone: "",
        email: "",
        gender: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("shareholders.store"), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success("Shareholder created successfully");
            },
        });

    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create Shareholder</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Create Shareholder</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                autoFocus
                                autoComplete="name"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.email}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="phone" value="Phone" />

                            <Input
                                id="phone"
                                type="number"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.phone}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="gender" value="Gender" />

                            <Select onValueChange={(value) => setData("gender", value)} value={data.gender}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="male">
                                            Male
                                        </SelectItem>
                                        <SelectItem value="female">
                                            Female
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <InputError className="mt-2" message={errors.gender} />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
