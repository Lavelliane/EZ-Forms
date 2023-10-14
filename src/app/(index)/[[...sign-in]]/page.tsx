'use client';
import { SignIn, useAuth } from '@clerk/nextjs';
import SideBar from '../../../../components/SideBar';
import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../../../components/animation_lnmslog7.json';

export default function Page({ children }: { children: React.ReactNode }) {
	const { getToken, isLoaded, isSignedIn } = useAuth();

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	if (!isLoaded) {
		return (
			<div className='w-full h-screen items-center flex'>
				<p>here</p>
				<Lottie options={defaultOptions} height={400} width={400} />
			</div>
		);
	}
	return (
		<div className='flex items-center justify-center h-screen'>
			{isSignedIn ? (
				<div className='flex flex-col sm:flex-row w-full h-screen text-dark'>
					<div className='sm:h-full h-fit sm:w-fit w-full sm:p-6 p-2 fixed z-20'>
						<SideBar />
					</div>
					<div className='sm:p-6 p-2 h-fit w-full'>{children}</div>
				</div>
			) : (
				<SignIn />
			)}
		</div>
	);
}
