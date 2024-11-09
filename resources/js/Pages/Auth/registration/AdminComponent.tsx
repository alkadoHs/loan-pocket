import { getInputProps, useForm } from "@conform-to/react";
import { Input } from "@/components/ui/input";
import { User } from "@/types";
import { AdminFormValues } from "../Register";

export function AdminComponent({
    fields,
    admin
}: {
    fields: ReturnType<typeof useForm<AdminFormValues>>[1];
    admin: User
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
            <div className="space-y-2">
                <label
                    htmlFor={fields.name.id}
                    className="block text-sm font-medium text-muted-foreground"
                >
                    Full Name
                </label>
                <Input
                    {...getInputProps(fields.name, { type: "text" })}
                    className="block w-full p-2 border rounded-md"
                    defaultValue={admin?.name}
                />
                {fields.name.errors && (
                    <p
                        className="text-sm text-destructive"
                        id={fields.name.errorId}
                    >
                        {fields.name.errors}
                    </p>
                )}
            </div>
            <div className="space-y-2">
                <label
                    htmlFor={fields.email.id}
                    className="block text-sm font-medium text-muted-foreground"
                >
                    Email Address
                </label>
                <Input
                    {...getInputProps(fields.email, { type: "text" })}
                    className="block w-full p-2 border rounded-md"
                    defaultValue={admin?.email}
                />
                {fields.email.errors && (
                    <span className="text-sm text-destructive">
                        {fields.email.errors}
                    </span>
                )}
            </div>
            <div className="space-y-2">
                <label
                    htmlFor={fields.phone.id}
                    className="block text-sm font-medium text-muted-foreground"
                >
                    Phone number
                </label>
                <Input
                    {...getInputProps(fields.phone, { type: "text" })}
                    className="block w-full p-2 border rounded-md"
                    defaultValue={admin?.phone}
                />
                {fields.phone.errors && (
                    <span className="text-sm text-destructive">
                        {fields.phone.errors}
                    </span>
                )}
            </div>

            <div className="space-y-2">
                <label
                    htmlFor={fields.password.id}
                    className="block text-sm font-medium text-muted-foreground"
                >
                    Password
                </label>
                <Input
                    {...getInputProps(fields.password, { type: "password" })}
                    className="block w-full p-2 border rounded-md"
                    defaultValue={admin?.password}
                />
                {fields.password.errors && (
                    <span className="text-sm text-destructive">
                        {fields.password.errors}
                    </span>
                )}
            </div>
            <div className="space-y-2">
                <label
                    htmlFor={fields.confirmPassword.id}
                    className="block text-sm font-medium text-muted-foreground"
                >
                    Confirm Password
                </label>
                <Input
                    {...getInputProps(fields.confirmPassword, {
                        type: "password",
                    })}
                    className="block w-full p-2 border rounded-md"
                    defaultValue={admin?.password}
                />
                {fields.confirmPassword.errors && (
                    <span className="text-sm text-destructive">
                        {fields.confirmPassword.errors}
                    </span>
                )}
            </div>
        </div>
    );
}