import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { CustomTimePicker } from '@/components/ui/time-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { IFormThree, FormOneRequest } from '@/types';
import { defaultForm3 } from '../../default';
import { CashFlow } from './Cashflow';
import SheetToPDF from './SheetToPDF';

const FormThree = () => {
	const [form, setForm] = useState<IFormThree>(defaultForm3);
	const [academicYear, setAcademicYear] = useState('');
	const [isCheckedFirstSem, setIsCheckedFirstSem] = useState(false);
	const [isCheckedSecondSem, setIsCheckedSecondSem] = useState(false);
	const [isCheckedSummerSem, setIsCheckedSummerSem] = useState(false);
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [date, setDate] = useState<Date>();
	const [loading, setLoading] = useState(true);

	const onCheckedSemester = (e: any) => {
		if (e.target.id === 'firstSem') {
			setIsCheckedFirstSem(!isCheckedFirstSem);
			setIsCheckedSecondSem(false);
			setIsCheckedSummerSem(false);
		} else if (e.target.id === 'secondSem') {
			setIsCheckedSecondSem(!isCheckedSecondSem);
			setIsCheckedFirstSem(false);
			setIsCheckedSummerSem(false);
		} else if (e.target.id === 'summerSem') {
			setIsCheckedSummerSem(!isCheckedSummerSem);
			setIsCheckedFirstSem(false);
			setIsCheckedSecondSem(false);
		}
		setForm({ ...form, ['semester']: e.target.id });
	};

	useEffect(() => {
		//set academic year to current year
		const currentYear = new Date().getFullYear();
		setAcademicYear(currentYear + '-' + (currentYear + 1));
	}, []);

	useEffect(() => {
		const dateString = date?.toString();

		if (typeof dateString === 'string') {
			const dateFormat = dateString.split(' ')[1] + ' ' + dateString.split(' ')[2] + ', ' + dateString.split(' ')[3];
			setForm({ ...form, ['date']: dateFormat });
		}
	}, [date]);

	const onChange = (e: any) => {
		setForm({ ...form, [e.target.id]: e.target.value });
	};

	useEffect(() => {
		const dateString = date?.toString();

		if (typeof dateString === 'string') {
			const dateFormat = dateString.split(' ')[1] + ' ' + dateString.split(' ')[2] + ', ' + dateString.split(' ')[3];
			setForm({ ...form, ['date']: dateFormat });
		}
	}, [date]);

	useEffect(() => {
		setForm({ ...form, ['time']: startTime + ' - ' + endTime });
	}, [startTime, endTime]);

	// Load the object from local storage when the component mounts
	useEffect(() => {
		const savedForm = JSON.parse(localStorage.getItem('formThree') || '{}');
		if (savedForm) {
			setForm(savedForm);
			setIsCheckedFirstSem(savedForm.semester === 'firstSem');
			setIsCheckedSecondSem(savedForm.semester === 'secondSem');
			setIsCheckedSummerSem(savedForm.semester === 'summerSem');
			setStartTime(savedForm.time?.split(' - ')[0]);
			setEndTime(savedForm.time?.split(' - ')[1]);
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		if (!loading && form) {
			localStorage.setItem('formThree', JSON.stringify(form));
		}
	}, [form]);

	return (
		<Card className='flex flex-grow flex-col bg-white hover:shadow-md transition-shadow w-fit h-fit z-10 py-4 sm:px-8 px-0'>
			<CardHeader className='text-center'>
				<h4 className='text-base text-dark font-bold leading-none'>ACTIVITY FORM 3</h4>
				<CardDescription className='text-gray-600'>(Fund-Raising)</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-4 relative'>
				<Separator className='my-2' />
				<div className='flex flex-col w-full items-center gap-2'>
					<div className='flex text-center items-center justify-center gap-2'>
						<h4 className='font-semibold text-center text-sm'>Academic&#160;Year</h4>
						<Input
							type='text'
							id='academicYear'
							value={form.academicYear || ''}
							placeholder={academicYear}
							onChange={onChange}
							className='w-28 text-center text-sm'
						/>
					</div>
					<div id='academicYear' className='flex sm:flex-row flex-col gap-2 sm:items-center'>
						<div className='flex gap-2 items-end'>
							<Checkbox
								id='firstSem'
								checked={isCheckedFirstSem}
								onCheckedChange={(e) => {
									onCheckedSemester({ target: { id: 'firstSem', value: isCheckedFirstSem } });
								}}
							/>
							<div className='grid gap-1.5 leading-none'>
								<label
									htmlFor='firstSem'
									className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
								>
									1st&#160;Sem
								</label>
							</div>
						</div>
						<div className=' text-slate-300 font-thin sm:block hidden'>|</div>
						<div className='flex gap-2 items-end'>
							<Checkbox
								id='secondSem'
								checked={isCheckedSecondSem}
								onCheckedChange={(e) => {
									onCheckedSemester({ target: { id: 'secondSem', value: isCheckedSecondSem } });
								}}
							/>
							<div className='grid gap-1.5 leading-none'>
								<label
									htmlFor='secondSem'
									className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
								>
									2nd&#160;Sem
								</label>
							</div>
						</div>
						<div className=' text-slate-300 font-thin sm:block hidden'>|</div>
						<div className='flex gap-2 items-end'>
							<Checkbox
								id='summerSem'
								checked={isCheckedSummerSem}
								onCheckedChange={(e) => {
									onCheckedSemester({ target: { id: 'summerSem', value: isCheckedSummerSem } });
								}}
							/>
							<div className='grid gap-1.5 leading-none'>
								<label
									htmlFor='summerSem'
									className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
								>
									Summer
								</label>
							</div>
						</div>
					</div>
				</div>
				<Separator className='my-2' />
				<div className='flex sm:flex-row flex-col justify-center sm:gap-10 gap-4 items-center'>
					<div className='grid w-full sm:max-w-sm items-center gap-1.5'>
						<Label htmlFor='organizationName'>Organization Name</Label>
						<Input
							type='text'
							id='organizationName'
							value={form.organizationName || ''}
							placeholder='Enter name of organization'
							onChange={onChange}
						/>
					</div>
					<div className='grid w-full sm:max-w-sm items-center gap-1.5'>
						<Label htmlFor='typeOfActivity'>Type of Activity</Label>
						<Input
							type='text'
							id='typeOfActivity'
							value={form.typeOfActivity || ''}
							placeholder='Enter name of the activity'
							onChange={onChange}
						/>
					</div>
				</div>
				<div className='flex sm:flex-row flex-col justify-center sm:gap-10 gap-4 items-center'>
					<div className='grid w-full sm:max-w-sm items-center gap-1.5'>
						<Label htmlFor='date'>Date of Activity</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={'outline'}
									className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
								>
									<CalendarIcon className='mr-2 h-4 w-4' />
									{date ? format(date, 'PPP') : <span>Pick a date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className='p-0'>
								<Calendar id='date' mode='single' selected={date} onSelect={setDate} initialFocus />
							</PopoverContent>
						</Popover>
					</div>
					<div className='flex flex-1 w-full sm:max-w-sm items-center gap-4'>
						<div className='flex flex-col w-full min-w-[118px] items-start justify-start gap-1.5'>
							<Label htmlFor='startTime'>Start Time</Label>
							<CustomTimePicker id='startTime' value={startTime} onChange={(newValue) => setStartTime(newValue)} />
						</div>
						<div className='flex flex-col w-full min-w-[118px] items-start justify-start gap-1.5'>
							<Label htmlFor='endTime'>End Time</Label>
							<CustomTimePicker id='endTime' value={endTime} onChange={(newValue) => setEndTime(newValue)} />
						</div>
					</div>
				</div>
				<div className='flex sm:flex-row flex-col justify-center gap-10 sm:items-end items-center'>
					<div className='grid w-full sm:max-w-sm items-center gap-1.5'>
						<Label htmlFor='venue'>Venue</Label>
						<Input
							type='text'
							id='venue'
							value={form.venue || ''}
							placeholder='Enter name of venue'
							onChange={onChange}
						/>
					</div>
					<div className='grid w-full sm:max-w-sm items-center gap-1.5'></div>
				</div>
				<Separator className='my-2' />
				<CashFlow onChange={onChange} form={form} />
				<Separator className='my-2' />
				<div className='flex flex-col items-center justify-evenly w-full '>
					<h4 className='font-semibold text-center'>Signatories</h4>
					<div className='flex sm:flex-row flex-col w-full gap-4 mt-4'>
						<div className='flex sm:flex-row flex-col rounded-lg bg-gray-100 p-4 text-dark w-full hover:shadow-md focus-within:shadow-md transition-shadow items-end justify-center gap-4'>
							<div className='w-full'>
								<label htmlFor='president' className='text-sm font-medium leading-none'>
									Submitted&#160;by:
								</label>
								<Input
									id='president'
									value={form.president || ''}
									placeholder='Enter complete name'
									className='rounded-none border-t-0 border-x-0 border-gray-400 bg-transparent text-dark text-sm font-medium leading-none focus-visible:bg-transparent text-center focus-within:placeholder-transparent'
									onChange={onChange}
								/>
								<p className='text-xs font-medium leading-none justify-center mt-2 text-center'>President</p>
							</div>
							<div className='w-full'>
								<Input
									id='treasurer'
									value={form.treasurer || ''}
									placeholder='Enter complete name'
									className='rounded-none border-t-0 border-x-0 border-gray-400 bg-transparent text-dark text-sm font-medium leading-none focus-visible:bg-transparent text-center focus-within:placeholder-transparent'
									onChange={onChange}
								/>
								<p className='text-xs font-medium leading-none justify-center mt-2 text-center'>Faculty-Adviser</p>
							</div>
						</div>

						<div className='rounded-lg bg-gray-100 p-4 text-dark md:w-1/2 w-full hover:shadow-md focus-within:shadow-md transition-shadow'>
							<label htmlFor='endorsedBy' className='text-sm font-medium leading-none'>
								Endorsed&#160;by:
							</label>
							<Input
								id='endorsedBy'
								value={form.endorsedBy || ''}
								placeholder='Enter complete name'
								className='rounded-none border-t-0 border-x-0 border-gray-400 bg-transparent text-dark text-sm font-medium leading-none focus-visible:bg-transparent text-center focus-within:placeholder-transparent'
								onChange={onChange}
							/>
							<p className='text-xs font-medium leading-none justify-center mt-2 text-center'>Dean/Department Chair</p>
						</div>
					</div>
				</div>
				<div className='flex flex-col items-center justify-evenly w-full my-4 text-justify'>
					<p className='text-xs'>
						<span className='font-semibold'>NOTE:</span> Accomplish this form in duplicate three (3) days before the
						activity. List of Participants with corresponding Parent’s Permits for activities held outside the campus
						and note of commitment from the faculty-adviser.
					</p>
					<br />
					<p className='text-xs font-semibold'>
						Activity permit must be claimed before the date of activity. Otherwise, this permit will no longer be given
						to the organization.
					</p>
				</div>
				<div className='flex items-center justify-between w-full text-justify'>
					<Button variant={'outline'} type='button'>
						Reset
					</Button>
					<SheetToPDF formContent={form} />
				</div>
			</CardContent>
		</Card>
	);
};

export default FormThree;
