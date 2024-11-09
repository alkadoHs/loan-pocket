import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot, hydrateRoot } from "react-dom/client";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";


const appName = import.meta.env.VITE_APP_NAME || "Mikoposoft";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(el, <App {...props} />);
            return;
        }

        createRoot(el).render(
            <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <App {...props} />

                <Toaster richColors position="top-right" />
            </ThemeProvider>
            </>
        );
    },
    progress: {
        color: "#a78bfa",
    },
});
