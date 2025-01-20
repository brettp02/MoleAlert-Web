import Navigation from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import {
    Navbar as NavbarComponent,
    NavbarLeft,
    NavbarRight,
} from "@/components/ui/navbar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import LaunchUI from "@/components/logos/launch-ui";
import Link from "next/link";
import {ModeToggle} from "@/components/ModeToggle";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {UserNav} from "@/components/UserNav";

export default async function Navbar() {
    const {isAuthenticated, getUser} = getKindeServerSession();
    const user = await getUser();


    return (
        <header className="top-0 z-50 -mb-4 px-4 border-b">
            {/*<div className="fade-bottom absolute left-0 h-24 w-full bg-background/15 backdrop-blur-lg"></div>*/}
            <div className="relative mx-auto container">
                <NavbarComponent>
                    <NavbarLeft>
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-2xl font-bold"
                        >
                            <LaunchUI />
                            <span>Mole<span className="text-primary">Alert</span></span>
                        </Link>
                        <Navigation />
                    </NavbarLeft>
                    <NavbarRight>
                        <ModeToggle />

                        {(await isAuthenticated()) ? (
                            <UserNav email={user?.email as string} image={user?.picture as string} name={user?.given_name as string}/>
                        ): (
                            <>
                                <LoginLink>
                                    <Button variant={"ghost"} className="hidden text-sm md:block">
                                        Sign in
                                    </Button>
                                </LoginLink>
                                <RegisterLink>
                                    <Button variant="default">
                                        Get Started
                                    </Button>
                                </RegisterLink>
                            </>
                        )}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="shrink-0 md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <VisuallyHidden>

                            </VisuallyHidden>
                            <SheetContent side="right">
                                <nav className="grid gap-6 text-lg font-medium">
                                    <Link
                                        href="/"
                                        className="flex items-center gap-2 text-xl font-bold"
                                    >
                                        <span>Mole<span className="text-primary">Alert</span></span>
                                    </Link>
                                    <Link
                                        href="/"
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        Getting Started
                                    </Link>
                                    <Link
                                        href="/"
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        Components
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </NavbarRight>
                </NavbarComponent>
            </div>
        </header>
    );
}
