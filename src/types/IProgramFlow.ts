//program-flow types

export interface IProgramFlow {
	organizationName: string;
	academicYear: string;
	eventName: string;
	date: string;
	time: string;
	venue: string;
	headOrganizer: string;
	organizerPosition: string;
	proficiencyLevel: string;
	modeOfPresentation: string;
	programFlow: [IProgramFlowItem];
	activitySettings: string;
}

export interface IProgramFlowItem {
	activityName: string;
	timeSlot: string;
}
