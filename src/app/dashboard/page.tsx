import React from 'react'
import UploadFile from "@/components/UploadFile";
import Link from "next/link";


export default async function Dashboard() {
    return (

        <div className={"grid items-start gap-8"}>
            <div className={"flex items-center justify-between px-2"}>
                <div className={"grid gap-1"}>
                    <h1 className={"text-3xl md:text-4xl"}>MoleAlert</h1>
                    <p className={"text-lg text-muted-foreground"}>To use the model, take a picture of your mole and press upload
                        to receive your result. <span className={"text-primary"}><Link href={"/"}>(Example images)</Link></span></p>
                </div>
            </div>
            <UploadFile/>
            <div className={"flex items-center justify-between px-2"}>
                <div className={"grid gap-1"}>
                    <p className={"text-sm text-muted-foreground italic"}>Note: While the predictions from this model are accurate, this in NOT a substiute for a diagnoses by a medical professional.</p>
                </div>
            </div>
        </div>

    )
}

