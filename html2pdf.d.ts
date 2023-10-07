// html2pdf.d.ts

declare module 'html2pdf.js' {
	const html2pdf: {
		(): {
			from: (
				element: HTMLElement
			) => {
				set: (
					options: any
				) => {
					output(arg0: (pdf: any) => void, arg1: string): unknown;
					outputPdf: () => Promise<any>;
				};
			};
		};
	};
	export = html2pdf;
}
