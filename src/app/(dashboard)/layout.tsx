'use client';
import SideBar from '../../../components/SideBar';
import React from 'react';
import { Next13ProgressBar } from 'next13-progressbar';

function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className='flex flex-col sm:flex-row w-full h-screen text-dark'>
				<div className='sm:h-full h-fit sm:w-fit w-full sm:p-6 p-2 fixed z-20'>
					<SideBar />
				</div>
				<div className='sm:p-6 p-2 h-fit w-full'>
					{children}
					<Next13ProgressBar height='2px' color='#9300ff' options={{ showSpinner: true }} showOnShallow />
				</div>
			</div>
		</>
	);
}
export default DashboardLayout;
