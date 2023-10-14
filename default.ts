//form-1 default
import { IFormOne, IFormTwo, IFormThree } from '@/types';

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
	involvement: '',
	treasurer: '',
	president: '',
	endorsedBy: '',
};
