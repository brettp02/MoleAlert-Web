import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const apiEndpoint = process.env.API_ENDPOINT as string;
    try {
        const formData = await request.formData();

        const awsResponse = await fetch(apiEndpoint, {
            method: 'POST',
            body: formData
        });

        const result = await awsResponse.json();
        return NextResponse.json(result);
    } catch (e) {
        console.error('Error in predict API route:', e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}