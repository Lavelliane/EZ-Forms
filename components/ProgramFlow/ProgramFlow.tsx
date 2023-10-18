'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { CustomTimePicker } from '@/components/ui/time-picker';
import PopoverNature from '../../components/PopoverNature';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { IProgramFlow, ProgramFlowRequest } from '@/types';
import { defaultForm1, defaultProgramFlow } from '../../default';
import { IoSparklesOutline } from 'react-icons/io5';
import { useMutation } from '@tanstack/react-query';
import getFormOneFields from '@/mutations/getFormOneFields';
import ComboboxPosition from './ComboboxPosition';
import SliderProficiencyLevel, { ProficiencyLevel, proficiencyLevels } from './SliderProficiencyLevel';
import TabActivitySettings from './TabActivitySettings';
import SheetToPDF from './SheetToPDF';
import getProgramFlowFields from '@/mutations/getProgramFlowFields';
import { FlowTable } from './FlowTable';
import { start } from 'repl';

const ProgramFlow = () => {
	const [form, setForm] = useState<IProgramFlow>(defaultProgramFlow);
	const [academicYear, setAcademicYear] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [date, setDate] = useState<Date>();

	const [isCheckedPosition, setIsCheckedPosition] = useState(false);
	const [presentationMode, setPresentationMode] = useState<any>('');
	const [selectedPosition, setSelectedPosition] = useState<string>('');
	const [selectedProficiencyLevel, setSelectedProficiencyLevel] = useState<number>(3);

	// ########### Input Box Form Updates
	const onChange = (e: any) => {
		setForm({ ...form, [e.target.id]: e.target.value });
	};

	// ########### Program Flow Table
	const { mutate: generateProgramFlow, isLoading } = useMutation({
		mutationFn: getProgramFlowFields,
		onSuccess: (data) => {
			setForm({ ...form, ['programFlow']: data });
		},
	});

	// ########### Proficiency Level
	const handleProficiencyChange = (level: number) => {
		// Use the selected proficiency level from the slider
		setSelectedProficiencyLevel(level);
		// Update the form state with the selected proficiency level
		setForm({ ...form, proficiencyLevel: proficiencyLevels[level - 1].label });
	};

	// ########### Organizer Position
	const onCheckedPosition = (e: any) => {
		if (e.target.id === 'otherPosition') {
			setIsCheckedPosition(!isCheckedPosition);
		}
	};

	useEffect(() => {
		if (isCheckedPosition) {
			setForm({ ...form, ['organizerPosition']: form.organizerPosition });
		} else if (!isCheckedPosition) {
			setForm({ ...form, ['organizerPosition']: selectedPosition });
		}
	}, [isCheckedPosition]);

	useEffect(() => {
		if (isCheckedPosition) {
			setForm({ ...form, ['organizerPosition']: form.organizerPosition });
		} else if (!isCheckedPosition) {
			setForm({ ...form, ['organizerPosition']: selectedPosition });
		}
	}, [selectedPosition]);

	// ########### Date & Time
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




	//console.log(form);


	return (
		<Card className='flex flex-grow flex-col bg-white hover:shadow-md transition-shadow w-fit h-fit z-10 py-4 sm:px-8 px-0'>
			<CardHeader className='text-center'>
				<h4 className='text-base text-dark font-bold leading-none'>PROGRAM FLOW</h4>
				<CardDescription className='text-gray-600'>(Program Flow for General Activity Form 1)</CardDescription>
			</CardHeader>

			<CardContent className='flex flex-col gap-4 relative justify-center'>
				{/* ---------- Top Section ---------- */}
				<div className='flex flex-col w-full items-center gap-2'>
					<div className='flex text-center items-center justify-center gap-2'>
						<h4 className='font-semibold text-center text-sm'>Academic&#160;Year</h4>
						<Input
							type='text'
							id='academicYear'
							value={form.academicYear}
							placeholder={academicYear}
							onChange={onChange}
							className='w-28 text-center text-sm'
						/>
					</div>
					<Separator className='my-2 max-w-lg' />
					<div className='flex flex-col w-full text-center items-center justify-center gap-1.5'>
						<h4 className='font-semibold text-center text-sm'>Name&#160;of&#160;Organization</h4>
						<Input
							type='text'
							id='organizationName'
							placeholder='Enter name of organization'
							onChange={onChange}
							className='text-center sm:w-full md:w-1/2'
						/>
					</div>
				</div>
				<Separator className='my-2' />

				{/* ---------- Event Details Section ---------- */}
				<div className='flex sm:flex-row flex-col justify-center sm:gap-6 gap-2'>
					<div className={`flex flex-col pb-5 pt-5 gap-4 w-full h-fit rounded-lg`}>
						<div className='grid w-full sm:max-w-sm items-center gap-1.5'>
							<Label htmlFor='eventName'>Name of Activity</Label>
							<Input type='text' id='eventName' placeholder='Enter name of activity' onChange={onChange} />
						</div>
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
						<div className='grid w-full sm:max-w-sm items-center gap-1.5'>
							<Label htmlFor='venue'>Venue of Activity</Label>
							<Input type='text' id='venue' placeholder='Enter venue of activity' onChange={onChange} />
						</div>
					</div>
					<div className={`flex flex-col pb-5 pt-5 gap-4 w-full h-fit rounded-lg`}>
						<div className='grid w-full sm:max-w-sm items-center gap-1.5'>
							<Label htmlFor='headOrganizer'>Name of Head Organizer</Label>
							<Input type='text' id='headOrganizer' placeholder='Enter name of head organizer' onChange={onChange} />
						</div>
						<div className='grid w-full sm:max-w-sm items-center gap-1.5'>
							<Label htmlFor='headOrganizer'>Position</Label>
							<div className='flex w-full items-center justify-between gap-4'>
								<div className={`flex flex-col w-full transition-transform ${isCheckedPosition ? 'hidden' : ''}`}>
									<ComboboxPosition
										selectedPosition={selectedPosition}
										onPositionChange={(position) => {
											setSelectedPosition(position);
										}}
									/>
								</div>
								<div className={`flex w-full transition-transform ${isCheckedPosition ? '' : 'hidden'}`}>
									<Input
										type='text'
										id='organizerPosition'
										placeholder='Enter position of head organizer'
										onChange={onChange}
									/>
								</div>
								<div className='flex gap-2 items-end'>
									<Checkbox
										id='otherPosition'
										checked={isCheckedPosition}
										onCheckedChange={(e) => {
											onCheckedPosition({ target: { id: 'otherPosition', value: isCheckedPosition } });
										}}
									/>
									<div className='grid gap-1.5 leading-none'>
										<label
											htmlFor='otherPosition'
											className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
										>
											Other
										</label>
									</div>
								</div>
							</div>
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
				</div>
				<Separator className='my-2' />

				{/* ---------- Prophesize Settings Section ---------- */}
				<div className='flex sm:flex-row flex-col justify-center sm:gap-6 gap-2'>
					<div className={`flex flex-col pb-5 pt-5 gap-4 w-full h-fit rounded-lg`}>
						<div className='flex flex-col w-full gap-2 items-center justify-center'>
							<span className='flex gap-2 items-center'>
								<h4 className='font-semibold text-center'>Proficiency&#160;on&#160;the&#160;Topic</h4>
								<PopoverNature
									heading='Proficiency Level'
									description='The intended participants’ estimated level of skill or knowledge on the activity. This metric will be used to fine-tune the program flow generation.'
								/>
							</span>
							<SliderProficiencyLevel
								proficiencyLevels={proficiencyLevels}
								onProficiencyChange={handleProficiencyChange}
							/>
						</div>
					</div>
					<div className={`flex flex-col pb-5 pt-5 gap-4 w-full h-fit rounded-lg`}>
						<div className='flex flex-col w-full gap-2 items-center justify-center'>
							<span className='flex gap-2 items-center'>
								<h4 className='font-semibold text-center'>Modes&#160;of&#160;Presentation</h4>
								<PopoverNature
									heading='Modes of Presentation'
									description='Select specific components you would like to add in certain parts of your activity, or leave it all off and let magic do its thing.'
								/>
							</span>
							<TabActivitySettings onChange={onChange} />

							<div className='w-full flex flex-col gap-2 items-center -translate-x-[78px]'>
								<div className='flex'>
									{!form.eventName || (startTime === endTime) ? (
										<p className=' text-red-500 text-xs'>Activity name, start and end times required.</p>
									) : (
										''
									)}
								</div>
								<div className='-translate-x-[70px]'>
									<Button
										disabled={!form.eventName || !form.modeOfPresentation || (startTime === endTime) || isLoading}
										type='submit'
										onClick={async (e) => {
											setPresentationMode('faceToFace');
											await generateProgramFlow({
												eventName: form.eventName,
												type: form.modeOfPresentation,
												startTime: form.time.split(' - ')[0],
												endTime: form.time.split(' - ')[1],
											});
										}}
										className='border border-purpleLight bg-transparent p-2 text-purpleLight hover:bg-purpleLight hover:text-white transition-color'
									>
										<span className='mr-1'>{isLoading ? 'Loading..' : 'Prophesize'}</span>
										<IoSparklesOutline />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Separator className='my-2' />

				{/* ---------- Table Section ---------- */}
				<div className='flex flex-col justify-center sm:gap-6 gap-2'>
					<p>Program Flow</p>
					<FlowTable onChange={onChange} form={form} />
				</div>
				<Separator className='my-2' />


				{/* ---------- Footer Section ---------- */}
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
					<Button variant={'outline'} type='button'>
						Reset
					</Button>
					<SheetToPDF formContent={form} />
				</div>
			</CardContent>
		</Card>
	);
};

export default ProgramFlow;
