import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CardDataPrivacy() {
	return (
		<Card className='hover:shadow-md transition-shadow bg-dark text-white w-full'>
			<CardContent className='mt-6 text-center'>
				<h4 className='text-base font-semibold leading-none'>DATA&#160;PRIVACY&#160;CONSENT</h4>
				<Separator className='my-4' />
				<p className='text-sm text-gray-400'>
					I give my consent to the University of San Carlos to collect, generate, use, process, store and retain my
					personal data; and authorize USC to disclose these to accredited/affiliated parties, or
					independent/non-affiliated third parties, whether local or foreign: as necessary for the proper execution of
					processes related to the declared purpose; and /or as required or authorized by or under the law
				</p>
			</CardContent>
		</Card>
	);
}
