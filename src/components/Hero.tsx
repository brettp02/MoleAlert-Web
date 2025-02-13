"use client";

import { Button } from "@/components/ui/button";
import Github from "@/components/logos/github";
import Link from "next/link";
import {RegisterLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Hero() {

    return (
        <section className="fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0">
            <div className="mx-auto flex container flex-col gap-12 pt-16 sm:gap-24">
                <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
                    <h1 className="relative z-10 inline-block animate-appear bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
                        Use AI to detect malignant moles
                    </h1>
                    <p className="text-md relative z-10 max-w-[550px] animate-appear font-medium text-muted-foreground delay-100 sm:text-xl">
                        Our computer vision model accurately classifies benign and malignant moles.
                    </p>
                        <div className="relative z-10 flex  justify-center gap-4">
                            <RegisterLink>
                                <Button variant="default" size="lg">
                                    Get Started
                                </Button>
                            </RegisterLink>

                            <Button variant="glow" size="lg" asChild>
                                <Link href="https://github.com/brettp02/MoleAlert-Web">
                                    <Github className="mr-2 h-4 w-4"/> Github
                                </Link>
                            </Button>
                        </div>
                </div>
            </div>

        </section>
    );
}
