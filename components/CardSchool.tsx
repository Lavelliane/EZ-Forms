import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CardSchool() {
	return (
		<Card className='hover:shadow-md transition-shadow w-full'>
			<CardContent className='flex gap-2 items-center mt-6'>
				<img
					src='https://upload.wikimedia.org/wikipedia/en/3/39/University_of_San_Carlos_logo.png'
					alt='USC Logo'
					className='w-fit sm:h-20 h-12'
				/>
				<div className='flex flex-col w-full h-full items-start'>
					<div className='space-y-1'>
						<h4 className='text-base font-bold leading-none'>UNIVERSITY OF SAN CARLOS</h4>
						<p className='text-sm text-gray-700'>Cebu City</p>
					</div>
					<Separator className='my-2' />
					<p className='sm:text-sm text-xs text-gray-700'>Scientia • Virtus • Devotio </p>
				</div>
			</CardContent>
		</Card>
	);
}
