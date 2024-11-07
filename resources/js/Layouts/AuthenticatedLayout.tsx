import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { router } from "@inertiajs/react";
import { Bell, LogOut, Mail } from "lucide-react";
import { ReactNode, useEffect } from "react";
import "preline/preline";
import { IStaticMethods } from "preline/preline";
declare global {
    interface Window {
        HSStaticMethods: IStaticMethods;
    }
}

export default function Authenticated({ children }: { children: ReactNode }) {
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
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center justify-end gap-2 px-4 w-full">
                        <SidebarTrigger className="-ml-1 mr-auto" />

                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Loan pocket co
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        Data Fetching
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <ModeToggle />
                        <Button variant="outline" size="icon">
                            <Bell className="h-[1.2rem] w-[1.2rem] " />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Mail className="h-[1.2rem] w-[1.2rem] " />
                        </Button>
                        <Button
                            onClick={() => router.post(route("logout"))}
                            variant="outline"
                            size="icon"
                        >
                            <LogOut className="h-[1.2rem] w-[1.2rem] " />
                        </Button>
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
