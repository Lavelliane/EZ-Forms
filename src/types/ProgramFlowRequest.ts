type ProgramFlowRequest = {
	eventName: string;
	orgName: string;

	proficiencyLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert';
	modeOfPresentation: 'faceToFace' | 'online'
	demos: Boolean;
	handsOn: Boolean;
	qaSession: Boolean;
	attendance: Boolean;
	games: Boolean;
	quizzes: Boolean;
	guestSpeakers: Boolean
	groupActivities: Boolean

};

export default ProgramFlowRequest;
