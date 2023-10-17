import CardSchool from '../CardSchool';
import CardActivitySection from '../CardActivitySection';
import FormThree from './FormThree';

export default function Header() {
	return (
		<div className='flex flex-col w-full'>
			<div className='flex xl:flex-row flex-col items-start w-full gap-2 sm:mt-0 mt-20'>
				<div className='flex xl:flex-col md:flex-row flex-col gap-4 w-full xl:w-fit xl:px-0 sm:pr-6 p-0 xl:fixed sm:ml-[90px]'>
					<CardSchool />
					<CardActivitySection />
				</div>
				<div className='flex-none w-[461px]'></div>
				<div className='flex items-center justify-center w-full xl:px-6 sm:pr-6 p-0 xl:ml-0 sm:ml-[90px] m-0'>
					<FormThree />
				</div>
			</div>
		</div>
	);
}
