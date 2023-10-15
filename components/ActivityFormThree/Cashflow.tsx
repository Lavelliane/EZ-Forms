import React, { useState, useEffect } from 'react';
import { Table, TableCaption, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoRemoveCircleOutline } from 'react-icons/io5';
import { IFormThree } from '@/types';

interface Particular {
	particular: string;
	amount: string;
}

interface CashFlowProps {
	onChange: (e: any) => void;
	form: IFormThree;
}

export function CashFlow({ onChange, form }: CashFlowProps) {
	const [inflowParticulars, setInflowParticulars] = useState<Particular[]>([]);
	const [outflowParticulars, setOutflowParticulars] = useState<Particular[]>([]);
	const [newInflowParticular, setNewInflowParticular] = useState('');
	const [newInflowAmount, setNewInflowAmount] = useState('');
	const [newOutflowParticular, setNewOutflowParticular] = useState('');
	const [newOutflowAmount, setNewOutflowAmount] = useState('');
	const [netCashFlow, setNetCashFlow] = useState('');

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
		onChange({ target: { id: 'cashInflow', value: updatedParticulars } });
	};
	console.log(form);
	const removeOutflowParticular = (index: number) => {
		const updatedParticulars = [...outflowParticulars];
		updatedParticulars.splice(index, 1);
		setOutflowParticulars(updatedParticulars);
		onChange({ target: { id: 'cashOutflow', value: updatedParticulars } });
	};

	const calculateNetCashFlow = () => {
		const inflowTotal = inflowParticulars.reduce((total, entry) => total + parseFloat(entry.amount), 0);
		const outflowTotal = outflowParticulars.reduce((total, entry) => total + parseFloat(entry.amount), 0);
		const netCashFlow = inflowTotal - outflowTotal;
		onChange({ target: { id: 'netCashFlow', value: netCashFlow } });
		setNetCashFlow(netCashFlow.toString());
	};

	useEffect(() => {
		calculateNetCashFlow();
	}, [inflowParticulars, outflowParticulars]);

	useEffect(() => {
		if (form.cashInflow && form.cashInflow?.length > 1) {
			setInflowParticulars(form.cashInflow);
		}
		if (form.cashOutflow && form.cashOutflow?.length > 1) {
			setOutflowParticulars(form.cashOutflow);
		}
		setNetCashFlow(form.netCashFlow);
	}, [form.cashInflow, form.cashOutflow, form.netCashFlow]);

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
								<TableHead className='lg:w-[150px] w-[55px]'>Particular</TableHead>
								<TableHead className='text-right p-0 lg:w-[90px] w-[55px]'>Amount</TableHead>
								<TableHead className='text-right p-0 w-[30px]'>Del</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className='border-b'>
							{inflowParticulars.map((particular, index) => (
								<TableRow key={`inflow-${index}-${particular.particular}-${particular.amount}`}>
									<TableCell className='font-medium lg:w-[150px] w-[55px] py-0'>
										<span className='flex lg:w-[150px] w-[55px] truncate'>{particular.particular}</span>
									</TableCell>
									<TableCell className='p-0 lg:w-[90px] w-[55px] m-0 text-end'>
										<span className='p-0 m-0 lg:w-[90px] w-[55px] truncate'>₱&#160;{particular.amount}</span>
									</TableCell>
									<TableCell className='p-0 m-0 justify-end flex text-end'>
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
					<div className='flex w-full justify-center'>
						<p className='text-sm font-semibold'>
							Total: ₱ {inflowParticulars.reduce((total, entry) => total + parseFloat(entry.amount), 0) || 0}
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
								<TableHead className='lg:w-[150px] w-[55px]'>Particular</TableHead>
								<TableHead className='text-right p-0 lg:w-[90px] w-[55px]'>Amount</TableHead>
								<TableHead className='text-right p-0 w-[30px]'>Del</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className='border-b'>
							{outflowParticulars.map((particular, index) => (
								<TableRow key={`inflow-${index}-${particular.particular}-${particular.amount}`}>
									<TableCell className='font-medium lg:w-[150px] w-[55px] py-0'>
										<span className='flex lg:w-[150px] w-[55px] truncate'>{particular.particular}</span>
									</TableCell>
									<TableCell className='p-0 lg:w-[90px] w-[55px] m-0 text-end'>
										<span className='p-0 m-0 lg:w-[90px] w-[55px] truncate'>₱&#160;{particular.amount}</span>
									</TableCell>
									<TableCell className='p-0 m-0 justify-end flex text-end'>
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
					<div className='flex w-full justify-center'>
						<p className='text-sm font-semibold'>
							Total: ₱ {outflowParticulars.reduce((total, entry) => total + parseFloat(entry.amount), 0) || 0}
						</p>
					</div>
				</div>
			</div>
			<div className='sm:text-lg text-base font-semibold text-dark'>Net Cash Flow: ₱ {netCashFlow}</div>
		</div>
	);
}
