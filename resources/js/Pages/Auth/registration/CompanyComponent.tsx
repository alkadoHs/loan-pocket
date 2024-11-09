import { getInputProps, useForm } from "@conform-to/react";
import { Input } from "@/components/ui/input";
import { Company, CompanyFormValues } from "../Register";

export function CompanyComponent({
    fields,
    company
}: {
    fields: ReturnType<typeof useForm<CompanyFormValues>>[1];
    company: Company
}) {
    return (
        <div className="space-y-4 text-start">
            <div className="space-y-2">
                <label
                    htmlFor={fields.name.id}
                    className="block text-sm font-medium text-muted-foreground"
                >
                    Company Name
                </label>
                <Input
                    {...getInputProps(fields.name, { type: "text" })}
                    className="block w-full p-2 border rounded-md"
                    defaultValue={company?.name}
                />
                {fields.name.errors && (
                    <span className="text-sm text-destructive">
                        {fields.name.errors}
                    </span>
                )}
            </div>
            <div className="space-y-2">
                <label
                    htmlFor={fields.address.id}
                    className="block text-sm font-medium text-muted-foreground"
                >
                    Address
                </label>
                <Input
                    {...getInputProps(fields.address, { type: "text" })}
                    className="block w-full p-2 border rounded-md"
                    defaultValue={company?.address}
                />
                {fields.address.errors && (
                    <span className="text-sm text-destructive">
                        {fields.address.errors}
                    </span>
                )}
            </div>
            <div className="space-y-2">
                <label
                    htmlFor={fields.phone.id}
                    className="block text-sm font-medium text-muted-foreground"
                >
                    phone
                </label>
                <Input
                    {...getInputProps(fields.phone, { type: "text" })}
                    className="block w-full p-2 border rounded-md"
                    defaultValue={company?.phone}
                />
                {fields.phone.errors && (
                    <span className="text-sm text-destructive">
                        {fields.phone.errors}
                    </span>
                )}
            </div>
        </div>
    );
}