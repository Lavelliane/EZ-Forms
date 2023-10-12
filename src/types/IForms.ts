//form-1 types

export interface IFormOne {
	academicYear: string;
	semester: string;
	organizationName: string;
	department: string;
	school: string;
	curricular: string;
	date: string;
	time: string;
	venue: string;
	campus: string;
	activityName: string;
	natureOfActivity: string;
	involvement: string;
	numberOfParticipants: string;
	participants: string;
	sponsor: string;
	description: string;
	objective: string;
	recommendedBy: string;
	endorsedBy: string;
	notedBy: string;
}

//form-2 types

export interface IFormTwo {
	academicYear: string;
	semester: string;
	organizationName: string;
	activityName: string;
	date: string;
	time: string;
	venue: string;
	involvement: string;
	agenda: string;
	recommendedBy: string;
	endorsedBy: string;
	notedBy: string;
}

//form-3 types

export interface IFormThree {
	academicYear: string;
	semester: string;
	organizationName: string;
	typeOfActivity: string;
	date: string;
	time: string;
	venue: string;
	campus: string;
	cashInflow: [Budget];
	cashOutflow: [Budget];
	netCashFlow: string;
	involvement: string;
	treasurer: string;
	president: string;
	endorsedBy: string;
}

interface Budget {
	particulars: string;
	amount: string;
}
