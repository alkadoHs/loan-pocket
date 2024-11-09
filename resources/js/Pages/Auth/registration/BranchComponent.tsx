import { getInputProps, useForm } from "@conform-to/react";
import { Input } from "@/components/ui/input";
import { Branch, BranchFormValues, Region } from "../Register";

export function BranchComponent({
    fields,
    regions,
    branch,
}: {
    fields: ReturnType<typeof useForm<BranchFormValues>>[1];
    regions: Region[];
    branch: Branch
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
                    defaultValue={branch?.name}
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
                    htmlFor={fields.name.id}
                    className="block text-sm font-medium text-muted-foreground"
                >
                    Branch Name
                </label>

                <select
                    {...getInputProps(fields.region, { type: "text" })}
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
defaultValue={branch?.region}
                >
                    <option value="">Choose</option>
                    {regions.map((region) => (
                        <option value={region.name}>{region.name}</option>
                    ))}
                </select>
                {fields.region.errors && (
                    <p
                        className="text-sm text-destructive"
                        id={fields.region.errorId}
                    >
                        {fields.region.errors}
                    </p>
                )}
            </div>
        </div>
    );
}