'use client';
import React from 'react';
import { Next13ProgressBar } from 'next13-progressbar';

function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className='flex flex-col sm:flex-row w-full h-screen text-dark'>
				<div className='sm:p-6 p-2 h-fit w-full'>
					{children}
					<Next13ProgressBar height='2px' color='#9300ff' options={{ showSpinner: true }} showOnShallow />
				</div>
			</div>
		</>
	);
}
export default DashboardLayout;
