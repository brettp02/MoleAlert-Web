import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {CreditCard, DoorClosed, HomeIcon, Settings} from "lucide-react";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

export const navItems = [
    {name: 'Home', href: '/dashboard', icon: HomeIcon},
    {name: 'Settings', href: '/dashboard/settings', icon: Settings},
    {name: 'Billing', href: '/dashboard/billing', icon: CreditCard}
]

export function UserNav({name, email, image}: {name: string, email:string, image:string}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className={"relative rounded-full h-10 w-10"}>
                    <Avatar className={"h-10 w-10 rounded-full"}>
                        <AvatarImage src={image} alt={"profile picture"}/>
                        <AvatarFallback>{name}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"w-56"} align={"end"} forceMount>
                <DropdownMenuLabel>
                    <div className={"flex flex-col space-y-1"}>
                        <p className={"text-sm font-medium leading-none"}>{name}</p>
                        <p className={"text-xs leading-none text-muted-foreground"}>{email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {navItems.map((item, i) => (
                        <DropdownMenuItem asChild key={i}>
                            <Link href={item.href} className={"w-full flex justify-between items-center"}>
                                {item.name}
                                <span><item.icon className={"w-4 h-4"}/></span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={"w-full flex  justify-between items-center"} asChild>
                    <LogoutLink>Logout<span><DoorClosed className={"w-4 h-4"}/></span></LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}