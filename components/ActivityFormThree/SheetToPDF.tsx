import React, { useState, useRef } from 'react';
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
import { Table, TableCaption, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { IFormThree } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import SchoolLogo from '../../public/assets/University_of_San_Carlos_logo.svg';
import { Separator } from '@/components/ui/separator';

type SheetToPDFProps = {
	formContent: IFormThree;
};

const SheetToPDF = ({ formContent }: SheetToPDFProps) => {
	const pdfRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
	const [loader, setLoader] = React.useState(false);

	const downloadPDF = () => {
		setLoader(true);

		const pdf = new jsPDF('p', 'mm', 'a4', true);
		const leftMargin = 10;
		const rightMargin = 10;
		const topMargin = 10;
		const bottomMargin = 10;

		const addPageToPDF = (pageIndex: number) => {
			if (pageIndex >= pdfRefs.length) {
				// All pages have been added, save the PDF
				pdf.save('activity-form-3-fund-raising.pdf');
				setLoader(false);
				return;
			}

			const pdfRef = pdfRefs[pageIndex];
			const input = pdfRef.current;

			if (!input) {
				return;
			}

			html2canvas(input, { scale: 4 }).then((canvas) => {
				const imgData = canvas.toDataURL('image/png');

				const pdfWidth = pdf.internal.pageSize.getWidth();
				const pdfHeight = pdf.internal.pageSize.getHeight();

				const maxImageWidth = pdfWidth - (leftMargin + rightMargin);
				const maxImageHeight = pdfHeight - (topMargin + bottomMargin);

				const img = document.createElement('img');

				img.onload = function() {
					const imgWidth = img.width;
					const imgHeight = img.height;

					const widthScale = maxImageWidth / imgWidth;
					const heightScale = maxImageHeight / imgHeight;
					const scale = Math.min(widthScale, heightScale);

					const newWidth = imgWidth * scale;
					const newHeight = imgHeight * scale;

					const imgX = (pdfWidth - newWidth) / 2;
					const imgY = topMargin;

					if (pageIndex > 0) {
						pdf.addPage();
					}

					pdf.addImage(img, 'PNG', imgX, imgY, newWidth, newHeight);

					// Continue with the next page
					addPageToPDF(pageIndex + 1);
				};

				img.src = imgData;
			});
		};

		// Start adding pages from the first one
		addPageToPDF(0);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button>To PDF</Button>
			</SheetTrigger>
			<SheetContent
				side={'top'}
				className='flex w-full h-screen justify-start items-start bg-purple-100 overflow-auto text-[10px]'
			>
				<div className='h-full overflow-y-auto flex flex-col gap-4 w-fit md:relative absolute left-0 top-0'>
					<div className={`shadow-lg`}>
						<div ref={pdfRefs[0]} className='bg-white p-5'>
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
									<span className='font-bold'>* * Activity Form - 3 * *</span> <br />
									(Fund-Raising)
								</p>
								<div className='flex gap-2 justify-start mt-1'>
									<div className='flex gap-1 items-center'>
										<Checkbox
											checked={formContent.semester == 'firstSem'}
											className='translate-y-1 focus-visible:outline-white '
										/>
										<label>1st Semester</label>
									</div>
									<div className='flex gap-1 items-center'>
										<Checkbox checked={formContent.semester == 'secondSem'} className='translate-y-1' />
										<label>2nd Semester</label>
									</div>
									<div className='flex gap-1 items-center'>
										<Checkbox checked={formContent.semester == 'summerSem'} className='translate-y-1' />
										<label>Summer</label>
									</div>
								</div>
								<div className='justify-start flex'>
									A.Y. <span className='underline underline-offset-2 ml-1'>{formContent.academicYear}</span>
								</div>
								<div className='mt-2 flex w-full justify-between'>
									<p className='flex w-full'>
										Name of organization:{' '}
										<span className='underline underline-offset-2 ml-1'>{formContent.organizationName}</span>
									</p>
								</div>
								<div className='mt-2 flex w-full justify-between'>
									<p className='flex w-full'>
										Type of Fund-Raising Activity:{' '}
										<span className='underline underline-offset-2 ml-1'>{formContent.typeOfActivity}</span>
									</p>
								</div>
								<div className='mt-2 flex w-full justify-between'>
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
								<p className='flex mt-2'>Budget Schedule:</p>
								<div className='flex flex-col w-[340px] ml-16 items-start justify-center gap-2'>
									<p className='font-semibold'>
										CASH INFLOW (Collection) <span className='font-normal italic'>Please refer to the next page</span>
									</p>
									<div className='flex w-full gap-4'>
										<div className='flex flex-col gap-0 w-full items-center'>
											<div className='flex flex-col gap-4 w-full items-center mb-1'>
												<p>Particulars</p>
												<Separator className='bg-dark' />
												<Separator className='bg-dark' />
												<Separator className='bg-dark' />
											</div>
											<p>TOTAL</p>
										</div>
										<div className='flex flex-col gap-4 w-3/4 items-center'>
											<p>₱ Amount</p>
											<Separator className='bg-dark' />
											<Separator className='bg-dark' />
											<Separator className='bg-dark' />
											<Separator className='bg-dark' />
										</div>
									</div>
								</div>
								<Separator className='bg-dark mt-[4px]' />
								<Separator className='bg-dark mt-[1px]' />
								<p className='flex mt-2'>Less:</p>
								<div className='flex flex-col w-[340px] ml-16 items-start justify-center gap-2'>
									<p className='font-semibold'>
										CASH OUTFLOW (Expenses) <span className='font-normal italic'>Please refer to the next page</span>
									</p>
									<div className='flex w-full gap-4'>
										<div className='flex flex-col gap-0 w-full items-center'>
											<div className='flex flex-col gap-4 w-full items-center mb-1'>
												<p>Particulars</p>
												<Separator className='bg-dark' />
												<Separator className='bg-dark' />
												<Separator className='bg-dark' />
											</div>
											<p>TOTAL</p>
										</div>
										<div className='flex flex-col gap-4 w-3/4 items-center'>
											<p>₱ Amount</p>
											<Separator className='bg-dark' />
											<Separator className='bg-dark' />
											<Separator className='bg-dark' />
											<Separator className='bg-dark' />
										</div>
									</div>
								</div>
								<Separator className='bg-dark mt-[4px]' />
								<Separator className='bg-dark mt-[1px]' />
								<div className='flex w-[420px] ml-16 items-start justify-between gap-2 mt-2'>
									<p className='font-semibold'>NET CASH FLOW: </p>
									<p>
										₱<span className='underline underline-offset-2 ml-1'>{formContent.netCashFlow}</span>
									</p>
								</div>
								<p className='font-semibold'>* You may use a separate sheet for your computation.</p>
								<Separator className='bg-dark mt-[4px]' />
								<Separator className='bg-dark mt-[1px]' />
								<div className='flex w-full p-1 mt-2 gap-16'>
									<div className='flex flex-col w-full gap-2'>
										<div className='w-full'>
											<p className='font-semibold'>Submitted by: </p>
											<div className='text-center'>
												<br />
												<div className='border-b border-dark pb-1'>
													<p className='text-center'>{formContent.treasurer}</p>
												</div>
												<p>1. Treasurer</p>
												<p>(Signature over printed name)</p>
											</div>
										</div>
										<div className='text-center'>
											<div className='border-b border-dark pb-1 pt-[30px]'>
												<p className='text-center'>{formContent.president}</p>
											</div>
											<p>2. President</p>
											<p>(Signature over printed name)</p>
										</div>
									</div>
									<div className='flex flex-col w-full gap-2'>
										<div className='w-full'>
											<p className='font-semibold'>Endorsed by: </p>
											<div className='text-center'>
												<br />
												<div className='border-b border-dark pb-1'>
													<p className='text-center'>{formContent.endorsedBy}</p>
												</div>
												<p>3. Faculty Adviser</p>
												<p>(Signature over printed name)</p>
											</div>
										</div>
										<div className='w-full'>
											<p className='font-semibold'>Approved by: </p>
											<div className='text-center'>
												<br />
												<div className='border-b border-dark pb-1'>
													<p className='text-center'></p>
												</div>
												<p>4. Student Activities Office</p>
												<p>(Signature over printed name)</p>
											</div>
										</div>
									</div>
								</div>
								<div>
									<p className='font-semibold mt-1'>Attachments:</p>
									<div className='pl-5'>
										<p>
											1. Resolution: Citing the need for a fund-raising and the specific activity intended for the funds
											raised.
										</p>
										<p>2. Excerpts of the minutes of the meeting</p>
										<p>3. A true copy of the permit from the City Mayor’s Office, if needed.</p>
										<p>
											4. List of Participants with corresponding Parent’s Permits and note of commitment for activities
											held off campus
										</p>
										<p>
											5. For concessionaires, attach the following: Mayor’s permit, Sanitation permit,
											contract/agreement with S.O.
										</p>
										<p>6. For Electrical Connection, go to the Accounting Office.</p>
										<br />
										<p className='font-semibold'>
											Note: Submit this form in duplicate at least two weeks before the activity. However, if it’s a
											major activity, secure permit at least one month before the activity.
										</p>
										<br />
									</div>
									<p>Revision 03: Effective January 29, 2021</p>
								</div>
							</div>
						</div>
					</div>
					<div className={`shadow-lg`}>
						<div ref={pdfRefs[1]} className={`bg-white p-5`}>
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
									<span className='font-bold'>* * Activity Form - 3 * *</span> <br />
									(Fund-Raising)
								</p>
								<p className='text-center font-semibold mt-2'>Budget Schedule</p>
								<div className='flex gap-2 w-full mt-2'>
									<div className='flex flex-1 flex-col gap-0 w-full border p-2'>
										<p>CASH INFLOW (Collection)</p>
										<Table className='text-[10px]'>
											<TableHeader>
												<TableRow>
													<TableHead className='py-0'>Particular</TableHead>
													<TableHead className='py-0 text-right'>Amount</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody className='border-b'>
												{formContent.cashInflow?.map((particular, index) => (
													<TableRow key={`inflow-${index}-${particular.particular}-${particular.amount}`}>
														<TableCell className='font-medium pt-[2px]'>{particular.particular}</TableCell>
														<TableCell className='text-end pt-[2px]'>₱&#160;{particular.amount}</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
										<div className='flex w-full justify-end pr-4 mt-2'>
											<p className='font-semibold'>
												Total: ₱{' '}
												{formContent.cashInflow?.reduce((total, entry) => total + parseFloat(entry.amount), 0) || 0}
											</p>
										</div>
									</div>
									<div className='flex flex-1 flex-col gap-0 w-full border p-2'>
										<p>CASH OUTFLOW (Expenses)</p>
										<Table className='text-[10px]'>
											<TableHeader>
												<TableRow>
													<TableHead className='py-0'>Particular</TableHead>
													<TableHead className='py-0 text-right'>Amount</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody className='border-b'>
												{formContent.cashOutflow?.map((particular, index) => (
													<TableRow key={`inflow-${index}-${particular.particular}-${particular.amount}`}>
														<TableCell className='font-medium pt-[2px]'>{particular.particular}</TableCell>
														<TableCell className='text-end pt-[2px]'>₱&#160;{particular.amount}</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
										<div className='flex w-full justify-end pr-4 mt-2'>
											<p className='font-semibold'>
												Total: ₱{' '}
												{formContent.cashOutflow?.reduce((total, entry) => total + parseFloat(entry.amount), 0) || 0}
											</p>
										</div>
									</div>
								</div>
								<div className='text-base font-semibold text-dark mt-2'>Net Cash Flow: ₱ {formContent.netCashFlow}</div>
							</div>
						</div>
					</div>
				</div>
				<div className='flex flex-col gap-2 md:relative fixed md:m-0 m-4 top-4 left-4 text-center'>
					<div className='flex md:flex-col flex-row gap-2 w-full justify-between'>
						<Button onClick={downloadPDF}>Download</Button>
						<SheetClose asChild>
							<Button>Close</Button>
						</SheetClose>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default SheetToPDF;
