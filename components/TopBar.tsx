import * as React from 'react';
import Image from 'next/image';
import logo from '../public/assets/ez-forms-logo.svg';
import gcash from '../public/assets/jhury-gcash-qr.jpg';
import { cn } from '@/lib/utils';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import SheetAttachments from './SheetAttachments';
import SheetApprovalGuide from './SheetApprovalGuide';
import SheetEzForms from './SheetEzForms';
import SheetDevTeam from './SheetDevTeam';

const aboutUs: { name: string; description: string }[] = [
	{
		name: 'Jhury Kevin Lastre',
		description: 'Backend developer',
	},
	{
		name: 'Vincent Abella',
		description: 'Frontend developer',
	},
	{
		name: 'Johnfil Initan',
		description: 'Q&A tester',
	},
];

export default function TopBar() {
	return (
		<NavigationMenu className='mb-4 z-20 h-fit w-fit'>
			<NavigationMenuList className='flex sm:flex-row sm:gap-0 gap-2 flex-col items-center'>
				<NavigationMenuItem className='sm:block hidden'>
					<NavigationMenuTrigger className='w-[136px]'>EZ-FORMS</NavigationMenuTrigger>
					<NavigationMenuContent className='w-full'>
						<ul className='flex flex-row p-6 w-[500px] items-center justify-center'>
							<li className='flex flex-col w-full p-4 text-center justify-center items-center rounded-md bg-gradient-to-b from-purple-50 to-purple-100'>
								<Image src={logo} alt='ez-forms logo' width={120} height={40} />
								<h2 className='font-bold text-xl'>EZ-FORMS</h2>
								<p className='font-light text-xs'>Generate&#160;|&#160;Print&#160;|&#160;Submit</p>
							</li>
							<div className='w-full flex flex-col'>
								<ListItem title='Form-1'>Fill-up and generate the Activity Form 1.</ListItem>
								<ListItem title='Attachments'>Generate an AI-driven program flow.</ListItem>
								<ListItem title='Listings'>Store a copy of the list of participants.</ListItem>
							</div>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem className='sm:block hidden'>
					<NavigationMenuTrigger className='w-[136px]'>DevTeam</NavigationMenuTrigger>
					<NavigationMenuContent className='w-full'>
						<ul className='grid w-[320px] gap-3 p-4 md:w-[420px] md:grid-cols-2 lg:w-[520px] '>
							{aboutUs.map((us) => (
								<ListItem key={us.name} title={us.name}>
									{us.description}
								</ListItem>
							))}
							<div className='flex w-full justify-center items-center gap-2'>
								<div className='flex flex-col justify-center items-center'>
									<h1 className='font-bold'>For Donations</h1>
									<p className='text-xs font-semibold text-center'>G-Cash 09491863088</p>
									<br />
									<p className='text-xs font-semibold'>Innovation Always!</p>
								</div>

								<Image src={gcash} alt='jhury gcash qr' className='w-28 h-28' />
							</div>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem className='block sm:hidden'>
					<SheetEzForms />
				</NavigationMenuItem>
				<NavigationMenuItem className='block sm:hidden'>
					<SheetDevTeam />
				</NavigationMenuItem>
				<NavigationMenuItem>
					<SheetAttachments />
				</NavigationMenuItem>
				<NavigationMenuItem>
					<SheetApprovalGuide />
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-purple-100 hover:text-accent-foreground focus:bg-purple-100 focus:text-accent-foreground',
							className
						)}
						{...props}
					>
						<div className='text-sm font-medium leading-none'>{title}</div>
						<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
					</a>
				</NavigationMenuLink>
			</li>
		);
	}
);
ListItem.displayName = 'ListItem';
