//program-flow types

export default interface IProgramFlow {
    organizationName: string;
	academicYear: string;

	activityName: string;
	date: string;
	time: string;
	venue: string;
	campus: string;

	headOrganizer: string;
	organizerPosition: string;
	
	proficiencyLevel: string
	modeOfPresentation: string
	demos: Boolean;
	handsOn: Boolean;
	qaSession: Boolean;
	attendance: Boolean;
	games: Boolean;
	quizzes: Boolean;
	guestSpeakers: Boolean
	groupActivities: Boolean
}
