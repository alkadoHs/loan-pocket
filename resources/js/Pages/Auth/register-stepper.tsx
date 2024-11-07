import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import * as React from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { defineStepper } from "@stepperize/react";
import { Region } from "./Register";

const adminSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z
            .string()
            .email("Invalid email format")
            .min(1, "Email is required"),
        phone: z.string().min(10, "Phone number is required"),
        password: z.string().min(6, "Password length must be greater than 6"),
        confirmPassword: z.string().min(6, "Password confirmation required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

const companySchema = z.object({
    name: z.string().min(5, "Company name is required"),
    address: z.string().min(5, "Company address is required"),
    phone: z.string().min(10, "Company phone is required"),
});

const branchSchema = z.object({
    name: z.string().min(3, "Branch name is required"),
});

type AdminFormValues = z.infer<typeof adminSchema>;
type CompanyFormValues = z.infer<typeof companySchema>;
type BranchFormValues = z.infer<typeof branchSchema>;

const { useStepper, steps } = defineStepper(
    { id: "admin", label: "Admin", schema: adminSchema },
    { id: "company", label: "Company", schema: companySchema },
    { id: "branch", label: "Branch", schema: branchSchema },
    { id: "complete", label: "Complate", schema: z.object({}) }
);

function RegisterStepper({ regions }: { regions: Region[] }) {
    const stepper = useStepper();
    const [form, fields] = useForm({
        id: "checkout",
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
        constraint: getZodConstraint(stepper.current.schema),
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: stepper.current.schema });
        },
        onSubmit(event, { submission }) {
            event.preventDefault();
            // biome-ignore lint/suspicious/noConsoleLog: <We want to log the form values>
            console.log(
                `Form values for step ${stepper.current.id}:`,
                submission
            );
            if (stepper.isLast) {
                stepper.reset();
            } else {
                stepper.next();
            }
        },
    });

    return (
        <form
            method="post"
            {...getFormProps(form)}
            className="space-y-6 p-6 rounded-lg w-full min-h-96"
        >
            <div id={form.errorId}>{form.errors}</div>
            <div className="flex justify-between">
                <h2 className="text-3xl font-medium">Account Registration</h2>
                <div className="items-center gap-2 hidden md:flex">
                    <span className="text-sm text-muted-foreground">
                        Step {stepper.current.index + 1} of {steps.length}
                    </span>
                </div>
            </div>
            <nav aria-label="Checkout Steps" className="group my-4">
                <ol
                    className="flex items-center justify-between gap-2"
                    aria-orientation="horizontal"
                >
                    {stepper.all.map((step, index, array) => (
                        <React.Fragment key={step.id}>
                            <li className="flex items-center gap-4 flex-shrink-0">
                                <Button
                                    type="button"
                                    role="tab"
                                    variant={
                                        index <= stepper.current.index
                                            ? "default"
                                            : "secondary"
                                    }
                                    aria-current={
                                        stepper.current.id === step.id
                                            ? "step"
                                            : undefined
                                    }
                                    aria-posinset={index + 1}
                                    aria-setsize={steps.length}
                                    aria-selected={
                                        stepper.current.id === step.id
                                    }
                                    className="flex size-10 items-center justify-center rounded-full"
                                    onClick={() => stepper.goTo(step.id)}
                                >
                                    {index + 1}
                                </Button>
                                <span className="text-sm font-medium hidden md:inline">
                                    {step.label}
                                </span>
                            </li>
                            {index < array.length - 1 && (
                                <Separator
                                    className={`flex-1 ${
                                        index < stepper.current.index
                                            ? "bg-primary"
                                            : "bg-muted"
                                    }`}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </ol>
            </nav>
            <div className="space-y-4">
                {stepper.switch({
                    admin: () => (
                        <AdminComponent
                            fields={
                                fields as ReturnType<
                                    typeof useForm<AdminFormValues>
                                >[1]
                            }
                        />
                    ),
                    company: () => (
                        <CompanyComponent
                            fields={
                                fields as ReturnType<
                                    typeof useForm<CompanyFormValues>
                                >[1]
                            }
                            regions={regions}
                        />
                    ),
                    branch: () => (
                        <BranchComponent
                            fields={
                                fields as ReturnType<
                                    typeof useForm<BranchFormValues>
                                >[1]
                            }
                        />
                    ),
                    complete: () => <CompleteComponent />,
                })}
                {!stepper.isLast ? (
                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={stepper.prev}
                            disabled={stepper.isFirst}
                        >
                            Back
                        </Button>
                        <Button>{stepper.isLast ? "Complete" : "Next"}</Button>
                    </div>
                ) : (
                    <Button type="button" onClick={stepper.reset}>
                        Reset
                    </Button>
                )}
            </div>
        </form>
    );
}

function AdminComponent({
    fields,
}: {
    fields: ReturnType<typeof useForm<AdminFormValues>>[1];
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

function CompanyComponent({
    fields,
    regions,
}: {
    fields: ReturnType<typeof useForm<CompanyFormValues>>[1];
    regions: Region[];
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
                />
                {fields.phone.errors && (
                    <span className="text-sm text-destructive">
                        {fields.phone.errors}
                    </span>
                )}
            </div>

            <select
                data-hs-select='{
  "hasSearch": true,
  "searchPlaceholder": "Search...",
  "searchClasses": "block w-full text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 py-2 px-3",
  "searchWrapperClasses": "bg-white p-2 -mx-1 sticky top-0 dark:bg-neutral-900",
  "placeholder": "Select country...",
  "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span class=\"me-2\" data-icon></span><span class=\"text-gray-800 dark:text-neutral-200 \" data-title></span></button>",
  "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600",
  "dropdownClasses": "mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
  "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
  "optionTemplate": "<div><div class=\"flex items-center\"><div class=\"me-2\" data-icon></div><div class=\"text-gray-800 dark:text-neutral-200 \" data-title></div></div></div>",
  "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
}'
            
            >
                <option value="">Choose</option>
                {regions.map((region) => (
                    <option value={region.name}>{region.name}</option>
                ))}
            </select>
        </div>
    );
}

function BranchComponent({
    fields,
}: {
    fields: ReturnType<typeof useForm<BranchFormValues>>[1];
}) {
    return (
        <div className="space-y-4 text-start">
            <div className="space-y-2">
                <label
                    htmlFor={fields.name.id}
                    className="block text-sm font-medium text-muted-foreground"
                >
                    Branch Name
                </label>
                <Input
                    {...getInputProps(fields.name, { type: "text" })}
                    className="block w-full p-2 border rounded-md"
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
        </div>
    );
}

function CompleteComponent() {
    return (
        <div className="text-center">
            Congraturation, now your software is ready.
        </div>
    );
}

export default RegisterStepper;
