import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CardActivitySection() {
	return (
		<Card className='hover:shadow-md transition-shadow bg-dark text-white w-full'>
			<CardContent className='mt-6 text-center'>
				<h4 className='text-base font-semibold leading-none'>STUDENT&#160;ACTIVITIES&#160;SECTION</h4>
				<Separator className='my-4' />
				<p className='text-sm text-gray-400'>Office of Student Formation and Activities</p>
			</CardContent>
		</Card>
	);
}
