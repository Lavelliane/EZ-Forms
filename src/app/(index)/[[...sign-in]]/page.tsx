import { SignIn, SignedIn } from '@clerk/nextjs';
import LandingPage from '../../../../components/LandingPage';

export default function Page() {
	return (
		<div className='flex items-center justify-center h-screen'>
			<SignedIn>
				<LandingPage />
			</SignedIn>
			<SignIn />
		</div>
	);
}
