import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { Capital } from "../Index";

export function DeleteCapital({
    capital,
}: {
    capital: Capital;
}) {
    const [open, setOpen] = useState(false);
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size={"icon"}>
                    <Trash2 className="size-5" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">
                        Delete this capital ?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        This action will permanently delete the capital
                        . Do you want to proceed?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-center gap-3">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        No, keep it
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            router.delete(
                                route("capitals.destroy", capital.id),
                                {
                                    onSuccess: () => {
                                        setOpen(false);
                                        toast.success(
                                            "Capital deleted successfully"
                                        );
                                    },
                                }
                            );
                        }}
                    >
                        Yes, delete it
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}
