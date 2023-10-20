import { NextResponse } from 'next/server';
import { strict_output } from '@/lib/gpt';

type ProgramFlowRequest = {
	eventName: string;
	type: string;
	activitySettings: string;
	proficiencyLevel: string;
	startTime: string;
	endTime: string;
};

export async function POST(req: Request) {
	const { eventName, type, activitySettings, proficiencyLevel, startTime, endTime }: ProgramFlowRequest = await req.json();
	const numberOfActivities = 7;

	const events = await strict_output(
		'You are a helpful AI that is able to generate a program flow for an event. Store the pair of activity name and time in a JSON array',
		new Array(numberOfActivities).fill(
			`Generate a program flow on the event ${eventName}. This is a ${type} event. The program flow should additionally include the following parts: ${activitySettings}. The expected audience's level of knowledge about the topic is ${proficiencyLevel}. The knowledge range is: Beginner, Novice, Intermediate, Advanced and Expert, adjust the topics accordingly. The event will start on ${startTime} and end on ${endTime}. This is in Singapore Timezone`
		),
		{
			activityName: 'name of activity',
			timeSlot: 'time slot of the activity with format: start - end',
		}
	);
	return NextResponse.json({ events }, { status: 200 });
}
