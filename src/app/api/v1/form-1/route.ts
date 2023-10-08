import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

enum OutputType {
    Description = "description",
    Objective = "objective",
    Agenda = "agenda"
}

type FormOneRequest = {
    eventName: string;
    orgName: string;
    outputType: OutputType;
}

async function chatCompletion(orgName: string, prompt: string, outputType?: string, eventName?: string){
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        temperature: 0.5,
        messages: [
            {
                role: "system",
                content: `You are a secretary for a student organization called ${orgName} that is able to generate descriptions, event objectives or agendas.`
            },
            {
                role: "user",
                content:  prompt
            },
        ]
    })
    return response
}

export async function POST(req: Request){
    try {
        const { eventName, orgName, outputType }: FormOneRequest = await req.json();
       
        let response: any
        if(outputType === "description" || outputType === "objective"){
            response = await chatCompletion(
                orgName, 
                `What is ${eventName} all about? Please provide a detailed and cohesive declarative ${outputType}. Minimum of 150 characters, Maximum of 300 characters only and avoid imperative statements. Remove imperative statements like 'Join us..'`
            )
        }
        else if(outputType === "agenda"){
            response = await chatCompletion(
                orgName,
                `Provide a detailed and cohesive sample agenda on what happened on this planning/meeting event: ${eventName}. Format it in paragraph form only. Minimum of 150 characters, Maximum of 300 characters only`
            )
        }

        return NextResponse.json({
            content: response.choices[0].message.content
        })
        
    } catch (error) {
        console.error(error)
    }
}
