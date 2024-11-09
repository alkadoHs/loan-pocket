import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface Region {
    id: number;
    name: string;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function numberFormat(num: number) {
    return Intl.NumberFormat().format(num);
}

export const transformRegionsToOptions = (regions: Region[]) => {
    return regions.map((region) => ({
        value: region.name,
        label: region.name,
    }));
};

export function dateFormat(date: string) {
    return dayjs(date).format("DD/MM/YYYY");
}

export function dateFormatFilter(date: string) {
    return dayjs(date).format("YYYY-MM-DD");
}
