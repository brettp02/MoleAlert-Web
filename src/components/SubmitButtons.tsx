"use client";

import {useFormStatus} from "react-dom";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

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