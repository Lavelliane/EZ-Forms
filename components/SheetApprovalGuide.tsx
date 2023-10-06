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

const SheetApprovalGuide = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button>Approval&#160;Guide</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Approval Guide</SheetTitle>
					<SheetDescription>List of required signature for an activity.</SheetDescription>
				</SheetHeader>
				<div className='flex flex-col gap-4 py-4 text-sm'>
					<div className='flex gap-4 p-2 bg-purple-100 rounded-md items-center'>
						<h4 className='font-semibold text-4xl'>A</h4>
						<p>Student Activities Officer</p>
					</div>
					<div className='flex gap-4 p-2 bg-purple-100 rounded-md items-center'>
						<h4 className='font-semibold text-4xl'>B</h4>
						<p>Head, Office of Student Formation & Activities</p>
					</div>
					<div className='flex gap-4 p-2 bg-purple-100 rounded-md items-center'>
						<h4 className='font-semibold text-4xl'>C</h4>
						<p>Director, Student Affairs & Services Office</p>
					</div>
				</div>
				<Separator className='my-4' />
				<div className='flex flex-col gap-4 py-4 text-sm'>
					<p>
						For activities within USC and Cebu province, secure signature <span className='font-semibold'>A</span>
					</p>
					<p>
						For off-campus activities outside Cebu, secure signature <span className='font-semibold'>A & B</span>
					</p>
					<p>
						For off-campus activities international, secure signature <span className='font-semibold'>A, B & C</span>
					</p>
				</div>
				<Separator className='my-4' />
				<SheetFooter>
					<SheetClose asChild>
						<Button type='submit'>Close</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default SheetApprovalGuide;
