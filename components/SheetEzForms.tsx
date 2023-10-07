import React from 'react';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import logo from '../public/assets/ez-forms-logo.svg';

const SheetEzForms = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline' className='w-[136px]'>
					EZ-FORMS
				</Button>
			</SheetTrigger>
			<SheetContent className='overflow-y-scroll'>
				<SheetHeader>
					<Image src={logo} alt='ez-forms logo' className='lg:w-full w-24 m-auto' />
					<SheetTitle>EZ-FORMS</SheetTitle>
					<SheetDescription>Generate&#160;|&#160;Print&#160;|&#160;Submit</SheetDescription>
				</SheetHeader>
				<Separator className='my-4' />
				<div className='flex flex-col gap-4 py-4 text-sm'>
					<div className='flex gap-2 p-4 bg-purple-100 rounded-md items-center'>
						<h4 className='font-semibold text-lg w-40'>Form-1</h4>
						<div className='text-3xl font-extralight'>|</div>
						<p className='w-56'>Fill-up and generate the Activity Form 1.</p>
					</div>
					<div className=' flex gap-2 p-4 bg-purple-100 rounded-md items-center'>
						<h4 className='font-semibold text-lg w-40'>Attachments</h4>
						<div className='text-3xl font-extralight'>|</div>
						<p className='w-56'>Generate an AI-driven program flow.</p>
					</div>
					<div className=' flex gap-2 p-4 bg-purple-100 rounded-md items-center'>
						<h4 className='font-semibold text-lg w-40'>Listings</h4>
						<div className='text-3xl font-extralight'>|</div>
						<p className='w-56'>Store a copy of the list of participants.</p>
					</div>
					<Separator className='my-4' />
				</div>

				<SheetFooter>
					<SheetClose asChild>
						<Button type='submit'>Close</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default SheetEzForms;
