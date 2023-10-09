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
import Image from 'next/image';
import gcash from '../public/assets/jhury-gcash-qr.jpg';

const SheetDevTeam = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline' className='w-[136px] '>
					DevTeam
				</Button>
			</SheetTrigger>
			<SheetContent className='overflow-y-scroll'>
				<SheetHeader>
					<SheetTitle>DevTeam</SheetTitle>
				</SheetHeader>
				<div className='flex flex-col gap-4 py-4 text-sm'>
					<div className='flex flex-col gap-4 p-2 border-purple-100 border rounded-md items-center'>
						<h4 className='font-semibold text-xl'>Vincent Abella</h4>
						<p>Frontend developer</p>
					</div>
					<div className='flex flex-col gap-4 p-2 border-purple-100 border rounded-md items-center'>
						<h4 className='font-semibold text-xl'>Jhury Lastre</h4>
						<p>Backend developer</p>
					</div>
					<div className='flex flex-col gap-4 p-2 border-purple-100 border rounded-md items-center'>
						<h4 className='font-semibold text-xl'>Johnfil Initan</h4>
						<p>Q&A tester</p>
					</div>
					<div className='flex w-full justify-center items-center gap-2'>
						<div className='flex flex-col justify-center items-center'>
							<h1 className='font-bold'>For Donations</h1>
							<p className='text-xs font-semibold text-center'>G-Cash 09491863088</p>
							<br />
							<p className='text-xs font-semibold'>Innovation Always!</p>
						</div>

						<Image src={gcash} alt='jhury gcash qr' className='w-28 h-28' />
					</div>
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

export default SheetDevTeam;
