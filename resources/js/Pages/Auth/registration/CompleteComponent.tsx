import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { router } from "@inertiajs/react";
import confetti from "canvas-confetti";
import { Loader } from "lucide-react";
import { useState } from "react";

export function CompleteComponent() {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    const words =
        "Congraturation! Your accouunt is ready, Now complete by clicking the button below.";
    return (
        <div className="text-center">
            <TextGenerateEffect duration={2} words={words} />

            <div className="w-full flex justify-center my-6">
                <Button
                    onClick={() => {
                        router.post('register', {}, {
                            onSuccess: handleConfetti,
                            onStart: () => setIsLoading(true),
                            onFinish: () => setIsLoading(false)
                        })
                    }}
                    type="button"
                    size={"lg"}
                    disabled={isLoading}
                    className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-primary/70 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-primary/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
                >
                    {isLoading && <Loader className="size-5 animate-spin mr-2 stroke-amber-500" />}
                    {isLoading ? "Creating account...": "Register your account"}
                </Button>
            </div>
        </div>
    );
}
