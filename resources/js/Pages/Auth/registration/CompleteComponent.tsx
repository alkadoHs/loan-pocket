import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { router } from "@inertiajs/react";
import confetti from "canvas-confetti";

export function CompleteComponent() {
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
                            onSuccess: handleConfetti
                        })
                    }}
                    type="button"
                    size={"lg"}
                    className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-primary/70 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-primary/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
                >
                    Register your account
                </Button>
            </div>
        </div>
    );
}
