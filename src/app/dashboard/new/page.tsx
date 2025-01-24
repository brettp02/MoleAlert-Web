"use client";
import Link from "next/link";
import UploadFile from "@/components/UploadFile";
import React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";



import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function NewPrediction() {
    const [prediction, setPrediction] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        
        const formData = new FormData(event.currentTarget);
        formData.append('prediction', prediction);
    
        try {
            console.log('Submitting form data:', {
                title: formData.get('title'),
                description: formData.get('description'),
                prediction: formData.get('prediction')
            });
    
            const response = await fetch('/api/predictions', {
                method: 'POST',
                body: formData,
            });
    
            const responseText = await response.text();
            console.log('Raw response:', responseText);
    
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error('Failed to parse response:', e);
                throw new Error('Invalid server response');
            }
    
            if (!response.ok) {
                throw new Error(data.error || 'Failed to save prediction');
            }
    
            if (data.success) {
                router.push('/dashboard');
                router.refresh();
            } else {
                throw new Error(data.error || 'Failed to save prediction');
            }
        } catch (error) {
            console.error('Error saving prediction:', error);
            setError(error instanceof Error ? error.message : 'Failed to save prediction');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <h1 className={"text-3xl md:text-4xl"}>MoleAlert</h1>
                    <p className={"text-lg text-muted-foreground"}>To use the model, take a picture of your mole and
                        press
                        upload
                        to receive your result and then press save. <span className={"text-primary"}><Link
                            href={"/"}>(Example images)</Link></span></p>
                </CardHeader>
                <CardContent className={"flex flex-col gap-y-5"}>
                    <div className={"gap-y-2 flex flex-col"}>
                        <Label>Title</Label>
                        <Input
                            name="title"
                            required 
                            type={"text"}
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
                        <UploadFile onPredictionComplete={setPrediction} />
                    </div>
                </CardContent>
                <CardFooter className={"flex justify-between"}>
                    <Button variant="destructive" type="button">
                        <Link href="/dashboard">Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={!prediction}>
                        Save
                    </Button>
                </CardFooter>
            </form>
        </div>
    );
}
