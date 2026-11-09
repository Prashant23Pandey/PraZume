import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface PDFExportOptions {
  filename?: string;
  quality?: number; // scale factor, default 2 for high DPI clarity
}

/**
 * Programmatically exports the live resume canvas element to an A4 PDF document.
 * Adheres strictly to:
 * - Target element: #resume-preview-canvas
 * - Quality: JPEG 0.98
 * - HTML2Canvas scale: 2 (high DPI vector print clarity)
 * - useCORS: true (for rendering photos and cross-origin icons)
 * - jsPDF: format 'a4', orientation 'portrait', margin: 0
 */
export async function downloadResumePDF(
  elementId: string = 'resume-preview-canvas',
  options: PDFExportOptions = {}
): Promise<boolean> {
  let element = document.getElementById(elementId);
  if (!element) {
    element = document.getElementById('resume-preview-document');
  }
  if (!element) {
    console.error(`Element with id "${elementId}" not found for PDF export.`);
    return false;
  }

  const filename = options.filename || 'resume.pdf';
  const scale = options.quality || 2;

  try {
    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Scale to exact A4 page width with 0 margin
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Render first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Split across additional pages if content exceeds standard A4 height
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Failed to generate high-DPI PDF via canvas:', error);
    // Fallback: trigger browser print dialog with @media print stylesheet
    window.print();
    return false;
  }
}

export function printResume(): void {
  window.print();
}
