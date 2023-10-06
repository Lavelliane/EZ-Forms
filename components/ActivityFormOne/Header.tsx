import React from 'react';
import Image from 'next/image';
import CardSchool from '../CardSchool';
import CardCheckbox from '../CardCheckbox';
import CardActivitySection from '../CardActivitySection';
import FormOne from './FormOne';

export default function Header() {
	return (
		<div className='flex flex-col w-full'>
			<div className='flex flex-row items-start w-full'>
				<div className='flex flex-col gap-4 w-fit fixed ml-[90px]'>
					<CardSchool />
					<CardActivitySection />
					{/* <CardCheckbox /> */}
				</div>
				<div className='flex-none w-[461px]'></div>
				<div className='flex items-center justify-center w-full px-6'>
					<FormOne />
				</div>
			</div>
		</div>
	);
}
