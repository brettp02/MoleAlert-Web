"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {useFormStatus} from "react-dom";
import {Loader2} from "lucide-react";


export default function UploadFile() {
    const [file, setFile] = useState<File>();
    const [uploading, setUploading] = useState(false);
    const [prediction, setPrediction] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [dragActive, setDragActive] = useState(false);

    const uploadFile = async () => {
        try {
            if (!file) {
                setError("No file selected");
                return;
            }

            setUploading(true);
            setError("");

            const formData = new FormData();
            formData.append('image', file);

            // Use local API route instead of calling AWS directly
            const response = await fetch('/api/predict', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Prediction Result:', result);
            setPrediction(result.result);

        } catch (e) {
            console.error('Error:', e);
            setError(e instanceof Error ? e.message : "Error analyzing image");
            setPrediction("");
        } finally {
            setUploading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target?.files?.[0];
        if (selectedFile) {
            if (!selectedFile.type.startsWith('image/')) {
                setError("Please select an image file");
                return;
            }
            setFile(selectedFile);
            setError("");
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            if (!droppedFile.type.startsWith('image/')) {
                setError("Please select an image file");
                return;
            }
            setFile(droppedFile);
            setError("");
        }
    };

    return (
        <main className="">
            <Card>
                <CardContent className="p-6 space-y-4">
                    <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg flex flex-col gap-1 p-6 items-center transition-colors
                            ${dragActive
                            ? "border-primary bg-primary/5"
                            : "border-gray-200"}`}
                    >
                        <FileIcon className={`w-12 h-12 transition-colors ${dragActive ? "text-primary" : ""}`}/>
                        <span
                            className="text-sm font-medium text-gray-500">
                            {dragActive ? "Drop the file here" : "Drag and drop a file or click to browse"}
                        </span>
                        <span className="text-xs text-gray-500">jpg, png, etc</span>
                    </div>
                    <div className="space-y-2 text-sm">
                        <Label htmlFor="file" className="text-sm font-medium">
                            File
                        </Label>
                        <Input type="file" onChange={handleChange} accept="image/*"/>
                    </div>
                </CardContent>
                <CardFooter className={"flex items-center justify-between"}>
                    <Button size={"lg"} variant={"destructive"}><Link href={"/dashboard"}>Cancel</Link></Button>
                    <Button size="lg" disabled={uploading} onClick={uploadFile}>Upload</Button>
                </CardFooter>
            </Card>

            {error && (
                <div className="mt-4 p-4 bg-muted text-red-700 rounded">
                    {error}
                </div>
            )}

            {prediction && (
                <div className="mt-4 p-4 bg-muted rounded">
                    <h3 className="font-bold">Analysis Result:</h3>
                    <p className={`mt-2 ${prediction === 'malignant' ? 'text-red-600' : 'text-green-600'}`}>
                        {prediction.charAt(0).toUpperCase() + prediction.slice(1)}
                    </p>
                </div>
            )}
        </main>
    );
}

function FileIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
    )
}

function SubmitButtons() {
    const {pending} = useFormStatus()

    return (
        <>
            {pending ? (
                <Button disabled className={"w-fit"}><Loader2 className={"mr-2 w-4 h-4 animate-spin"}/>Classifying</Button>
            ): (
                <Button type={"submit"} className={"w-fit"}>Upload</Button>
            )}
        </>
    )
}