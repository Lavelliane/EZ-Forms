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
import { IFormTwo } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import SchoolLogo from '../../public/assets/University_of_San_Carlos_logo.svg';

type SheetToPDFProps = {
	formContent: IFormTwo;
};

const SheetToPDF = ({ formContent }: SheetToPDFProps) => {
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
			const imgX = 0; // Center the image
			const imgY = 0; // 10mm top margin

			// Add the image to the PDF with correct dimensions and position
			pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight);
			setLoader(false);
			// Save the PDF with the specified file name
			pdf.save('activity-form-2.pdf');
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
					<div className='w-[660px] h-fit bg-white relative justify-center'>
						<div className='flex flex-col gap-1 absolute right-5'>
							<p className='font-semibold border border-dark pb-2 px-2 pt-1 text-[11px]'>ACA – OSFA – SAS – 02F</p>
							<p className='text-xs ml-2'>○ S.O. File</p>
							<p className='text-xs ml-2'>○ O.S.F.O. File</p>
						</div>
						<div className='flex flex-col items-center'>
							<Image src={SchoolLogo} alt='USC Logo' className=' object-fill w-16 h-16' />
							<p className='text-center text-[9px]'>
								University of San Carlos
								<br />
								Cebu City
							</p>
							<p className='text-center text-[10px]'>
								<span className='font-bold'>STUDENT ACTIVITIES SECTION</span> <br />
								Office of Student Formation and Activities
							</p>
						</div>
						<p className='text-center text-[10px] mt-1'>
							<span className='font-bold'>ACTIVITY FORM 2</span> <br />
							(General Meetings/ Assemblies)
						</p>
						<div className='mt-2 flex w-full justify-between'>
							<p className='flex w-full font-semibold'>
								Name of organization:{' '}
								<span className='underline underline-offset-2 ml-1'>{formContent.organizationName}</span>
							</p>
						</div>
						<div className='mt-2 flex w-full justify-between font-semibold'>
							<p className='flex w-full'>
								Date of Activity: <span className='underline underline-offset-2 ml-1'>{formContent.date}</span>
							</p>
							<p className='flex w-full'>
								Time: <span className='underline underline-offset-2 ml-1'>{formContent.time}</span>
							</p>
							<p className='flex w-full'>
								Venue: <span className='underline underline-offset-2 ml-1'>{formContent.venue}</span>
							</p>
						</div>
						<div className='flex w-full mt-1 gap-10 items-center justify-center'>
							<div className='flex gap-1'>
								<div className='flex gap-1 items-center font-semibold'>
									<label>{'Sponsor/Organizer'}</label>
									<Checkbox checked={formContent.involvement == 'organizer'} className='translate-y-1' />
								</div>
							</div>
							<div className='flex gap-1'>
								<div className='flex gap-1 items-center font-semibold'>
									<label>{'Participant'}</label>
									<Checkbox checked={formContent.involvement == 'participant'} className='translate-y-1' />
								</div>
							</div>
						</div>
						<p className='font-semibold mt-1'>
							Agenda: <span className='underline underline-offset-2 ml-1'>{formContent.agenda}</span>
						</p>
						<div className='flex w-full border border-dark p-1 mt-2 gap-2'>
							<div className='flex flex-col font-semibold w-full gap-1'>
								<div>
									<p>1. Recommended by: </p>
									<br />
									<div className='border-b border-dark pb-1'>
										<p className='text-center'>{formContent.recommendedBy}</p>
									</div>
									<p>President of the Student Organization</p>
									<p>(Signature over printed name)</p>
								</div>
								<div>
									<p>2. Endorsed by: </p>
									<br />
									<div className='border-b border-dark pb-1'>
										<p className='text-center'>{formContent.endorsedBy}</p>
									</div>
									<p>Faculty – Adviser</p>
									<p>(Signature over printed name)</p>
								</div>
								<div>
									<p>3. Noted by: </p>
									<br />
									<div className='border-b border-dark pb-1'>
										<p className='text-center'>{formContent.notedBy}</p>
									</div>
									<p>Dean/Department Chair</p>
									<p>(Signature over printed name)</p>
								</div>
							</div>
							<div className='font-semibold w-full'>
								<p>{'4. Approved by:'}</p>
								<div className='h-full flex flex-col'>
									<p className='mt-5'>
										a.) <span className='ml-5 w-3/4 border-b border-dark flex'></span>
									</p>
									<p>Student Activities Officer</p>
									<p className='mt-5'>
										b.)<span className='ml-5 w-3/4 border-b border-dark flex'></span>
									</p>
									<p>Head, Office of Student Formation & Activities</p>
									<p className='mt-5'>
										c.)<span className='ml-5 w-3/4 border-b border-dark flex'></span>
									</p>
									<p>Director, Student Affairs & Services Office</p>
								</div>
							</div>
							<div className=' w-[320px]'>
								<p>
									{'>'} For activities within USC secure signature <span className='font-semibold'>A</span>
									<br />
									<br />
									{'>'} For off-campus activities within Cebu secure signatures{' '}
									<span className='font-semibold'>A&#160;&&#160;B</span>
									<br />
									<br />
									{'>'} For off-campus activities outside Cebu secure signatures{' '}
									<span className='font-semibold'>A,&#160;B&#160;&&#160;C</span>
								</p>
							</div>
						</div>
						<div>
							<p className='font-semibold mt-1'>Note:</p>
							<div className='pl-5'>
								<p>
									Accomplish this form in duplicate three (3) days before the activity. List of Participants with
									corresponding Parent’s Permits for activities held outside the campus and note of commitment from the
									faculty-adviser.
								</p>
								<br />
								<p className='font-semibold'>
									Activity permit must be claimed before the date of activity. Otherwise, this permit will no longer be
									given to the organization.
								</p>
								<br />
							</div>
							<p>Revision 3: Effective January, 2021</p>
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
