import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

enum OutputType {
    Description = "description",
    Objective = "objective"
}

type FormOneRequest = {
    eventName: String;
    orgName: String;
    outputType: OutputType;
}

export async function POST(req: Request){
    try {
        const { eventName, orgName, outputType }: FormOneRequest = await req.json();
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            temperature: 0.5,
            messages: [
                {
                    role: "system",
                    content: `You are a secretary for a student organization called ${orgName} that is able to generate descriptions and event objectives.`
                },
                {
                    role: "user",
                    content: `What is ${eventName} all about? Please provide a detailed and cohesive declarative ${outputType}. Minimum of 150 characters, Maximum of 300 characters only and avoid imperative statements. Remove imperative statements like 'Join us..'`
                },
            ]
        })

        return NextResponse.json({
            content: response.choices[0].message.content
        })
        
    } catch (error) {
        console.error(error)
    }
}
