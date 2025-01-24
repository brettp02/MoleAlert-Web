import React from 'react'
import Link from "next/link";
import {Button} from "@/components/ui/button";
import prisma from "@/app/lib/db";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { File } from "lucide-react";
import {Card} from "@/components/ui/card";
import {revalidatePath} from "next/cache";
import {DeleteButton} from "@/components/SubmitButtons";
import {unstable_noStore as noStore} from "next/cache";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

async function getData(userId: string) {
    noStore();
     const data = await prisma.note.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: "desc",
        }
    })

    return data

}

export default async function Dashboard() {
    const {getUser} = getKindeServerSession()
    const user = await getUser();
    const data = await getData(user.id as string)

    async function deleteNote(formData: FormData) {
        "use server";

        const id = formData.get('id') as string

        await prisma.note.delete({
            where: {
                id: id
            }
        })

        revalidatePath('/dashboard')
    }

    return (
        <div className={"grid items-start gap-y-8"}>
            <div className={"flex items-center justify-between px-2"}>
                <div className={"grid gap-1"}>
                    <h1 className={"text-3xl md:text-4xl"}>Your MoleAlert</h1>
                    <p className={"text-lg text-muted-foreground"}>View MoleAlerts predictions from your previous scans</p>
                </div>
                <Button asChild>
                    <Link href={"/dashboard/new"}>Add new</Link>
                </Button>
            </div>

            {data?.length < 1 ? (
                <div className={"flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50"}>
                    <div className={"flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"}>
                        <File className={"w-10 h-10 text-primary"}></File>
                    </div>
                    <h1 className={"mt-6 text-xl font-semibold"}>You dont have any predictions</h1>
                    <p className={"mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto"}>Press add new to make your first prediction using MoleAlert.</p>
                    <Button asChild>
                        <Link href={"/dashboard/new"}>Add new</Link>
                    </Button>
                </div>
            ): (
                <div className={"flex flex-col gap-y-4"}>
                    {data.map((item) => {
                        return (
                            <Card key={item.id} className={"flex items-center justify-between p-4"}>
                                <Accordion type="single" collapsible className={"flex flex-col w-full"}>
                                    <div>
                                        <h2 className={"font-semibold text-xl text-primary"}>{item.title}</h2>
                                        <p>{new Intl.DateTimeFormat('en-US', {
                                            dateStyle: 'full'
                                        }).format(new Date(item.createdAt))}</p>
                                    </div>
                                    <AccordionItem value="item-1" className={'mr-2'}>
                                        <AccordionTrigger></AccordionTrigger>
                                        <AccordionContent>
                                            <div>
                                                <h2 className={"font-semibold text-lg"}>Prediction: <span className={"text-primary/90"}>{item.prediction}</span></h2>
                                                <p className={"text-muted-foreground italic"}>{item.description}</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                                <div className={"flex gap-x-4"}>
                                    <form action={deleteNote}>
                                        <input type={"hidden"} name={"id"} value={item.id}/>
                                        <DeleteButton/>
                                    </form>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
