import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiFilePaper2Line } from 'react-icons/ri';
import { LuWorkflow, LuSettings } from 'react-icons/lu';
import {
	TbSquareRoundedNumber1Filled,
	TbSquareRoundedNumber2Filled,
	TbSquareRoundedNumber3Filled,
} from 'react-icons/tb';
import { HiOutlineUserGroup, HiOutlineLogout } from 'react-icons/hi';
import logo from '../public/assets/ez-forms-logo.svg';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import TopBar from './TopBar';

const SideBar = () => {
	const pathname = usePathname();
	return (
		<ul className='z-10 flex sm:flex-col flex-row sm:gap-2 gap-0 bg-dark text-grayLight text-xl items-center sm:justify-start justify-evenly sm:h-full sm:w-16 h-16 w-full py-4 rounded-2xl shadow-md'>
			<li>
				<Popover>
					<PopoverTrigger asChild>
						<Button className='p-4 sm:mb-6 bg-transparent items-center hover:opacity-60 hover:bg-transparent transition-opacity'>
							<Image src={logo} alt={'ez-forms-logo'} className=' invert w-16 h-fit' />
						</Button>
					</PopoverTrigger>
					<PopoverContent side={'right'} className='sm:w-fit w-fit h-fit pt-4 px-4 pb-0 sm:my-0 mt-20 sm:ml-4 -ml-14'>
						<TopBar />
					</PopoverContent>
				</Popover>
			</li>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<li>
							<Popover>
								<PopoverTrigger asChild>
									<Button className='p-0 rounded-xl'>
										<div
											className={`hover:bg-purpleDark text-xl p-3 rounded-xl transition-colors ${
												pathname == '/form-1' || pathname == '/form-2' ? 'bg-grayDark' : ''
											}`}
										>
											<RiFilePaper2Line />
										</div>
									</Button>
								</PopoverTrigger>
								<PopoverContent side={'right'} className='sm:w-fit w-fit h-fit bg-transparent border-none shadow-none'>
									<Link href='form-1'>
										<div
											className={`hover:text-grayDark transition-colors text-5xl ${
												pathname == '/form-1' ? 'text-purpleDark' : ''
											}`}
										>
											<TbSquareRoundedNumber1Filled />
										</div>
									</Link>
									<Link href='form-2'>
										<div
											className={`hover:text-grayDark transition-colors text-5xl ${
												pathname == '/form-2' ? 'text-purpleDark' : ''
											}`}
										>
											<TbSquareRoundedNumber2Filled />
										</div>
									</Link>
								</PopoverContent>
							</Popover>
						</li>
					</TooltipTrigger>
					<TooltipContent sideOffset={4} side={'left'} className='bg-grayLighter text-dark p-3 border-none rounded-xl'>
						Forms
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
				<div className='h-full w-full sm:flex hidden'></div>
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
