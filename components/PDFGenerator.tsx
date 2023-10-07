// PDFGenerator.tsx

import React from 'react';
import html2pdf from 'html2pdf.js';

//PDF Gen
interface PDFGeneratorProps {
	htmlContent: string;
	fileName: string;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ htmlContent, fileName }) => {
	const generatePDF = async () => {
		const pdfOptions = {
			margin: 10,
			filename: fileName,
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
		};

		const element = document.createElement('div');
		element.innerHTML = htmlContent;

		const pdf = await html2pdf()
			.from(element)
			.set(pdfOptions)
			.outputPdf();

		// Download the PDF
		pdf.save();
	};

	return <button onClick={generatePDF}>Generate PDF</button>;
};

export default PDFGenerator;
