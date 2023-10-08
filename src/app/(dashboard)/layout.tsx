'use client';
import SideBar from '../../../components/SideBar';

function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className='flex flex-col sm:flex-row w-full h-screen text-dark'>
				<div className='sm:h-full h-fit sm:w-fit w-full sm:p-6 p-2 fixed z-20'>
					<SideBar />
				</div>
				<div className='sm:p-6 p-2 h-fit w-full'>{children}</div>
			</div>
		</>
	);
}
export default DashboardLayout;
