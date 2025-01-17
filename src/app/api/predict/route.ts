import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const awsResponse = await fetch(process.env.API_ENDPOINT, {
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