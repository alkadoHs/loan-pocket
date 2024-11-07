import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, router } from '@inertiajs/react';
import { PropsWithChildren, useEffect } from 'react';

import "preline/preline";
import { IStaticMethods } from "preline/preline";
declare global {
    interface Window {
        HSStaticMethods: IStaticMethods;
    }
}

export default function Guest({ children }: PropsWithChildren) {
    useEffect(() => {
        // Initialize on first load
        window.HSStaticMethods.autoInit();

        // Set up a listener for Inertia navigations
        const handleNavigation = () => {
            window.HSStaticMethods.autoInit();
        };

        router.on("start", (event) => {
            handleNavigation;
        });

        // Clean up the listener on component unmount
        return () => {
            router.cancel();
        };
    }, []);
    
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
