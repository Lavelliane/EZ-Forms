'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import PopoverNature from '../../components/PopoverNature';
import { IProgramFlow, ProgramFlowRequest } from '@/types';
import { defaultForm1, defaultProgramFlow } from '../../default';
import TabActivitySettings from './TabActivitySettings'
import { IoSparklesOutline } from 'react-icons/io5';
import { useMutation } from '@tanstack/react-query';
import getFormOneFields from '@/mutations/getFormOneFields';
import ComboboxPosition from './ComboboxPosition';
import SliderProficiencyLevel from './SliderProficiencyLevel';

import { ProficiencyLevel, proficiencyLevels } from './SliderProficiencyLevel';


const ProgramFlow = () => {
	const [form, setForm] = useState<IProgramFlow>(defaultProgramFlow);
	const [academicYear, setAcademicYear] = useState('');
	const [isSelectedBeginner, setIsSelectedBeginner] = useState(false);
	const [isSelectedAmateur, setIsSelectedAmateur] = useState(false);
	const [isSelectedNovice, setIsSelectedNovice] = useState(false);
	const [isSelectedAdvanced, setIsSelectedAdvanced] = useState(false);
	const [isSelectedExpert, setIsSelectedExpert] = useState(false);
	const [isCheckedPosition, setIsCheckedPosition] = useState(false);

	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [date, setDate] = useState<Date>();
	const [outputType, setOutputType] = useState<any>('');

	const [selectedProficiencyLevel, setSelectedProficiencyLevel] = useState<number>(3);

	const { mutate: generateProgramFlow, isLoading } = useMutation({
		mutationFn: getFormOneFields,
		onSuccess: (data) => {
			if (outputType === 'description') {
				setForm({ ...form, ['activityName']: data });
			} else if (outputType === 'objective') {
				setForm({ ...form, ['activityName']: data });
			}
		},
	});

	const handleProficiencyChange = (level: number) => {
		// Use the selected proficiency level from the slider
		console.log(proficiencyLevels[level - 1].label);
		setSelectedProficiencyLevel(level);
		// Update the form state with the selected proficiency level
		setForm({ ...form, proficiencyLevel: proficiencyLevels[level - 1].label });
	  };
	  

	const onCheckedPosition = (e: any) => {
		if (e.target.id === 'otherPosition') {
			setIsCheckedPosition(!isCheckedPosition);
		}
	};

	const onChange = (e: any) => {
		setForm({ ...form, [e.target.id]: e.target.value });
	};

	useEffect(() => {
		const proficiencyForm = [
			isSelectedBeginner && 'beginner',
			isSelectedAmateur && 'amateur',
			isSelectedNovice && 'novice',
			isSelectedAdvanced && 'advanced',
			isSelectedExpert && 'expert',
		]
			.filter(Boolean)
			.join(', ');

		setForm({ ...form, ['proficiencyLevel']: proficiencyForm });
	}, [isSelectedBeginner, isSelectedAmateur, isSelectedNovice, isSelectedAdvanced, isSelectedExpert]);

	return (
		<Card className='flex flex-grow flex-col bg-white hover:shadow-md transition-shadow w-fit h-fit z-10 py-4 sm:px-8 px-0'>
			<CardHeader className='text-center'>
				<h4 className='text-base text-dark font-bold leading-none'>PROGRAM FLOW</h4>
				<CardDescription className='text-gray-600'>(Program Flow for General Activity Form 1)</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-4 relative'>
				<Separator className='my-2' />
				<div className='flex sm:flex-row flex-col justify-center sm:gap-6 gap-2'>
					<div className={`flex flex-col pb-5 pt-5 gap-4 w-full h-fit rounded-lg`}>
						<div className='grid w-full sm:max-w-sm items-center gap-1.5'>
								<Label htmlFor='headOrganizer'>Name of Head Organizer</Label>
								<Input type='text' id='headOrganizer' placeholder='Enter name of head organizer' onChange={onChange} />
						</div>
					</div>
					<div className={`flex flex-col pb-5 pt-5 gap-4 w-full h-fit rounded-lg`}>
					<div className='grid w-full sm:max-w-sm items-center gap-1.5'>
							<Label htmlFor='headOrganizer'>Position</Label>
							<div className={`flex flex-col transition-transform ${isCheckedPosition ? 'hidden' : ''}`}>
								<ComboboxPosition />
							</div>
							<div
								className={`flex sm:flex-row flex-col justify-center sm:gap-10 gap-4 items-center transition-transform ${
									isCheckedPosition ? '' : 'hidden'
								}`}
							>
								<Input type='text' id='headOrganizer' placeholder='Enter position of head organizer' onChange={onChange} />
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
				</div>
				<Separator className='my-2' />
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
							<SliderProficiencyLevel proficiencyLevels={proficiencyLevels} onProficiencyChange={handleProficiencyChange} />
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
							<TabActivitySettings />
							<div className='flex w-full justify-self-start'>
								<Button
									type='submit'
									onClick={async (e) => {
										setOutputType('objective');
										await generateProgramFlow({
											eventName: form.activityName,
											orgName: form.organizationName,
											outputType: 'objective',
										});
									}}
									className='border border-purpleLight bg-transparent p-2 text-purpleLight  hover:bg-purpleLight hover:text-white transition-color'
								>
									<span className='mr-1'>{isLoading ? 'Loading..' : 'Prophesize'}</span>
									<IoSparklesOutline />
								</Button>
							</div>
						</div>	
					</div>
				</div>
				<Separator className='my-2' />
				<Separator className='my-2' />
				<Separator className='my-4' />
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
				</div>
			</CardContent>
		</Card>
	);
};

export default ProgramFlow;
