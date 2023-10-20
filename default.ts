//form-1 default
import { IFormOne, IFormTwo, IFormThree, IProgramFlow } from '@/types';

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
	eventName: '',
	headOrganizer: '',
	organizerPosition: '',
	proficiencyLevel: 'Intermediate',
	modeOfPresentation: 'face-to-face',
	programFlow: [{ activityName: '', timeSlot: '' }],
	activitySettings: '',
	date: '00:00AM - 12:00PM',
	time: '',
	venue: '',
};

export const defaultForm3: IFormThree = {
	academicYear: '',
	semester: '',
	organizationName: '',
	typeOfActivity: '',
	date: '',
	time: '',
	venue: '',
	campus: '',
	cashInflow: [{ particular: '', amount: '' }],
	cashOutflow: [{ particular: '', amount: '' }],
	netCashFlow: '',
	treasurer: '',
	president: '',
	endorsedBy: '',
};
