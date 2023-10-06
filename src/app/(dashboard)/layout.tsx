'use client';
import TopBar from '../../../components/TopBar';
import SideBar from '../../../components/SideBar';

function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className='flex flex-col sm:flex-row w-full h-screen text-dark'>
				<div className='fixed pt-6 px-6 h-fit w-full ml-[90px] z-20 bg-white bg-opacity-40 backdrop-blur-sm'>
					<TopBar />
				</div>
				<div className='h-full w-fit p-6 fixed z-20'>
					<SideBar />
				</div>
				<div className='p-6 h-fit w-full mt-[60px]'>{children}</div>
			</div>
		</>
	);
}
export default DashboardLayout;
