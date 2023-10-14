import React, { useState } from 'react';
import { Table, TableCaption, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoRemoveCircleOutline } from 'react-icons/io5';

interface Particular {
	particular: string;
	amount: string;
}

interface CashFlowProps {
	onChange: (e: any) => void;
}

export function CashFlow({ onChange }: CashFlowProps) {
	const [inflowParticulars, setInflowParticulars] = useState<Particular[]>([]);
	const [outflowParticulars, setOutflowParticulars] = useState<Particular[]>([]);
	const [newInflowParticular, setNewInflowParticular] = useState('');
	const [newInflowAmount, setNewInflowAmount] = useState('');
	const [newOutflowParticular, setNewOutflowParticular] = useState('');
	const [newOutflowAmount, setNewOutflowAmount] = useState('');

	const addInflowParticular = () => {
		if (newInflowParticular && newInflowAmount) {
			const newEntry: Particular = {
				particular: newInflowParticular,
				amount: newInflowAmount,
			};
			onChange({ target: { id: 'cashInflow', value: [...inflowParticulars, newEntry] } });
			setInflowParticulars([...inflowParticulars, newEntry]);
			setNewInflowParticular('');
			setNewInflowAmount('');
		}
	};

	const addOutflowParticular = () => {
		if (newOutflowParticular && newOutflowAmount) {
			const newEntry = {
				particular: newOutflowParticular,
				amount: newOutflowAmount,
			};
			onChange({ target: { id: 'cashOutflow', value: [...outflowParticulars, newEntry] } });
			setOutflowParticulars([...outflowParticulars, newEntry]);
			setNewOutflowParticular('');
			setNewOutflowAmount('');
		}
	};

	const removeInflowParticular = (index: number) => {
		const updatedParticulars = [...inflowParticulars];
		updatedParticulars.splice(index, 1);
		setInflowParticulars(updatedParticulars);
	};

	const removeOutflowParticular = (index: number) => {
		const updatedParticulars = [...outflowParticulars];
		updatedParticulars.splice(index, 1);
		setOutflowParticulars(updatedParticulars);
	};

	const calculateNetCashFlow = () => {
		const inflowTotal = inflowParticulars.reduce((total, entry) => total + parseFloat(entry.amount), 0);
		const outflowTotal = outflowParticulars.reduce((total, entry) => total + parseFloat(entry.amount), 0);
		const netCashFlow = inflowTotal - outflowTotal;

		return netCashFlow;
	};

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex md:flex-row flex-col gap-4 w-full'>
				<div className='lg:p-6 p-4 bg-gray-100 rounded-lg flex flex-col gap-2 w-full flex-1 h-[380px]'>
					<h4 className='font-semibold text-sm'>CASH INFLOW (Collection)</h4>
					<div className='flex w-full gap-2'>
						<Input
							id='inflowParticular'
							placeholder='Particular'
							value={newInflowParticular}
							onChange={(e) => setNewInflowParticular(e.target.value)}
						/>
						<Input
							id='inflowAmount'
							placeholder='Amount'
							className='w-1/3'
							value={newInflowAmount}
							type='number'
							onChange={(e) => setNewInflowAmount(e.target.value)}
						/>
						<Button onClick={addInflowParticular}>Add</Button>
					</div>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className=''>Particular</TableHead>
								<TableHead className='text-right'>Amount</TableHead>
								<TableHead className='text-right'>Del</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{inflowParticulars.map((particular, index) => (
								<TableRow key={`inflow-${index}-${particular.particular}-${particular.amount}`}>
									<TableCell className='font-medium py-0'>
										<span className='flex lg:w-[150px] w-[55px] truncate'>{particular.particular}</span>
									</TableCell>
									<TableCell className=' py-0'>
										<span className='flex lg:w-[90px] w-[55px] text-right truncate justify-end'>
											₱&#160;{particular.amount}
										</span>
									</TableCell>
									<TableCell className='py-0'>
										<Button
											onClick={() => removeInflowParticular(index)}
											className='p-0 m-0 bg-transparent text-red-600 hover:text-red-400 text-xl hover:bg-transparent'
										>
											<IoRemoveCircleOutline />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<div className='flex w-full justify-end pr-20 pt-2 border-t'>
						<p className='text-sm font-semibold'>
							Total: ₱ {inflowParticulars.reduce((total, entry) => total + parseFloat(entry.amount), 0)}
						</p>
					</div>
				</div>
				<div className='lg:p-6 p-4 bg-gray-100 rounded-lg flex flex-col gap-2 h-[380px] flex-1 w-full'>
					<h4 className='font-semibold text-sm'>CASH OUTFLOW (Expenses)</h4>
					<div className='flex w-full gap-2'>
						<Input
							id='outflowParticular'
							placeholder='Particular'
							value={newOutflowParticular}
							onChange={(e) => setNewOutflowParticular(e.target.value)}
						/>
						<Input
							id='outflowAmount'
							placeholder='Amount'
							className='w-1/3'
							value={newOutflowAmount}
							type='number'
							onChange={(e) => setNewOutflowAmount(e.target.value)}
						/>
						<Button onClick={addOutflowParticular}>Add</Button>
					</div>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Particular</TableHead>
								<TableHead className='text-right'>Amount</TableHead>
								<TableHead className='text-right'>Del</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{outflowParticulars.map((particular, index) => (
								<TableRow key={`outflow-${index}-${particular.particular}-${particular.amount}`}>
									<TableCell className='font-medium py-0'>
										<span className='flex lg:w-[150px] w-[55px] truncate'>{particular.particular}</span>
									</TableCell>
									<TableCell className=' py-0'>
										<span className='flex lg:w-[90px] w-[55px] text-right truncate justify-end'>
											₱&#160;{particular.amount}
										</span>
									</TableCell>
									<TableCell className='py-0'>
										<Button
											onClick={() => removeOutflowParticular(index)}
											className='p-0 m-0 bg-transparent text-red-600 hover:text-red-400 text-xl hover:bg-transparent'
										>
											<IoRemoveCircleOutline />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<div className='flex w-full justify-end pr-20 pt-2 border-t'>
						<p className='text-sm font-semibold'>
							Total: ₱ {outflowParticulars.reduce((total, entry) => total + parseFloat(entry.amount), 0)}
						</p>
					</div>
				</div>
			</div>

			<div className='sm:text-xl text-base font-semibold text-dark'>Net Cash Flow: ₱ {calculateNetCashFlow()}</div>
		</div>
	);
}
