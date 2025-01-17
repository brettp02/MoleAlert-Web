"use client";

import { useState } from "react";

export default function UploadFile() {
    const [file, setFile] = useState<File>();
    const [uploading, setUploading] = useState(false);
    const [prediction, setPrediction] = useState<string>("");
    const [error, setError] = useState<string>("");

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

    return (
        <main className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
            <input
                type="file"
                onChange={handleChange}
                accept="image/*"
                className="mb-4"
            />
            <button
                type="button"
                disabled={uploading}
                onClick={uploadFile}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
                {uploading ? "Analyzing..." : "Analyze Image"}
            </button>

            {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            {prediction && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <h3 className="font-bold">Analysis Result:</h3>
                    <p className={`mt-2 ${prediction === 'malignant' ? 'text-red-600' : 'text-green-600'}`}>
                        {prediction.charAt(0).toUpperCase() + prediction.slice(1)}
                    </p>
                </div>
            )}
        </main>
    );
}