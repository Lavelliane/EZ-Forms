import { SignIn, useAuth } from '@clerk/nextjs';
import SideBar from '../../../../components/SideBar';
import React from 'react';

export default function Page() {
	const { isLoaded, isSignedIn } = useAuth();

	if (!isLoaded) {
		return null;
	}

	return (
		<div className='flex items-center justify-center h-screen'>
			{isSignedIn ? (
				<div className='flex flex-col sm:flex-row w-full h-screen text-dark'>
					<div className='sm:h-full h-fit sm:w-fit w-full sm:p-6 p-2 fixed z-20'>
						<SideBar />
					</div>
					<div className='sm:p-6 p-2 h-fit w-full'></div>
				</div>
			) : (
				<SignIn />
			)}
		</div>
	);
}
