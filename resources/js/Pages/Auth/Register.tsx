import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import * as React from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { defineStepper } from "@stepperize/react";
import { BranchComponent } from "./registration/BranchComponent";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { AdminComponent } from "./registration/AdminComponent";
import { CompanyComponent } from "./registration/CompanyComponent";
import { CompleteComponent } from "./registration/CompleteComponent";
import Guest from "@/Layouts/GuestLayout";
import { User } from "@/types";

export interface Region {
    id: number;
    name: string;
}

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
    region: z.string().min(2),
});

export type AdminFormValues = z.infer<typeof adminSchema>;
export type CompanyFormValues = z.infer<typeof companySchema>;
export type BranchFormValues = z.infer<typeof branchSchema>;

const { useStepper, steps } = defineStepper(
    { id: "admin", label: "Admin", schema: adminSchema },
    { id: "company", label: "Company", schema: companySchema },
    { id: "branch", label: "Branch", schema: branchSchema },
    { id: "complete", label: "Complate", schema: z.object({}) }
);

export interface Company {
    name: string;
    phone: string;
    address: string;
}

export interface Branch {
    id: number;
    name: string;
    region: string;
}

function Register({
    regions,
    admin,
    company,
    branch,
}: {
    regions: Region[];
    admin: User;
    company: Company;
    branch: Branch;
}) {
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

            switch (stepper.current.id) {
                case "admin":
                    router.post(route("adminData"), submission?.payload, {
                        onSuccess: () =>
                            toast.success("Admin data saved successfully."),
                        preserveState: true,
                    });
                    break;
                case "branch":
                    router.post(route("branchData"), submission?.payload, {
                        onSuccess: () =>
                            toast.success("Branch data aved successfully."),
                        preserveState: true,
                    });
                    break;
                default:
                    router.post(route("companyData"), submission?.payload, {
                        onSuccess: () =>
                            toast.success("Company data saved successfully."),
                        preserveState: true,
                    });
                    break;
            }
            if (stepper.isLast) {
                stepper.reset();
            } else {
                stepper.next();
            }
        },
    });

    return (
        <Guest>
            <form
                method="post"
                {...getFormProps(form)}
                className="space-y-6 p-6 rounded-lg w-full min-h-96"
            >
                <div id={form.errorId}>{form.errors}</div>
                <div className="flex justify-between">
                    <h2 className="text-3xl font-medium">
                        Account Registration
                    </h2>
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
                                admin={admin}
                            />
                        ),
                        company: () => (
                            <CompanyComponent company={company}
                                fields={
                                    fields as ReturnType<
                                        typeof useForm<CompanyFormValues>
                                    >[1]
                                }
                            />
                        ),
                        branch: () => (
                            <BranchComponent branch={branch}
                                fields={
                                    fields as ReturnType<
                                        typeof useForm<BranchFormValues>
                                    >[1]
                                }
                                regions={regions}
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
                            <Button>
                                {stepper.isLast ? "Complete" : "Next"}
                            </Button>
                        </div>
                    ) : (
                        <Button type="button" onClick={stepper.reset}>
                            Back
                        </Button>
                    )}
                </div>
            </form>
        </Guest>
    );
}

export default Register;
