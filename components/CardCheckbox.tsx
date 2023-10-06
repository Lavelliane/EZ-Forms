import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function CardCheckbox() {
	return (
		<Card className='hover:shadow-md transition-shadow bg-dark text-white w-full'>
			<CardContent className='mt-6 '>
				<div className='flex gap-2 text-center items-center justify-center'>
					<h4 className='text-base font-semibold leading-none'>ACADEMIC&#160;YEAR</h4>
					<input
						id='academicYear'
						placeholder='XXXX-XXXX'
						className='w-28 text-center bg-transparent font-semibold border rounded-md px-2'
					></input>
				</div>
				<Separator className='my-4' />
				<div className='flex gap-2 items-center justify-center'>
					<Checkbox id='firstSem' className='invert' />
					<div className='grid gap-1.5 leading-none'>
						<label
							htmlFor='firstSem'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
						>
							1st&#160;Sem
						</label>
					</div>
					<div className='mx-2 text-slate-300 font-thin'>|</div>
					<Checkbox id='secondSem' className='invert' />
					<div className='grid gap-1.5 leading-none'>
						<label
							htmlFor='secondSem'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
						>
							2nd&#160;Sem
						</label>
					</div>
					<div className='mx-2 text-slate-300 font-thin'>|</div>
					<Checkbox id='summerSem' className='invert' />
					<div className='grid gap-1.5 leading-none'>
						<label
							htmlFor='summerSem'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
						>
							Summer
						</label>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
