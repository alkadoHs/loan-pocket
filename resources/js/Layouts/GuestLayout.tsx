import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, router } from '@inertiajs/react';
import { PropsWithChildren, useEffect } from 'react';

import "preline/preline";

export default function Guest({ children }: PropsWithChildren) {
    
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-zinc-900">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="mt-4 w-full overflow-hidden bg-white py-4 shadow-md sm:max-w-6xl sm:rounded-lg dark:bg-zinc-950">
                {children}
            </div>
        </div>
    );
}
