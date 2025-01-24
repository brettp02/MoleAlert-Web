import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(request: Request) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        // Log authentication status
        console.log('User authentication:', { userId: user?.id });

        if (!user || !user.id) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        
        // Log form data
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const prediction = formData.get('prediction') as string;

        console.log('Form data:', { title, description, prediction });

        if (!title || !prediction) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const note = await prisma.note.create({
            data: {
                title,
                description: description || '',
                prediction,
                userId: user.id
            },
        });

        console.log('Note created:', note);

        return NextResponse.json({ 
            success: true, 
            note,
            message: 'Prediction saved successfully' 
        });

    } catch (error) {
        // Detailed error logging
        console.error('Detailed error:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });

        return NextResponse.json(
            { 
                success: false, 
                error: error instanceof Error ? error.message : 'Failed to create prediction',
                details: process.env.NODE_ENV === 'development' ? error : undefined
            },
            { status: 500 }
        );
    }
}