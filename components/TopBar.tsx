import * as React from 'react';
import Image from 'next/image';
import logo from '../public/assets/ez-forms-logo.svg';
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

const aboutUs: { name: string; description: string }[] = [
	{
		name: 'Jhury Kevin Lastre',
		description: 'BS-CPE IV',
	},
	{
		name: 'Vincent Abella',
		description: 'BS-CPE IV',
	},
];

export default function TopBar() {
	return (
		<NavigationMenu className='mb-4'>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
							<li className='row-span-3 px-4 text-center justify-center pt-6 rounded-md bg-gradient-to-b from-purple-50 to-purple-100 p-6'>
								<Image src={logo} alt='ez-forms logo' />
								<h2 className='font-bold text-xl mt-2'>EZ-FORMS</h2>
								<p className='font-light text-xs'>Generate&#160;|&#160;Print&#160;|&#160;Submit</p>
							</li>
							<ListItem title='Form-1'>Fill-up and generate the Activity Form 1.</ListItem>
							<ListItem title='Attachments'>Generate an AI-driven sprogram flow.</ListItem>
							<ListItem title='Listings'>Store a copy of the list of participants.</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>DevTeam</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className='grid w-[320px] gap-3 p-4 md:w-[420px] md:grid-cols-2 lg:w-[520px] '>
							{aboutUs.map((us) => (
								<ListItem key={us.name} title={us.name}>
									{us.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
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
