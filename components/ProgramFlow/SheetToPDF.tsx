import React, { useEffect, useRef } from 'react';
import {
	Sheet,
	SheetHeader,
	SheetDescription,
	SheetContent,
	SheetTrigger,
	SheetTitle,
	SheetFooter,
	SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { IFormOne, IProgramFlow } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import SchoolLogo from '../../public/assets/University_of_San_Carlos_logo.svg';

type SheetToPDFProps = {
	formContent: IProgramFlow;
};

const SheetToPDF = ({ formContent }: SheetToPDFProps) => {
	const pdfRef = useRef<HTMLDivElement>(null);
	const [loader, setLoader] = React.useState(false);

	const downloadPDF = () => {
		setLoader(true);
		const input = pdfRef.current;

		html2canvas(input as HTMLDivElement, { scale: 2 }).then((canvas) => {
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF('p', 'mm', 'a4', true);

			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();

			// Adjust the margins to your preference
			const leftMargin = 10;
			const rightMargin = 10;
			const topMargin = 10;
			const bottomMargin = 10;

			const maxImageWidth = pdfWidth - (leftMargin + rightMargin);
			const maxImageHeight = pdfHeight - (topMargin + bottomMargin);

			const img = document.createElement('img');

			img.onload = function() {
				const imgWidth = img.width;
				const imgHeight = img.height;

				// Calculate scaling factors for width and height
				const widthScale = maxImageWidth / imgWidth;
				const heightScale = maxImageHeight / imgHeight;

				// Use the smaller scaling factor to ensure both dimensions fit
				const scale = Math.min(widthScale, heightScale);

				const newWidth = imgWidth * scale;
				const newHeight = imgHeight * scale;

				// Calculate positioning
				const imgX = (pdfWidth - newWidth) / 2;
				const imgY = topMargin;

				pdf.addImage(img, 'PNG', imgX, imgY, newWidth, newHeight);
				setLoader(false);
				pdf.save('activity-program-flow.pdf');
			};

			img.src = imgData;
		});
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button>To PDF</Button>
			</SheetTrigger>
			<SheetContent
				side={'top'}
				className='flex w-full h-screen justify-start items-start bg-purple-100 overflow-scroll text-[10px]'
			>
				<div ref={pdfRef} className='bg-white p-5'>
					<div className='w-[660px] h-fit bg-white relative'>
						<p className='text-center text-[10px] mt-1'>
							<span className='font-bold'>PROGRAM FLOW</span> <br />
							<span className='ml-1'>{formContent.organizationName}</span>
						</p>
						<div className='justify-center flex'>
							<span className='italic ml-1'>A.Y. {formContent.academicYear}</span>
						</div>
						<div className='mt-2 flex flex-col w-full justify-between'>
							<p className='flex w-full font-semibold'>
								Name of Activity: <span className='ml-1 font-normal'>{formContent.eventName}</span>
							</p>
							<p className='flex w-full font-semibold'>
								Date of Activity: <span className='ml-1 font-normal'>{formContent.date}</span>
							</p>
							<p className='flex w-full font-semibold'>
								Venue of Activity: <span className='ml-1 font-normal'>{formContent.venue}</span>
							</p>
						</div>
						<div className='mt-2 flex flex-col w-full justify-between'>
							<p className='flex w-full font-semibold'>
								Name of Head Organizer: <span className='ml-1 font-normal'>{formContent.headOrganizer}</span>
							</p>
							<p className='flex w-full font-semibold'>
								Position: <span className='ml-1 font-normal'>{formContent.organizerPosition}</span>
							</p>
						</div>
						<div className='flex w-full'>
							<table className='mt-2 w-full border border-collapse'>
								<thead>
									<tr>
										<th className='border border-collapse px-2 py-1'>Activity Name</th>
										<th className='border border-collapse px-2 py-1'>Time Slot</th>
									</tr>
								</thead>
								<tbody>
									{formContent.programFlow.map((activity) => (
										<tr key={`${activity.activityName}-${activity.timeSlot}`}>
											<td className='border border-collapse px-2 py-1'>{activity.activityName}</td>
											<td className='border border-collapse px-2 py-1'>{activity.timeSlot}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className='flex flex-col gap-2 md:relative absolute md:m-0 m-4'>
					<Button onClick={downloadPDF}>Download</Button>
					<SheetClose asChild>
						<Button>Close</Button>
					</SheetClose>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default SheetToPDF;
