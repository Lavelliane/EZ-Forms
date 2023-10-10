import React from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Payment, columns } from './Column';

async function getData(): Promise<Payment[]> {
	// Fetch data from your API here.
	return [
		{
			id: '728ed52f',
			amount: 100,
			status: 'pending',
			email: 'm@example.com',
		},
		// ...
	];
}

const TestTable = async () => {
	const data = await getData();
	return (
		<div>
			<DataTable columns={columns} data={data} />
		</div>
	);
};

export default TestTable;
