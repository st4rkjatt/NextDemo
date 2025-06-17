// src/app/api/generatePost/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
    const { prompt, tone } = await req.json();


    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
            { role: 'system', content: `You are a LinkedIn content writer using ${tone} tone.` },
            { role: 'user', content: `Write a LinkedIn post about: ${prompt}` }
        ],
    });

    console.log(completion, 'completion');
    const post: string = completion?.choices[0]?.message?.content ?? '';
    return NextResponse.json({ post });
}
