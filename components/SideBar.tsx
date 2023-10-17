import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiFilePaper2Line } from 'react-icons/ri';
import { LuWorkflow } from 'react-icons/lu';
import {
	TbSquareRoundedNumber1Filled,
	TbSquareRoundedNumber2Filled,
	TbSquareRoundedNumber3Filled,
	TbSquareRoundedNumber4Filled,
} from 'react-icons/tb';
import { HiOutlineUserGroup } from 'react-icons/hi';
import logo from '../public/assets/ez-forms-logo.svg';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import TopBar from './TopBar';
import { UserButton } from '@clerk/nextjs';

export default function SideBar() {
	const pathname = usePathname();
	return (
		<div className='z-10 flex sm:flex-col flex-row sm:gap-4 bg-dark text-grayLight text-xl items-center sm:justify-start justify-evenly sm:h-full sm:w-16 h-16 w-full py-4 rounded-2xl shadow-md'>
			<Popover>
				<PopoverTrigger asChild>
					<Button className='sm:mb-6 bg-transparent items-center xl:hover:opacity-60 hover:bg-transparent transition-opacity'>
						<Image src={logo} alt={'ez-forms-logo'} className=' invert' width={24} height={24} />
					</Button>
				</PopoverTrigger>
				<PopoverContent side={'right'} className='sm:w-fit w-fit h-fit pt-4 px-4 pb-0 sm:my-0 mt-20 sm:ml-4 -ml-14'>
					<TopBar />
				</PopoverContent>
			</Popover>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						className={`hover:bg-purpleDark p-3 items-center justify-center text-xl rounded-xl transition-colors ${
							pathname.includes('forms') ? 'bg-grayDark' : ''
						}`}
					>
						<RiFilePaper2Line />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					side={'right'}
					className='sm:w-fit w-fit h-fit bg-transparent border-none shadow-none sm:translate-y-0 translate-y-14 sm:translate-x-0 -translate-x-[67px]'
				>
					<div>
						<Link href='/forms/form-1'>
							<span
								className={`hover:text-stone-600 transition-colors text-5xl relative ${
									pathname === '/forms/form-1' ? 'text-purpleDark focus:text-purpleDark' : ' text-grayDark'
								}`}
							>
								<span className='flex w-6 h-6 bg-white absolute top-3 left-3 -z-10'></span>
								<TbSquareRoundedNumber1Filled />
							</span>
						</Link>
						<Link href='/forms/form-2'>
							<span
								className={`hover:text-stone-600 transition-colors text-5xl relative ${
									pathname === '/forms/form-2' ? 'text-purpleDark focus:text-purpleDark' : ' text-grayDark'
								}`}
							>
								<span className='flex w-6 h-6 bg-white absolute top-3 left-3 -z-10'></span>
								<TbSquareRoundedNumber2Filled />
							</span>
						</Link>
						<Link href='/forms/form-3'>
							<span
								className={`hover:text-stone-600 transition-colors text-5xl relative ${
									pathname === '/forms/form-3' ? 'text-purpleDark focus:text-purpleDark' : ' text-grayDark'
								}`}
							>
								<span className='flex w-6 h-6 bg-white absolute top-3 left-3 -z-10'></span>
								<TbSquareRoundedNumber3Filled />
							</span>
						</Link>
						<Link href='/forms/form-4'>
							<span
								className={`hover:text-stone-600 transition-colors text-5xl relative ${
									pathname === '/forms/form-4' ? 'text-purpleDark focus:text-purpleDark' : ' text-grayDark'
								}`}
							>
								<span className='flex w-6 h-6 bg-white absolute top-3 left-3 -z-10'></span>
								<TbSquareRoundedNumber4Filled />
							</span>
						</Link>
					</div>
				</PopoverContent>
			</Popover>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href='/program-flow'
							className={`hover:bg-purpleDark p-3 items-center justify-center text-xl rounded-xl transition-colors ${
								pathname.includes('program-flow') ? 'bg-grayDark' : ''
							}`}
						>
							<LuWorkflow />
						</Link>
					</TooltipTrigger>
					<TooltipContent sideOffset={4} side={'left'} className='bg-grayLighter text-dark p-3 border-none rounded-xl'>
						Program Flow
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href='/participants'
							className={`hover:bg-purpleDark p-3 items-center justify-center text-xl rounded-xl transition-colors ${
								pathname.includes('participants') ? 'bg-grayDark' : ''
							}`}
						>
							<HiOutlineUserGroup />
						</Link>
					</TooltipTrigger>
					<TooltipContent sideOffset={4} side={'left'} className='bg-grayLighter text-dark p-3 border-none rounded-xl'>
						List of Participants
					</TooltipContent>
				</Tooltip>
				<div className='h-full w-full sm:flex hidden'></div>
				<UserButton afterSignOutUrl='/' />
				{/* <Tooltip>
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
            </Tooltip> */}
			</TooltipProvider>
		</div>
	);
}
