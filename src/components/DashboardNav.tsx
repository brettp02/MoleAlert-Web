"use client";

import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {navItems} from "@/components/UserNav";


export function DashboardNav() {
    const pathname = usePathname();

    return(
        <nav className={"grid items-start gap-2"}>
            {navItems.map((item, index) => (
                <Link href={item.href} key={index}>
                    <span className={cn(
                        "group flex items-center rounded px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground", pathname === item.href ? 'bg-accent' : 'bg-transparent'
                    )}>
                        <item.icon className={"mr-2 h-4 w-4 text-primary"}/>
                        <span>{item.name}</span>
                    </span>
                </Link>
            ))}
        </nav>
    )
}