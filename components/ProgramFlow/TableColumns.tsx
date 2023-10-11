'use client';

import { ColumnDef } from '@tanstack/react-table';

export type Activity = {
	timeSlot: string;
	activityName: string;
};

export const columns: ColumnDef<Activity>[] = [
	{
		accessorKey: 'timeSlot',
		header: 'Time',
	},
	{
		accessorKey: 'activityName',
		header: 'Activity',
	},
];
