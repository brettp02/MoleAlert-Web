import Navigation from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import {
    Navbar as NavbarComponent,
    NavbarLeft,
    NavbarRight,
} from "@/components/ui/navbar";
import LaunchUI from "@/components/logos/launch-ui";
import Link from "next/link";
import {ModeToggle} from "@/components/ModeToggle";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {UserNav} from "@/components/UserNav";
import {ScanFace} from "lucide-react";

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
                            <ScanFace className={"text-primary/75"}/>
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
                                    <Button variant={"ghost"} className=" text-sm md:block">
                                        Sign in
                                    </Button>
                                </LoginLink>
                                <RegisterLink>
                                    <Button variant="default" className={"hidden text-sm md:block"}>
                                        Get Started
                                    </Button>
                                </RegisterLink>
                            </>
                        )}

                    </NavbarRight>
                </NavbarComponent>
            </div>
        </header>
    );
}
