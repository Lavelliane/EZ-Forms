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
import { Activity } from "./TableColumns"


type SheetToPDFProps = {
	formContent: IProgramFlow;
	tableData: Activity[];
};

const SheetToPDF = ({ formContent, tableData }: SheetToPDFProps) => {
	const pdfRef = useRef<HTMLDivElement>(null);
	const [loader, setLoader] = React.useState(false);

	const downloadPDF = () => {
		setLoader(true);
		const input = pdfRef.current;

		// Ensure that the HTML2Canvas rendering is complete before generating the PDF
		html2canvas(input as HTMLDivElement).then((canvas) => {
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF('p', 'mm', 'a4'); // Use 'mm' units for positioning

			// Set the PDF width and height to match A4 dimensions (210mm x 297mm)
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();

			// Calculate the image dimensions and position
			const imgWidth = pdfWidth; // Adjust for margins (10mm on each side)
			const imgHeight = pdfHeight;
			const imgY = 0; // 10mm top margin

			//ratio of image width based on height
			const ratio = imgWidth / imgHeight + 0.1;

			//margin to center image horizontally and vertically
			const marginX = (pdfWidth - imgWidth * ratio) / 2;

			// Add the image to the PDF with correct dimensions and position
			pdf.addImage(imgData, 'PNG', marginX, imgY, imgWidth * ratio, imgHeight);
			setLoader(false);
			// Save the PDF with the specified file name
			pdf.save('activity-form-1.pdf');
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
								Name of Activity:{' '}
								<span className='ml-1 font-normal'>{formContent.activityName}</span>
							</p>
							<p className='flex w-full font-semibold'>
								Date of Activity:{' '}
								<span className='ml-1 font-normal'>{formContent.date}</span>
							</p>
							<p className='flex w-full font-semibold'>
								Venue of Activity:{' '}
								<span className='ml-1 font-normal'>{formContent.venue}</span>
							</p>
						</div>
						<div className='mt-2 flex flex-col w-full justify-between'>
							<p className='flex w-full font-semibold'>
								Name of Head Organizer:{' '}
								<span className='ml-1 font-normal'>{formContent.headOrganizer}</span>
							</p>
							<p className='flex w-full font-semibold'>
								Position:{' '}
								<span className='ml-1 font-normal'>{formContent.organizerPosition}</span>
							</p>
						</div>
						<div className='flex w-full'>
							<table className='mt-2 w-full border border-collapse'>
							<thead>
								<tr>
								<th className='border border-collapse px-2 py-1'>Time Slot</th>
								<th className='border border-collapse px-2 py-1'>Activity Name</th>
								</tr>
							</thead>
							<tbody>
								{tableData.map((activity) => (
								<tr key={activity.id}>
									<td className='border border-collapse px-2 py-1'>{activity.timeSlot}</td>
									<td className='border border-collapse px-2 py-1'>{activity.activityName}</td>
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
