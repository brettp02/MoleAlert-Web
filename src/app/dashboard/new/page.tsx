import Link from "next/link";
import UploadFile from "@/components/UploadFile";
import React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

export default async function NewPrediction() {

    async function postData(formData: FormData) {
        "use server"

        const title = formData.get('title') as string
        const description = formData.get('description') as string

    }

    return (
        <div>
            <form>
                <CardHeader>
                    <h1 className={"text-3xl md:text-4xl"}>MoleAlert</h1>
                    <p className={"text-lg text-muted-foreground"}>To use the model, take a picture of your mole and
                        press
                        upload
                        to receive your result. <span className={"text-primary"}><Link
                            href={"/"}>(Example images)</Link></span></p>
                </CardHeader>
                <CardContent className={"flex flex-col gap-y-5"}>
                    <div className={"gap-y-2 flex flex-col"}>
                        <Label>Title</Label>
                        <Input
                            required type={"text"}
                            title={"Title"}
                            placeholder={"Title for your scan e.g. left shoulder mole"}
                        />
                    </div>

                    <div className={"flex flex-col gap-y-2"}>
                        <Label>Description</Label>
                        <Textarea
                            name={"description"}
                            placeholder={"Description for your scan e.g. left shoulder mole"}
                        />
                    </div>

                    <div className={"gap-y-2 flex flex-col"}>
                        <Label>Upload Image</Label>
                        <UploadFile/>
                    </div>
                </CardContent>
                <CardFooter className={"flex justify-between"}>

                </CardFooter>
            </form>
        </div>
    )
}

function Testing() {
    return (
        <div className={"grid items-start gap-8"}>
            <div className={"flex items-center justify-between px-2"}>
                <div className={"grid gap-1"}>
                    <h1 className={"text-3xl md:text-4xl"}>MoleAlert</h1>
                    <p className={"text-lg text-muted-foreground"}>To use the model, take a picture of your mole and
                        press
                        upload
                        to receive your result. <span className={"text-primary"}><Link
                            href={"/"}>(Example images)</Link></span></p>
                </div>
            </div>
            <UploadFile/>
            <div className={"flex items-center justify-between px-2"}>
                <div className={"grid gap-1"}>
                    <p className={"text-sm text-muted-foreground italic"}>Note: While the predictions from this model
                        are
                        accurate, this in NOT a substiute for a diagnoses by a medical professional.</p>
                </div>
            </div>
        </div>
    )
}

function TestingTwo() {
    return (
        <div className={"grid items-start gap-8"}>
            <div className={"flex items-center justify-between px-2"}>
                <div className={"grid gap-1"}>
                    <h1 className={"text-3xl md:text-4xl"}>MoleAlert</h1>
                    <p className={"text-lg text-muted-foreground"}>To use the model, take a picture of your mole and
                        press
                        upload
                        to receive your result. <span className={"text-primary"}><Link
                            href={"/"}>(Example images)</Link></span></p>
                </div>
            </div>
            <UploadFile/>
            <div className={"flex items-center justify-between px-2"}>
                <div className={"grid gap-1"}>
                    <p className={"text-sm text-muted-foreground italic"}>Note: While the predictions from this model
                        are
                        accurate, this in NOT a substiute for a diagnoses by a medical professional.</p>
                </div>
            </div>
        </div>
    )
}