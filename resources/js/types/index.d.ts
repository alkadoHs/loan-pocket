import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    email_verified_at?: string;
    password: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
