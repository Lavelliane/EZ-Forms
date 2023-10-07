'use client';

import Header from '../../../../components/ActivityFormOne/Header';
import getFormOneFields from '@/mutations/getFormOneFields';
import { useEffect, useState } from 'react';

function FormOnePage() {
	return (
		<div className='flex justify-center items-center '>
			<div className='flex justify-start items-start w-full'>
				<Header />
			</div>
		</div>
	);
}
export default FormOnePage;
