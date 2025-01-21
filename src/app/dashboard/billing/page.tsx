import React from 'react'
import {Card, CardContent} from "@/components/ui/card";
import {CheckCircle2} from "lucide-react";
import {Button} from "@/components/ui/button";

const featureItems = [
    {name: 'Testing Name'},
    {name: 'Testing Name'},
    {name: 'Testing Name'},
    {name: 'Testing Name'},
    {name: 'Testing Name'},
]

function BillingPage() {
    return (
        <div className={"max-w-md mx-auto space-y-4"}>
            <Card className={"flex flex-col"}>
                <CardContent className={"py-8"}>
                    <div>
                        <h3 className={"inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary"}>
                            Monthly
                        </h3>
                    </div>
                    <div className={"mt-4 flex items-baseline text-6xl font-extrabold"}>
                        $10<span className={"ml-1 text-2xl text-muted-foreground"}>/mo</span>
                    </div>
                    <p className={"mt-5 text-lg text-muted-foreground"}>Use the mole detection AI as much as you want for $10 a month.</p>
                </CardContent>
                <div className={"flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-10 sm:pt-6"}>
                    <ul className={"space-y-4"}>
                        {featureItems.map((item, i) => (
                            <li key={i} className={"flex items-center"}>
                                <div className={"flex-shrink-0"}>
                                    <CheckCircle2 className={"h-6 w-6 text-green-500"}/>
                                </div>
                                <p className={"ml-3 text-base"}>{item.name}</p>
                            </li>
                        ))}
                    </ul>

                    <form className={"w-full"}>
                        <Button className={"w-full"}>Buy today</Button>
                    </form>
                </div>
            </Card>
        </div>
    )
}

export default BillingPage
