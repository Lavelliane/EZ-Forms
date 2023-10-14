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
import { format, set } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import PopoverNature from '../../components/PopoverNature';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { IFormOne, FormOneRequest } from '@/types';
import { defaultForm1 } from '../../default';
import SheetToPDF from './SheetToPDF';
import { IoSparklesOutline } from 'react-icons/io5';
import { useMutation } from '@tanstack/react-query';
import getFormOneFields from '@/mutations/getFormOneFields';

const FormOne = () => {
	const [form, setForm] = useState<IFormOne>(defaultForm1);
	const [loading, setLoading] = useState(true);
	const [academicYear, setAcademicYear] = useState('');
	const [isCheckedFirstSem, setIsCheckedFirstSem] = useState(false);
	const [isCheckedSecondSem, setIsCheckedSecondSem] = useState(false);
	const [isCheckedSummerSem, setIsCheckedSummerSem] = useState(false);
	const [isCheckedCo, setIsCheckedCo] = useState(false);
	const [isCheckedExtra, setIsCheckedExtra] = useState(false);
	const [isCheckedIn, setIsCheckedIn] = useState(false);
	const [isCheckedOff, setIsCheckedOff] = useState(false);
	const [isCheckedScientia, setIsCheckedScientia] = useState(false);
	const [isCheckedVirtus, setIsCheckedVirtus] = useState(false);
	const [isCheckedDevotio, setIsCheckedDevotio] = useState(false);
	const [isCheckedOrganization, setIsCheckedOrganization] = useState(false);
	const [isCheckedOrganizer, setIsCheckedOrganizer] = useState(false);
	const [isCheckedParticipant, setIsCheckedParticipant] = useState(false);
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [date, setDate] = useState<Date>();
	const [outputType, setOutputType] = useState<any>('');

	const { mutate: generateFormOne, isLoading } = useMutation({
		mutationFn: getFormOneFields,
		onSuccess: (data) => {
			if (outputType === 'description') {
				setForm({ ...form, ['description']: data });
			} else if (outputType === 'objective') {
				setForm({ ...form, ['objective']: data });
			}
		},
	});

	const onCheckedCurricular = (e: any) => {
		if (e.target.id === 'coCurricular') {
			setIsCheckedCo(!isCheckedCo);
			setIsCheckedExtra(false);
		} else if (e.target.id === 'extraCurricular') {
			setIsCheckedCo(false);
			setIsCheckedExtra(!isCheckedExtra);
		}
		setForm({ ...form, ['curricular']: e.target.id });
	};

	const onCheckedCampus = (e: any) => {
		if (e.target.id === 'inCampus') {
			setIsCheckedIn(!isCheckedIn);
			setIsCheckedOff(false);
		} else if (e.target.id === 'offCampus') {
			setIsCheckedIn(false);
			setIsCheckedOff(!isCheckedOff);
		}
		setForm({ ...form, ['campus']: e.target.id });
	};

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

	const onCheckedNature = (e: any) => {
		if (e.target.id === 'scientia') {
			setIsCheckedScientia(!isCheckedScientia);
		} else if (e.target.id === 'virtus') {
			setIsCheckedVirtus(!isCheckedVirtus);
		} else if (e.target.id === 'devotio') {
			setIsCheckedDevotio(!isCheckedDevotio);
		} else if (e.target.id === 'organization') {
			setIsCheckedOrganization(!isCheckedOrganization);
		}
	};

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
	console.log(date);
	useEffect(() => {
		const natureForm = [
			isCheckedScientia && 'scientia',
			isCheckedVirtus && 'virtus',
			isCheckedDevotio && 'devotio',
			isCheckedOrganization && 'organization',
		]
			.filter(Boolean)
			.join(', ');

		setForm({ ...form, ['natureOfActivity']: natureForm });
	}, [isCheckedScientia, isCheckedVirtus, isCheckedDevotio, isCheckedOrganization]);

	// Load the object from local storage when the component mounts
	useEffect(() => {
		const savedForm = JSON.parse(localStorage.getItem('formOne') || '{}');
		if (savedForm) {
			setForm(savedForm);
			setIsCheckedFirstSem(savedForm.semester === 'firstSem');
			setIsCheckedSecondSem(savedForm.semester === 'secondSem');
			setIsCheckedSummerSem(savedForm.semester === 'summerSem');
			setIsCheckedCo(savedForm.curricular === 'coCurricular');
			setIsCheckedExtra(savedForm.curricular === 'extraCurricular');
			setIsCheckedIn(savedForm.campus === 'inCampus');
			setIsCheckedOff(savedForm.campus === 'offCampus');
			setIsCheckedScientia(savedForm.natureOfActivity.includes('scientia'));
			setIsCheckedVirtus(savedForm.natureOfActivity.includes('virtus'));
			setIsCheckedDevotio(savedForm.natureOfActivity.includes('devotio'));
			setIsCheckedOrganization(savedForm.natureOfActivity.includes('organization'));
			setIsCheckedOrganizer(savedForm.involvement === 'organizer');
			setIsCheckedParticipant(savedForm.involvement === 'participant');
			setStartTime(savedForm.time?.split(' - ')[0]);
			setEndTime(savedForm.time?.split(' - ')[1]);
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		if (!loading && form) {
			localStorage.setItem('formOne', JSON.stringify(form));
		}
	}, [form]);

	return (
		<Card className='flex flex-grow flex-col bg-white hover:shadow-md transition-shadow w-fit h-fit z-10 py-4 sm:px-8 px-0'>
			<CardHeader className='text-center'>
				<h4 className='text-base text-dark font-bold leading-none'>ACTIVITY FORM 1</h4>
				<CardDescription className='text-gray-600'>(General Activity Form for Student Organizations)</CardDescription>
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
				<div className='flex sm:flex-row flex-col justify-center gap-10 sm:items-end items-center'>
					<div className='grid w-full sm:max-w-sm items-center gap-1.5'>
						<Label htmlFor='organizationName'>Organization Name</Label>
						<Input
							type='text'
							id='organizationName'
							placeholder='Enter name of organization'
							onChange={onChange}
							value={form.organizationName || ''}
						/>
					</div>
					<div className='flex flex-1 w-full sm:max-w-sm items-center h-10'>
						<div className='flex items-center w-full justify-evenly gap-1'>
							<div className='flex gap-2 items-end'>
								<Checkbox
									id='coCurricular'
									checked={isCheckedCo}
									onCheckedChange={(e) => {
										onCheckedCurricular({ target: { id: 'coCurricular', value: isCheckedCo } });
									}}
								/>
								<div className='grid gap-1.5 leading-none'>
									<label
										htmlFor='coCurricular'
										className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
									>
										Co&#8209;curricular
									</label>
								</div>
							</div>
							<div className=' text-slate-300 font-thin'>|</div>
							<div className='flex gap-2 items-end'>
								<Checkbox
									id='extraCurricular'
									checked={isCheckedExtra}
									onCheckedChange={(e) => {
										onCheckedCurricular({ target: { id: 'extraCurricular', value: isCheckedExtra } });
									}}
								/>
								<div className='grid gap-1.5 leading-none'>
									<label
										htmlFor='extraCurricular'
										className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
									>
										Extra&#8209;curricular
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					className={`flex sm:flex-row flex-col justify-center sm:gap-10 gap-4 items-center transition-transform ${
						isCheckedCo ? '' : 'hidden'
					}`}
				>
					<div className='grid w-full sm:max-w-sm items-center gap-1.5'>
						<Label htmlFor='department'>Department</Label>
						<Input
							type='text'
							id='department'
							value={form.department || ''}
							placeholder='Enter name of department'
							onChange={onChange}
						/>
					</div>
					<div className='grid w-full sm:max-w-sm items-center gap-1.5'>
						<Label htmlFor='school'>School</Label>
						<Input
							type='text'
							id='school'
							value={form.school || ''}
							placeholder='Enter name of school/college'
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
				<div className='flex sm:flex-row flex-col justify-center sm:gap-10 gap-4 sm:items-end items-center'>
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
					<div className='flex flex-1 sm:max-w-sm items-center h-10'>
						<div className='flex items-center w-full justify-evenly gap-1'>
							<div className='flex gap-2 items-end min-w-[118px]'>
								<Checkbox
									id='inCampus'
									checked={isCheckedIn}
									onCheckedChange={(e) => {
										onCheckedCampus({ target: { id: 'inCampus', value: isCheckedIn } });
									}}
								/>
								<div className='grid gap-1.5 leading-none'>
									<label
										htmlFor='inCampus'
										className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
									>
										In&#160;Campus
									</label>
								</div>
							</div>
							<div className=' text-slate-300 font-thin'>|</div>
							<div className='flex gap-2 items-end  min-w-[118px]'>
								<Checkbox
									id='offCampus'
									checked={isCheckedOff}
									onCheckedChange={(e) => {
										onCheckedCampus({ target: { id: 'offCampus', value: isCheckedOff } });
									}}
								/>
								<div className='grid gap-1.5 leading-none'>
									<label
										htmlFor='offCampus'
										className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
									>
										Off&#160;Campus
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='flex sm:flex-row flex-col justify-center sm:gap-10 gap-4 sm:items-end items-center'>
					<div className='grid w-full md:sm:max-w-sm items-center gap-1.5'>
						<Label htmlFor='activityName'>Activity Name</Label>
						<Input
							type='text'
							id='activityName'
							value={form.activityName || ''}
							placeholder='Enter name of the activity'
							onChange={onChange}
						/>
					</div>
					<div className='md:flex hidden flex-1 sm:max-w-sm items-center h-10'></div>
				</div>
				<Separator className='my-2' />
				<div className='flex flex-col w-full gap-2 items-center justify-center'>
					<h4 className='font-semibold text-center'>Nature&#160;of&#160;Activity</h4>
					<div id='natureOfActivity' className='flex sm:flex-row flex-col gap-2 items-center justify-center w-full'>
						<div className='flex gap-2 items-center'>
							<Checkbox
								id='scientia'
								checked={isCheckedScientia}
								onCheckedChange={(e) => {
									onCheckedNature({ target: { id: 'scientia', value: isCheckedScientia } });
								}}
							/>
							<div className='flex gap-1.5 leading-none'>
								<label
									htmlFor='scientia'
									className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
								>
									Scientia
								</label>
								<PopoverNature
									heading='Scientia'
									description='Activities that enhances academic excellence and/or becoming a professionally competent student in the
						chosen field of study.'
								/>
							</div>
							<div className=' text-slate-300 font-thin'>|</div>

							<Checkbox
								id='virtus'
								checked={isCheckedVirtus}
								onCheckedChange={(e) => {
									onCheckedNature({ target: { id: 'virtus', value: isCheckedVirtus } });
								}}
							/>
							<div className='flex gap-1.5 leading-none'>
								<label
									htmlFor='virtus'
									className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
								>
									Virtus
								</label>
								<PopoverNature
									heading='Virtus'
									description='Activities that will help us achieve good character, leadership, discipline, intrapersonal & interpersonal skills, and well-being.'
								/>
							</div>
						</div>
						<div className=' text-slate-300 font-thin sm:block hidden'>|</div>
						<div className='flex gap-2 items-center'>
							<Checkbox
								id='devotio'
								checked={isCheckedDevotio}
								onCheckedChange={(e) => {
									onCheckedNature({ target: { id: 'devotio', value: isCheckedDevotio } });
								}}
							/>
							<div className='flex gap-1.5 leading-none'>
								<label
									htmlFor='devotio'
									className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
								>
									Devotio
								</label>
								<PopoverNature
									heading='Devotio'
									description="Activities that addresses prevailing social realities, activates one's kindness, compassion, service, being philanthropic etc., allows one to volunteer one's expertise, and gives back valued contribution to others or the community."
								/>
							</div>
							<div className=' text-slate-300 font-thin'>|</div>
							<Checkbox
								id='organization'
								checked={isCheckedOrganization}
								onCheckedChange={(e) => {
									onCheckedNature({ target: { id: 'organization', value: isCheckedOrganization } });
								}}
							/>
							<div className='flex gap-1.5 leading-none'>
								<label
									htmlFor='organization'
									className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
								>
									Organization
								</label>
								<PopoverNature
									heading='Organization'
									description='Activities that are done to run the organization effectively. E.g. meetings, assemblies.'
								/>
							</div>
						</div>
					</div>
				</div>
				<Separator className='mt-2' />
				<h4
					className={`transition-transform font-semibold self-center w-fit sm:translate-y-8 z-10
					${isCheckedOrganizer && !isCheckedParticipant ? 'sm:-translate-x-[70%]' : ''} ${
						isCheckedParticipant && !isCheckedOrganizer ? 'sm:translate-x-[70%]' : ''
					}`}
				>
					Nature&#160;of&#160;Involvement
				</h4>
				<div className='flex sm:flex-row flex-col justify-center sm:gap-6 gap-2 items-center'>
					<div
						className={`-translate-y-5 flex flex-col px-5 pb-5 sm:pt-14 pt-5 gap-4 w-full h-fit rounded-lg transition-colors ${
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
						<div className='grid w-full sm:max-w-sm items-center gap-1.5'>
							<Label htmlFor='participants'>Expected Participants</Label>
							<Input
								type='text'
								id='participants'
								value={isCheckedOrganizer ? form.participants || '' : ''}
								placeholder='Who are the expected participants?'
								onChange={onChange}
							/>
						</div>
						<div className='grid w-full sm:max-w-sm items-center gap-1.5'>
							<Label htmlFor='numberOfParticipants'>Number of Participants</Label>
							<Input
								type='number'
								id='numberOfParticipants'
								value={isCheckedOrganizer ? form.numberOfParticipants || '' : ''}
								placeholder='Enter number of participants'
								onChange={onChange}
							/>
						</div>
					</div>
					<div
						className={`-translate-y-5 flex flex-col px-5 pb-5 sm:pt-14 pt-5 gap-4 w-full h-fit rounded-lg transition-colors ${
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
						<div className='grid w-full sm:max-w-sm items-center gap-1.5'>
							<Label htmlFor='sponsor'>Sponsoring Organization</Label>
							<Input
								type='text'
								id='sponsor'
								value={isCheckedParticipant ? form.sponsor || '' : ''}
								placeholder='Who is the sponsoring organization/office?'
								onChange={onChange}
							/>
						</div>
						<div className='grid w-full sm:max-w-sm items-center gap-1.5'>
							<Label htmlFor='numberOfParticipants'>Number of Participants</Label>
							<Input
								type='number'
								id='numberOfParticipants'
								value={isCheckedParticipant ? form.numberOfParticipants || '' : ''}
								placeholder='Enter number of participants'
								onChange={onChange}
							/>
						</div>
					</div>
				</div>
				<div className='flex sm:flex-row flex-col items-center justify-center gap-6 w-full'>
					<div className='w-full flex flex-col gap-4 border items-start border-purple-100 rounded-lg p-6 focus-within:shadow-md transition-shadow'>
						<div className='flex flex-row items-center gap-4'>
							<h4 className='font-semibold text-center'>Description of the Activity</h4>
						</div>
						<Textarea
							placeholder='Enter short description or auto-generate with CharmScript...'
							id='description'
							className='resize-none'
							onChange={onChange}
							value={form.description || ''}
						/>
						{!form.activityName || !form.organizationName ? (
							<p className=' text-red-500 text-xs'>CharmScript requires organization and activity names.</p>
						) : (
							''
						)}
						<Button
							disabled={!form.activityName || !form.organizationName || isLoading}
							type='submit'
							onClick={(e) => {
								setOutputType('description');
								generateFormOne({
									eventName: form.activityName,
									orgName: form.organizationName,
									outputType: 'description',
								});
							}}
							className='border border-purpleLight bg-transparent p-2 text-purpleLight  hover:bg-purpleLight hover:text-white transition-color'
						>
							<span className='mr-1'>{isLoading ? 'Loading..' : 'CharmScript'}</span>
							<IoSparklesOutline />
						</Button>
					</div>
					<div className='w-full flex flex-col gap-4 border items-start border-purple-100 rounded-lg p-6 focus-within:shadow-md transition-shadow'>
						<div className='flex flex-row items-center gap-4'>
							<h4 className='font-semibold text-center'>Objective of the Activity</h4>
						</div>
						<Textarea
							placeholder='Enter objective or auto-generate with CharmScript...'
							id='objective'
							className='resize-none'
							onChange={onChange}
							value={form.objective || ''}
						/>
						{!form.activityName || !form.organizationName ? (
							<p className=' text-red-500 text-xs'>CharmScript requires organization and activity names.</p>
						) : (
							''
						)}
						<Button
							disabled={!form.activityName || !form.organizationName || isLoading}
							type='submit'
							onClick={(e) => {
								setOutputType('objective');
								generateFormOne({
									eventName: form.activityName,
									orgName: form.organizationName,
									outputType: 'objective',
								});
							}}
							className='border border-purpleLight bg-transparent p-2 text-purpleLight  hover:bg-purpleLight hover:text-white transition-color'
						>
							<span className='mr-1'>{isLoading ? 'Loading..' : 'CharmScript'}</span>
							<IoSparklesOutline />
						</Button>
					</div>
				</div>
				<Separator className='my-4' />
				<div className='flex flex-col items-center justify-evenly w-full '>
					<h4 className='font-semibold text-center'>Signatories</h4>
					<div className='flex sm:flex-row flex-col w-full gap-4 mt-4'>
						<div className='rounded-lg bg-gray-100 p-4 text-dark w-full hover:shadow-md focus-within:shadow-md transition-shadow'>
							<label htmlFor='recommendedBy' className='text-sm font-medium leading-none'>
								Recommended&#160;by:
							</label>
							<Input
								id='recommendedBy'
								placeholder='Enter complete name'
								value={form.recommendedBy || ''}
								className='rounded-none border-t-0 border-x-0 border-gray-400 bg-transparent text-dark text-sm font-medium leading-none focus-visible:bg-transparent text-center focus-within:placeholder-transparent'
								onChange={onChange}
							/>
							<p className='text-xs font-medium leading-none justify-center mt-2 text-center'>
								President of the Student Organization
							</p>
						</div>
						<div className='rounded-lg bg-gray-100 p-4 text-dark w-full hover:shadow-md focus-within:shadow-md transition-shadow'>
							<label htmlFor='endorsedBy' className='text-sm font-medium leading-none'>
								Endorsed&#160;by:
							</label>
							<Input
								id='endorsedBy'
								placeholder='Enter complete name'
								value={form.endorsedBy || ''}
								className='rounded-none border-t-0 border-x-0 border-gray-400 bg-transparent text-dark text-sm font-medium leading-none focus-visible:bg-transparent text-center focus-within:placeholder-transparent'
								onChange={onChange}
							/>
							<p className='text-xs font-medium leading-none justify-center mt-2 text-center'>Faculty-Adviser</p>
						</div>
						<div className='rounded-lg bg-gray-100 p-4 text-dark w-full hover:shadow-md focus-within:shadow-md transition-shadow'>
							<label htmlFor='notedBy' className='text-sm font-medium leading-none'>
								Noted&#160;by:
							</label>
							<Input
								id='notedBy'
								placeholder='Enter complete name'
								value={form.notedBy || ''}
								className='rounded-none border-t-0 border-x-0 border-gray-400 bg-transparent text-dark text-sm font-medium leading-none focus-visible:bg-transparent text-center focus-within:placeholder-transparent'
								onChange={onChange}
							/>
							<p className='text-xs font-medium leading-none justify-center mt-2 text-center'>Dean/Department Chair</p>
						</div>
					</div>
				</div>
				<div className='flex flex-col items-center justify-evenly w-full my-4 text-justify'>
					<p className='text-xs'>
						<span className='font-semibold'>DATA PRIVACY CONSENT:</span> I give my consent to the University of San
						Carlos to collect, generate, use, process, store and retain my personal data; and authorize USC to disclose
						these to accredited/affiliated parties, or independent/non-affiliated third parties, whether local or
						foreign: as necessary for the proper execution of processes related to the declared purpose; and /or as
						required or authorized by or under the law.
					</p>
				</div>
				<div className='flex items-center justify-between w-full text-justify'>
					<Button
						variant={'outline'}
						type='button'
						onClick={() => {
							localStorage.removeItem('formOne');
							setForm(defaultForm1);
							setIsCheckedFirstSem(false);
							setIsCheckedSecondSem(false);
							setIsCheckedSummerSem(false);
							setIsCheckedCo(false);
							setIsCheckedExtra(false);
							setIsCheckedIn(false);
							setIsCheckedOff(false);
							setIsCheckedScientia(false);
							setIsCheckedVirtus(false);
							setIsCheckedDevotio(false);
							setIsCheckedOrganization(false);
							setIsCheckedOrganizer(false);
							setIsCheckedParticipant(false);
							setStartTime('');
							setEndTime('');
						}}
					>
						Reset
					</Button>
					<SheetToPDF formContent={form} />
				</div>
			</CardContent>
		</Card>
	);
};

export default FormOne;
