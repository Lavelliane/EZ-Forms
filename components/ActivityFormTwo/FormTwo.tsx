'use client';
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
import { Textarea } from '@/components/ui/textarea';
import { IFormTwo, FormOneRequest } from '@/types';
import { defaultForm2 } from '../../default';
import SheetToPDF from './SheetToPDF';
import { IoSparklesOutline } from 'react-icons/io5';
import { useMutation } from '@tanstack/react-query';
import getFormOneFields from '@/mutations/getFormOneFields';

const FormTwo = () => {
	const [form, setForm] = useState<IFormTwo>(defaultForm2);
	const [academicYear, setAcademicYear] = useState('');
	const [isCheckedOrganizer, setIsCheckedOrganizer] = useState(false);
	const [isCheckedParticipant, setIsCheckedParticipant] = useState(false);
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [date, setDate] = useState<Date>();

	const { mutate: generateFormTwo } = useMutation({
		mutationFn: getFormOneFields,
		onSuccess: (data) => {
			setForm({ ...form, ['agenda']: data });
		},
	});

	const onCheckedInvolvement = (e: any) => {
		if (e.target.id === 'organizer') {
			setIsCheckedOrganizer(!isCheckedOrganizer);
			setIsCheckedParticipant(false);
		} else if (e.target.id === 'participant') {
			setIsCheckedOrganizer(false);
			setIsCheckedParticipant(!isCheckedParticipant);
		}
		setForm({ ...form, ['involvement']: e.target.id });
	};

	const onChange = (e: any) => {
		setForm({ ...form, [e.target.id]: e.target.value });
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

	useEffect(() => {
		setForm({ ...form, ['time']: startTime + ' - ' + endTime });
	}, [startTime, endTime]);

	return (
		<Card className='flex flex-grow flex-col bg-white hover:shadow-md transition-shadow w-fit h-fit z-10 py-4 sm:px-8 px-0'>
			<CardHeader className='text-center'>
				<h4 className='text-base text-dark font-bold leading-none'>ACTIVITY FORM 2</h4>
				<CardDescription className='text-gray-600'>(General Meetings/ Assemblies)</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-4 relative'>
				<Separator className='my-2' />
				<div className='flex sm:flex-row flex-col justify-center gap-10 sm:items-end items-center'>
					<div className='grid w-full items-center gap-1.5'>
						<Label htmlFor='organizationName'>Organization Name</Label>
						<Input type='text' id='organizationName' placeholder='Enter name of organization' onChange={onChange} />
					</div>
				</div>

				<div className='flex sm:flex-row flex-col justify-center sm:gap-10 gap-4 items-center'>
					<div className='grid w-full items-center gap-1.5'>
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
					<div className='grid w-full sm:max-w-sm items-center gap-1.5'>
						<Label htmlFor='venue'>Venue</Label>
						<Input type='text' id='venue' placeholder='Enter name of venue' onChange={onChange} />
					</div>
				</div>

				<div className='flex sm:flex-row flex-col justify-center sm:gap-6 gap-2 items-center'>
					<h4 className='transition-transform font-semibold self-center w-fit z-10'>Nature&#160;of&#160;Involvement</h4>
					<div
						className={`flex flex-col p-4 gap-4 w-full h-fit rounded-lg transition-colors ${
							isCheckedOrganizer ? 'bg-purple-100' : ''
						}`}
					>
						<div className='flex gap-2 items-end'>
							<Checkbox
								id='organizer'
								checked={isCheckedOrganizer}
								onCheckedChange={(e) => {
									onCheckedInvolvement({ target: { id: 'organizer', value: isCheckedOrganizer } });
								}}
							/>
							<div className='grid gap-1.5 leading-none'>
								<label
									htmlFor='organizer'
									className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
								>
									Organizer/Sponsor
								</label>
							</div>
						</div>
					</div>
					<div
						className={`flex flex-col p-4 gap-4 w-full h-fit rounded-lg transition-colors ${
							isCheckedParticipant ? 'bg-purple-100' : ''
						}`}
					>
						<div className='flex gap-2 items-end'>
							<Checkbox
								id='participant'
								checked={isCheckedParticipant}
								onCheckedChange={(e) => {
									onCheckedInvolvement({ target: { id: 'participant', value: isCheckedParticipant } });
								}}
							/>
							<div className='grid gap-1.5 leading-none'>
								<label
									htmlFor='organizer'
									className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
								>
									Participant
								</label>
							</div>
						</div>
					</div>
				</div>
				<div className='flex sm:flex-row flex-col items-center justify-center gap-6 w-full'>
					<div className='w-full flex flex-col gap-4 border items-start border-purple-100 rounded-lg p-6 focus-within:shadow-md transition-shadow'>
						<div className='flex flex-row items-center gap-4'>
							<h4 className='font-semibold text-center'>Agenda</h4>
						</div>
						<Textarea
							placeholder='Enter agenda or auto-generate with CharmScript...'
							id='agenda'
							className='resize-none'
							onChange={onChange}
							value={form.agenda || ''}
						/>
						{!form.organizationName ? (
							<p className=' text-red-500 text-xs'>Organization and activity names required.</p>
						) : (
							''
						)}
						<Button
							disabled={!form.organizationName}
							type='submit'
							className='border border-purpleLight bg-transparent p-2 text-purpleLight  hover:bg-purpleLight hover:text-white transition-color'
						>
							<span className='mr-1'>CharmScript</span>
							<IoSparklesOutline />
						</Button>
					</div>
				</div>
				<Separator className='my-4' />
				<div className='flex flex-col items-center justify-evenly w-full '>
					<h4 className='font-semibold text-center'>Signatories</h4>
					<div className='flex sm:flex-row flex-col w-full gap-4 mt-4'>
						<div className='rounded-lg bg-purple-100 p-4 text-dark w-full hover:shadow-md focus-within:shadow-md transition-shadow'>
							<label htmlFor='recommendedBy' className='text-sm font-medium leading-none'>
								Recommended&#160;by:
							</label>
							<Input
								id='recommendedBy'
								placeholder='Enter complete name'
								className='rounded-none border-t-0 border-x-0 border-gray-400 bg-transparent text-dark text-sm font-medium leading-none focus-visible:bg-transparent'
								onChange={onChange}
							/>
							<p className='text-xs font-medium leading-none justify-center mt-2 text-center'>
								President of the Student Organization
							</p>
						</div>
						<div className='rounded-lg bg-purple-100 p-4 text-dark w-full hover:shadow-md focus-within:shadow-md transition-shadow'>
							<label htmlFor='endorsedBy' className='text-sm font-medium leading-none'>
								Endorsed&#160;by:
							</label>
							<Input
								id='endorsedBy'
								placeholder='Enter complete name'
								className='rounded-none border-t-0 border-x-0 border-gray-400 bg-transparent text-dark text-sm font-medium leading-none focus-visible:bg-transparent'
								onChange={onChange}
							/>
							<p className='text-xs font-medium leading-none justify-center mt-2 text-center'>Faculty-Adviser</p>
						</div>
						<div className='rounded-lg bg-purple-100 p-4 text-dark w-full hover:shadow-md focus-within:shadow-md transition-shadow'>
							<label htmlFor='notedBy' className='text-sm font-medium leading-none'>
								Noted&#160;by:
							</label>
							<Input
								id='notedBy'
								placeholder='Enter complete name'
								className='rounded-none border-t-0 border-x-0 border-gray-400 bg-transparent text-dark text-sm font-medium leading-none focus-visible:bg-transparent'
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

export default FormTwo;
