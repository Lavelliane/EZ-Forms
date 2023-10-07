import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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

const SheetAttachments = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline' className='w-[136px]'>
					Attachments
				</Button>
			</SheetTrigger>
			<SheetContent className='overflow-y-scroll'>
				<SheetHeader>
					<SheetTitle>Attachments</SheetTitle>
					<SheetDescription className='text-sm'>
						<span className='font-semibold'>Note: </span>Submit a duplicate at least one week before the activity.
						Activity permit must be claimed before the date of activity. Otherwise, this permit will no longer be given
						to the organization.
					</SheetDescription>
				</SheetHeader>
				<div className='grid sm:gap-4 gap-2 sm:py-4 py-2 text-sm'>
					<div className='flex items-center gap-4 border rounded-lg border-purple-200 p-4'>
						<h4 className='text-3xl font-bold'>1</h4>
						<p>Budget schedule and tentative program of activities/itinerary.</p>
					</div>
					<div className='flex items-center gap-4 border rounded-lg border-purple-200 p-4'>
						<h4 className='text-3xl font-bold'>2</h4>
						<p>List of Participants with corresponding Parent’s Permits for activities held outside the campus.</p>
					</div>
					<div className='flex items-center gap-4 border rounded-lg border-purple-200 p-4'>
						<h4 className='text-3xl font-bold'>3</h4>
						<p>Note of Commitment from the Faculty Adviser for activities held outside the school campus.</p>
					</div>
					<div className='flex items-center gap-4 border rounded-lg border-purple-200 p-4'>
						<h4 className='text-3xl font-bold'>4</h4>
						<p>Speaker’s data (for symposia, lectures, fora, leadership trainings, seminar-workshops, etc.).</p>
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

export default SheetAttachments;
