'use client'

import { SignIn } from '@clerk/nextjs';
import { useAuth } from "@clerk/clerk-react";
import { useRouter } from 'next/navigation'

export default function Page() {
	const { isLoaded, userId } = useAuth()
	const router = useRouter()

	if(isLoaded && userId){
		router.push('/forms/form-1')
		return
	}
	return (
		<div className='flex items-center justify-center h-screen'>
			<SignIn />
		</div>
	);
}
