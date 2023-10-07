import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BsInfoCircle } from 'react-icons/bs';
import { Button } from '@/components/ui/button';

interface PopoverNatureProps {
	heading: string;
	description: string;
}

const PopoverNature = ({ heading, description }: PopoverNatureProps) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className='bg-transparent hover:bg-transparent hover:text-purpleLight w-fit h-fit p-0'>
					<BsInfoCircle className='text-gray-400 hover:text-purpleLight hover:scale-[102%] transition-all' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='bg-[rgba(255,255,255,.6)] backdrop-blur-lg'>
				<div className='flex flex-col text-xs gap-2'>
					<h4 className='font-semibold'>{heading}</h4>
					<p>{description}</p>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default PopoverNature;
