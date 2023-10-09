//form-1 default
import { IFormOne, IFormTwo, IProgramFlow } from '@/types';

export const defaultForm1: IFormOne = {
	academicYear: '',
	semester: '',
	organizationName: '',
	department: '',
	school: '',
	curricular: '',
	date: '',
	time: '',
	venue: '',
	campus: '',
	activityName: '',
	natureOfActivity: '',
	involvement: '',
	numberOfParticipants: '',
	participants: '',
	sponsor: '',
	description: '',
	objective: '',
	recommendedBy: '',
	endorsedBy: '',
	notedBy: '',
};

export const defaultForm2: IFormTwo = {
	academicYear: '',
	semester: '',
	organizationName: '',
	activityName: '',
	date: '',
	time: '',
	venue: '',
	involvement: '',
	agenda: '',
	recommendedBy: '',
	endorsedBy: '',
	notedBy: '',
};

export const defaultProgramFlow: IProgramFlow = {
    organizationName: '',
	academicYear: '',

	activityName: '',
	date: '',
	time: '',
	venue: '',
	campus: '',

	headOrganizer: '',
	organizerPosition: '',
	
	proficiencyLevel: '',
	modeOfPresentation: '',
	demos: false,
	handsOn: false,
	qaSession: false,
	attendance: false,
	games: false,
	quizzes: false,
	guestSpeakers: false,
	groupActivities: false,
}

