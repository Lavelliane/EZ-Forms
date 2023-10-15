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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
				</SheetHeader>
				<Tabs defaultValue='form1' className='w-full'>
					<TabsList className='bg-dark text-gray-300 my-2'>
						<TabsTrigger value='form1'>FORM-1</TabsTrigger>
						<TabsTrigger value='form2'>FORM-2</TabsTrigger>
						<TabsTrigger value='form3'>FORM-3</TabsTrigger>
						<TabsTrigger value='form4'>FORM-4</TabsTrigger>
					</TabsList>
					<TabsContent value='form1'>
						<SheetDescription className='text-sm'>
							<span className='font-semibold'>Note: </span>Submit a duplicate at least one week before the activity.
							<br />
							<br />
							Activity permit must be claimed before the date of activity. Otherwise, this permit will no longer be
							given to the organization.
						</SheetDescription>
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
					</TabsContent>
					<TabsContent value='form2'>
						<SheetDescription className='text-sm'>
							<span className='font-semibold'>Note: </span>Accomplish this form in duplicate three (3) days before the
							activity. List of Participants with corresponding Parent’s Permits for activities held outside the campus
							and note of commitment from the faculty-adviser.
							<br />
							<br />
							Activity permit must be claimed before the date of activity. Otherwise, this permit will no longer be
							given to the organization.
						</SheetDescription>
						<div className='grid sm:gap-4 gap-2 sm:py-4 py-2 text-sm'>
							<div className='flex items-center gap-4 border rounded-lg border-purple-200 p-4'>
								<p>No attachments disclosed.</p>
							</div>
						</div>
					</TabsContent>
					<TabsContent value='form3'>
						<SheetDescription className='text-sm'>
							<span className='font-semibold'>Note: </span>Submit this form in duplicate at least two weeks before the
							activity. However, if it’s a major activity, secure permit at least one month before the activity.
						</SheetDescription>
						<div className='grid sm:gap-4 gap-2 sm:py-4 py-2 text-sm'>
							<div className='flex items-center gap-4 border rounded-lg border-purple-200 p-2'>
								<h4 className='text-3xl font-bold'>1</h4>
								<p>
									Resolution: Citing the need for a fund-raising and the specific activity intended for the funds
									raised.
								</p>
							</div>
							<div className='flex items-center gap-4 border rounded-lg border-purple-200 p-2'>
								<h4 className='text-3xl font-bold'>2</h4>
								<p>Excerpts of the minutes of the meeting.</p>
							</div>
							<div className='flex items-center gap-4 border rounded-lg border-purple-200 p-2'>
								<h4 className='text-3xl font-bold'>3</h4>
								<p>A true copy of the permit from the City Mayor’s Office, if needed.</p>
							</div>
							<div className='flex items-center gap-4 border rounded-lg border-purple-200 p-2'>
								<h4 className='text-3xl font-bold'>4</h4>
								<p>
									List of Participants with corresponding Parent’s Permits and note of commitment for activities held
									off campus.
								</p>
							</div>
							<div className='flex items-center gap-4 border rounded-lg border-purple-200 p-2'>
								<h4 className='text-3xl font-bold'>5</h4>
								<p>
									For concessionaires, attach the following: Mayor’s permit, Sanitation permit, contract/agreement with
									S.O.
								</p>
							</div>
							<div className='flex items-center gap-4 border rounded-lg border-purple-200 p-2'>
								<h4 className='text-3xl font-bold'>6</h4>
								<p>For Electrical Connection, go to the Accounting Office.</p>
							</div>
						</div>
					</TabsContent>
					<TabsContent value='form4'>
						<SheetDescription className='text-sm'>
							<span className='font-semibold'>Note: </span>Submit this form three (3) days after the activity together
							with the approved Activity Permit. Permit for succeeding activities can only be issued after submission of
							this form.
						</SheetDescription>
						<div className='grid sm:gap-4 gap-2 sm:py-4 py-2 text-sm'>
							<div className='flex items-center gap-4 border rounded-lg border-purple-200 p-4	'>
								<h4 className='text-3xl font-bold'>1</h4>
								<p>List of actual participants with their corresponding signatures.</p>
							</div>
							<p>
								<span className='font-semibold'>For fund-raising activity: </span>
								Submit a statement of income and cash disbursement duly certified by authorized officers & noted by the
								Faculty Adviser five (5) days after the activity.
							</p>
						</div>
					</TabsContent>
				</Tabs>

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
