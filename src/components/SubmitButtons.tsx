"use client";

import {useFormStatus} from "react-dom";
import {Button} from "@/components/ui/button";
import {Loader2, Trash} from "lucide-react";
import React from "react";

export function SubmitButtons({init, loading}: {init: string, loading: string}) {
    const {pending} = useFormStatus()

    return (
        <>
            {pending ? (
                <Button disabled className={"w-fit"}><Loader2 className={"mr-2 w-4 h-4 animate-spin"}/>{loading}</Button>
            ): (
                <Button type={"submit"} className={"w-fit"}>{init}</Button>
            )}
        </>
    )
}

export function StripeSubscriptionButton() {
    const {pending} = useFormStatus()

    return (
        <>
            {pending ? (
                <Button disabled className={"w-full"}><Loader2 className={"mr-2 w-4 h-4 animate-spin"}/>Please Wait</Button>
            ): (
                <Button type={"submit"} className={"w-full"}>Subscribe</Button>
            )}
        </>
    )
}


export function StripePortal() {
    const {pending} = useFormStatus()

    return (
        <>
            {pending ? (
                <Button disabled className={"w-fit"}>
                    <Loader2 className={"mr-2 w-4 h-4 animate-spin"}/>Please Wait
                </Button>
            ): (
                <Button type={"submit"} className={"w-fit"}>View payment details</Button>
            )}
        </>
    )
}

export function DeleteButton() {
    const {pending} = useFormStatus()

    return (
        <>
        {pending ? (
            <Button variant={"destructive"} size={"icon"} disabled><Loader2 className={"h-4 2-4 animate-spin"}/> </Button>
        ): (
            <Button variant={"destructive"} size={"icon"} type={"submit"}><Trash className={"h-4 2-4"}/> </Button>
        )}
        </>
    )
}