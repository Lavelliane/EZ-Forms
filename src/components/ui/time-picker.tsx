'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CustomTimePickerProps {
	id: string;
	value: string;
	onChange: (newValue: string) => void;
}

function CustomTimePicker({ id, value, onChange }: CustomTimePickerProps) {
	const generateTimeOptions = () => {
		const options = [];
		for (let hour = 0; hour < 24; hour++) {
			for (let minute = 0; minute < 60; minute += 30) {
				const formattedHour = (hour % 12).toString().padStart(2, '0');
				const formattedMinute = minute.toString().padStart(2, '0');
				const amPm = hour < 12 ? 'AM' : 'PM';
				options.push(`${formattedHour}:${formattedMinute} ${amPm}`);
			}
		}
		return options;
	};

	const timeOptions = generateTimeOptions();

	return (
		<div className={cn('p-0 w-full')}>
			<div className='flex justify-center relative items-center text-sm'>
				<select
					id={id}
					className={cn('w-full p-2.5 border focus:outline-0 rounded-md')}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					style={{ maxHeight: '120px' }} // Set the maximum height here
				>
					{timeOptions.map((timeOption) => (
						<option key={timeOption} value={timeOption}>
							{timeOption}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}

CustomTimePicker.displayName = 'CustomTimePicker';

export { CustomTimePicker };
