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
import { IFormOne } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import SchoolLogo from '../../public/assets/University_of_San_Carlos_logo.svg';

type SheetToPDFProps = {
	formContent: IFormOne;
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
				pdf.save('activity-form-1-activity-form.pdf');
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
				<div className='shadow-lg'>
					<div ref={pdfRef} className='bg-white p-5'>
						<div className='w-[660px] h-fit bg-white relative'>
							<div className='flex flex-col gap-1 absolute right-5'>
								<p className='font-semibold border border-dark pb-2 px-2 pt-1 text-[11px]'>ACA – OSFA – SAS – 02F</p>
								<p className='text-xs ml-2'>○ S.O. File</p>
								<p className='text-xs ml-2'>○ O.S.F.A. File</p>
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
							<div className='flex gap-2 justify-center mt-1'>
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
							<div className='justify-center flex'>
								A.Y. <span className='underline underline-offset-2 ml-1'>{formContent.academicYear}</span>
							</div>
							<p className='text-center text-[10px] mt-1'>
								<span className='font-bold'>ACTIVITY FORM 1</span> <br />
								(General Activity Form for Student Organizations)
							</p>
							<div className='mt-2 flex w-full justify-between'>
								<p className='flex w-full font-semibold'>
									Name of organization:{' '}
									<span className='underline underline-offset-2 ml-1'>{formContent.organizationName}</span>
								</p>
								<div className='flex w-[500px] gap-2 justify-end'>
									<div className='flex gap-1 items-center'>
										<Checkbox checked={formContent.curricular == 'coCurricular'} className='translate-y-1' />
										<label>Co-Curricular</label>
									</div>
									<div className='flex gap-1 items-center'>
										<Checkbox checked={formContent.curricular == 'extraCurricular'} className='translate-y-1' />
										<label>Extra-Curricular</label>
									</div>
								</div>
							</div>
							<div className='mt-2 flex w-full justify-between'>
								<p className='flex w-full'>
									If co-curricular, from what department?{' '}
									<span className='underline underline-offset-2 ml-1'>{formContent.department}</span>
								</p>
								<p className='flex w-full'>
									What college/school? <span className='underline underline-offset-2 ml-1'>{formContent.school}</span>
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
							<div className='flex w-full gap-2 justify-center mt-1'>
								<div className='flex gap-1 items-center'>
									<Checkbox checked={formContent.campus == 'inCampus'} className='translate-y-1' />
									<label>In-campus</label>
								</div>
								<div className='flex gap-1 items-center'>
									<Checkbox checked={formContent.campus == 'offCampus'} className='translate-y-1' />
									<label>Off-campus</label>
								</div>
							</div>
							<p className='font-semibold'>Nature of Involvement:</p>
							<div className='flex  w-full mt-1 gap-1 items-center'>
								<div className='flex flex-1 flex-col gap-1 border-r border-dark'>
									<div className='flex gap-1 items-center font-semibold'>
										<label>Sponsor/Organizer</label>
										<Checkbox checked={formContent.involvement == 'organizer'} className='translate-y-1' />
									</div>
									<p className='flex w-full'>
										Expected Number of Participant(s):{' '}
										{formContent.involvement == 'organizer' && (
											<span className='underline underline-offset-2 ml-1'>{formContent.numberOfParticipants}</span>
										)}
									</p>
									<p className='flex w-full'>
										Who are the expected participants:
										<br />
										<br />
										{formContent.involvement == 'organizer' && (
											<span className='underline underline-offset-2 ml-1'>{formContent.participants}</span>
										)}
									</p>
								</div>
								<div className='flex flex-1 flex-col gap-1'>
									<div className='flex gap-1 items-center font-semibold'>
										<label>Participant</label>
										<Checkbox checked={formContent.involvement == 'participant'} className='translate-y-1' />
									</div>
									<p className='flex w-full'>
										Expected Number of Participant(s):{' '}
										{formContent.involvement == 'participant' && (
											<span className='underline underline-offset-2 ml-1'>{formContent.numberOfParticipants}</span>
										)}
									</p>
									<p className='flex w-full'>
										Who is the sponsoring organization/ office?:
										<br />
										<br />
										{formContent.involvement == 'participant' && (
											<span className='underline underline-offset-2 ml-1'>{formContent.sponsor}</span>
										)}
									</p>
								</div>
							</div>
							<p className='font-semibold mt-1'>
								Name of the Activity:{' '}
								<span className='underline underline-offset-2 ml-1'>{formContent.activityName}</span>
							</p>
							<br />
							<p className='font-semibold mt-1'>
								Short Description of the Activity:{' '}
								<span className='underline underline-offset-2 ml-1'>{formContent.description}</span>
							</p>
							<br />
							<p className='font-semibold mt-1'>
								Objective/Purpose of the Activity:{' '}
								<span className='underline underline-offset-2 ml-1'>{formContent.objective}</span>
							</p>
							<div className='mt-1 flex gap-2'>
								<p className='font-semibold'>Nature of Activity:</p>
								<div className='flex gap-1 items-center'>
									<Checkbox checked={formContent.natureOfActivity?.includes('scientia')} className='translate-y-1' />
									<label>Scientia</label>
								</div>
								<div className='flex gap-1 items-center'>
									<Checkbox checked={formContent.natureOfActivity?.includes('virtus')} className='translate-y-1' />
									<label>Virtus</label>
								</div>
								<div className='flex gap-1 items-center'>
									<Checkbox checked={formContent.natureOfActivity?.includes('devotio')} className='translate-y-1' />
									<label>Devotio</label>
								</div>
								<div className='flex gap-1 items-center'>
									<Checkbox
										checked={formContent.natureOfActivity?.includes('organization')}
										className='translate-y-1'
									/>
									<label>{'Organizational/Routinal'}</label>
								</div>
							</div>
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
								<p className='font-semibold'>Attachment(s):</p>
								<div className='pl-5'>
									<p>1. Budget schedule and tentative program of activities/itinerary.</p>
									<p>
										2. List of Participants with corresponding Parent’s Permits for activities held outside the campus.
									</p>
									<p>3. Note of Commitment from the Faculty Adviser for activities held outside the school campus.</p>
									<p>
										4. Speaker’s data (for symposia, lectures, fora, leadership trainings, seminar-workshops, etc.).
									</p>
								</div>
								<p>
									<span className='font-semibold'>Note:</span> Submit this form in duplicate at least one week before
									the activity. Activity permit must be claimed before the date of activity. Otherwise, this permit will
									no longer be given to the organization.
								</p>
							</div>
							<div className='border border-dark p-1 mt-1 text-[9px] font-semibold italic'>
								<p>
									SCIENTIA: Activities that enhances academic excellence and/or becoming a professionally competent
									student in the chosen field of study.
								</p>
								<p>
									VIRTUS: Activities that will help us achieve good character, leadership, discipline, intrapersonal &
									interpersonal skills, and well-being.
								</p>
								<p>
									DEVOTIO: Activities that addresses prevailing social realities, activates one’s kindness, compassion,
									service, being philanthropic etc., allows one to volunteer one’s expertise, and gives back valued
									contributions to others or the community.
								</p>
								<p>
									ORGANIZATIONAL/ROUTINAL: Activities that are done to run the organization effectively. E.g. meetings,
									assemblies.
								</p>
							</div>
							<p>Revision 4: Effective January 29, 2021</p>
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
