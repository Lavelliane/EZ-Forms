import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiFilePaper2Line } from 'react-icons/ri';
import { LuWorkflow, LuSettings } from 'react-icons/lu';
import { HiOutlineUserGroup, HiOutlineLogout } from 'react-icons/hi';
import logo from '../public/assets/ez-forms-logo.svg';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const SideBar = () => {
	const pathname = usePathname();
	return (
		<ul className='z-10 flex flex-col gap-2 bg-dark text-grayLight text-xl items-center justify-start h-full w-16 py-4 rounded-2xl shadow-md'>
			<li>
				<Image src={logo} alt={'ez-forms-logo'} className=' invert px-4 py-2 mb-6' />
			</li>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<li>
							<Link href='form-1'>
								<div
									className={`hover:bg-purpleDark p-3 rounded-xl transition-colors ${
										pathname == '/form-1' ? 'bg-grayDark' : ''
									}`}
								>
									<RiFilePaper2Line />
								</div>
							</Link>
						</li>
					</TooltipTrigger>
					<TooltipContent sideOffset={4} side={'left'} className='bg-grayLighter text-dark p-3 border-none rounded-xl'>
						Form 1
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger>
						<li>
							<Link href='program-flow'>
								<div
									className={`hover:bg-purpleDark p-3 rounded-xl transition-colors ${
										pathname == '/program-flow' ? 'bg-grayDark' : ''
									}`}
								>
									<LuWorkflow />
								</div>
							</Link>
						</li>
					</TooltipTrigger>
					<TooltipContent sideOffset={4} side={'left'} className='bg-grayLighter text-dark p-3 border-none rounded-xl'>
						Program Flow
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger>
						<li>
							<Link href='participants'>
								<div
									className={`hover:bg-purpleDark p-3 rounded-xl transition-colors ${
										pathname == '/participants' ? 'bg-grayDark' : ''
									}`}
								>
									<HiOutlineUserGroup />
								</div>
							</Link>
						</li>
					</TooltipTrigger>
					<TooltipContent sideOffset={4} side={'left'} className='bg-grayLighter text-dark p-3 border-none rounded-xl'>
						List of Participants
					</TooltipContent>
				</Tooltip>
				<div className='h-full'></div>
				<Tooltip>
					<TooltipTrigger>
						<li>
							<Link href='settings'>
								<div
									className={`hover:bg-purpleDark p-3 rounded-xl transition-colors ${
										pathname == '/settings' ? 'bg-grayDark' : ''
									}`}
								>
									<LuSettings />
								</div>
							</Link>
						</li>
					</TooltipTrigger>
					<TooltipContent sideOffset={4} side={'left'} className='bg-grayLighter text-dark p-3 border-none rounded-xl'>
						Settings
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger>
						<li>
							<Link href='logout'>
								<div
									className={`hover:bg-purpleDark p-3 rounded-xl transition-colors ${
										pathname == '/logout' ? 'bg-grayDark' : ''
									}`}
								>
									<HiOutlineLogout />
								</div>
							</Link>
						</li>
					</TooltipTrigger>
					<TooltipContent sideOffset={4} side={'left'} className='bg-grayLighter text-dark p-3 border-none rounded-xl'>
						Logout
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</ul>
	);
};

export default SideBar;