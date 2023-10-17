'use client'

import { SignIn } from '@clerk/nextjs';
import { useAuth } from "@clerk/clerk-react";;
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
	const { isLoaded, userId } = useAuth()

	return (
		<div className='flex items-center justify-center h-screen'>
			{isLoaded && !userId && (<SignIn />)}
			{isLoaded && userId && (
				<Link href={"/forms/form-1"}>
					<Button>
						EZ Forms here we go!
					</Button>
				</Link>
			)}
		</div>
	);
}
