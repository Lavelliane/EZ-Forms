import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { IoSparklesOutline } from 'react-icons/io5';

const SheetObjectiveGen = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className='border border-purpleLight bg-transparent p-2 text-purpleLight  hover:bg-purpleLight hover:text-white transition-color'>
					<span className='mr-1'>CharmScript</span>
					<IoSparklesOutline />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Objective of the Activity</SheetTitle>
					<SheetDescription>Fill-up keywords to generate a activity objective.</SheetDescription>
				</SheetHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='sample' className='text-right'>
							Sample
						</Label>
						<Input id='sample' value='this is a sample keyword' className='col-span-3' />
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='sample' className='text-right'>
							Sample
						</Label>
						<Input id='sample' value='this is a sample keyword' className='col-span-3' />
					</div>
				</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button type='submit'>Submit</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default SheetObjectiveGen;
