import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface PDFExportOptions {
  filename?: string;
  quality?: number; // scale factor, default 2 for high DPI vector clarity
}

interface PushedElement {
  el: HTMLElement;
  originalMarginTop: string;
}

/**
 * Intelligent DOM paginator for A4 multi-page document export.
 * Detects elements (section headers, entries) that cross page cut boundaries (297mm, 594mm, etc.)
 * and pushes them to the top of the next page with clean margins, ensuring:
 * 1. Ample readable space at the bottom of each page.
 * 2. Zero text sliced in half between pages.
 * 3. Section headers are never orphaned at the very bottom edge.
 */
function applySmartPageBreaks(container: HTMLElement): PushedElement[] {
  const pushedElements: PushedElement[] = [];

  // A4 dimensions at 96 DPI: 210mm x 297mm
  const A4_HEIGHT_PX = (297 * 96) / 25.4; // ~1122.52px
  // Bottom breathing space: at least 70px (~18.5mm) of margin at bottom of page
  const BOTTOM_CUTOFF_MARGIN = 70;
  // Top margin on next page: 48px (~12.7mm)
  const TOP_PAGE_MARGIN = 48;

  const containerRect = container.getBoundingClientRect();
  const totalHeight = container.scrollHeight;

  // Only paginate if content genuinely spans multiple pages
  if (totalHeight <= A4_HEIGHT_PX + 20) {
    return pushedElements;
  }

  const sections = Array.from(container.querySelectorAll<HTMLElement>('.resume-section-block'));
  let currentPage = 1;

  for (const section of sections) {
    const pageCutoff = currentPage * A4_HEIGHT_PX - BOTTOM_CUTOFF_MARGIN;
    const nextPageTop = currentPage * A4_HEIGHT_PX + TOP_PAGE_MARGIN;

    // Check if section header is too close to bottom cutoff (within 95px)
    const header = section.querySelector<HTMLElement>('.section-header-block');
    if (header) {
      const headerRect = header.getBoundingClientRect();
      const headerTop = headerRect.top - containerRect.top;

      if (headerTop > (pageCutoff - 95) && headerTop < nextPageTop) {
        const pushAmount = nextPageTop - headerTop;
        pushedElements.push({ el: section, originalMarginTop: section.style.marginTop });
        section.style.marginTop = `${pushAmount}px`;
        currentPage++;
        continue;
      }
    }

    // Check individual entry blocks within the section
    const entries = Array.from(section.querySelectorAll<HTMLElement>('.resume-entry-block'));
    for (const entry of entries) {
      const entryRect = entry.getBoundingClientRect();
      const entryTop = entryRect.top - containerRect.top;
      const entryBottom = entryRect.bottom - containerRect.top;
      const currentCutoff = currentPage * A4_HEIGHT_PX - BOTTOM_CUTOFF_MARGIN;
      const currentNextTop = currentPage * A4_HEIGHT_PX + TOP_PAGE_MARGIN;

      // If entry straddles the cutoff or falls inside the bottom margin deadzone
      if ((entryTop < currentCutoff && entryBottom > currentCutoff) || (entryTop >= currentCutoff && entryTop < currentNextTop)) {
        const pushAmount = currentNextTop - entryTop;
        pushedElements.push({ el: entry, originalMarginTop: entry.style.marginTop });
        entry.style.marginTop = `${pushAmount}px`;
        currentPage++;
      }
    }
  }

  return pushedElements;
}

/**
 * Programmatically exports the live resume canvas element to an A4 PDF document.
 * 
 * Precision Fixes:
 * 1. Temporarily removes parent CSS transforms (scale) before capture to eliminate
 *    character squishing, overlapping text, and kerning distortion.
 * 2. Applies intelligent page-break padding so text is never sliced in half.
 * 3. Leaves generous, readable space at the bottom of Page 1.
 * 4. Waits for document.fonts.ready to prevent fallback font metrics mismatch.
 * 5. Uses lossless PNG output at 2x DPI for crystal-clear typography.
 * 6. Fits <= 305mm content on 1 page cleanly without orphan page breaks.
 * 7. Guaranteed restoration of live preview zoom and element layout in a finally block.
 */
export async function downloadResumePDF(
  elementId: string = 'resume-preview-canvas',
  options: PDFExportOptions = {}
): Promise<boolean> {
  const element = document.getElementById(elementId) || document.getElementById('resume-preview-document');
  if (!element) {
    console.error(`Element with id "${elementId}" not found for PDF export.`);
    return false;
  }

  const filename = options.filename || 'resume.pdf';
  const scale = options.quality || 2;

  // 1. Temporarily reset parent scaler transform to 100% natural dimensions
  const scaler = document.getElementById('resume-canvas-scaler');
  let originalTransform = '';
  let originalMarginBottom = '';
  let originalTransition = '';

  if (scaler) {
    originalTransform = scaler.style.transform;
    originalMarginBottom = scaler.style.marginBottom;
    originalTransition = scaler.style.transition;

    scaler.style.transition = 'none';
    scaler.style.transform = 'none';
    scaler.style.marginBottom = '0px';
  }

  // 2. Hide any boundary lines or guide overlays during PDF snapshot
  const guides = document.querySelectorAll('.page-boundary-guide');
  guides.forEach((g) => {
    (g as HTMLElement).style.display = 'none';
  });

  let pushedElements: PushedElement[] = [];

  try {
    // 3. Ensure all Google Web Fonts and glyphs are 100% ready
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    // Give browser layout engine a brief tick to recompute unscaled geometry
    await new Promise((resolve) => setTimeout(resolve, 80));

    // 4. Apply intelligent multi-page break padding to avoid sliced text
    pushedElements = applySmartPageBreaks(element);
    if (pushedElements.length > 0) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    // 5. Capture at high-DPI using html2canvas
    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200, // Standard desktop layout width prevents mobile breakpoints
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          clonedElement.style.transform = 'none';
          clonedElement.style.letterSpacing = 'normal';
          clonedElement.style.wordSpacing = 'normal';
        }
      },
    });

    const imgData = canvas.toDataURL('image/png');

    // Standard A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = 210;
    const pdfHeight = 297;

    // Calculate image height in mm matching 210mm width
    const imgHeightMM = (canvas.height * pdfWidth) / canvas.width;

    // 6. Smart Multi-Page Splitting:
    // If the content is within standard 1-page tolerance (<= 305mm), fit cleanly on 1 page
    if (imgHeightMM <= 305) {
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(imgHeightMM, pdfHeight), undefined, 'FAST');
    } else {
      let remainingHeight = imgHeightMM;
      let pageIndex = 0;

      while (remainingHeight > 0) {
        if (pageIndex > 0) {
          pdf.addPage();
        }
        // Shift image vertically by exact A4 page increments
        pdf.addImage(imgData, 'PNG', 0, -(pageIndex * pdfHeight), pdfWidth, imgHeightMM, undefined, 'FAST');
        remainingHeight -= pdfHeight;
        pageIndex++;
      }
    }

    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Failed to generate high-DPI PDF via canvas:', error);
    // Fallback: trigger browser print dialog with @media print stylesheet
    window.print();
    return false;
  } finally {
    // 7. Guarantee restoration of any pushed elements
    pushedElements.forEach(({ el, originalMarginTop }) => {
      el.style.marginTop = originalMarginTop;
    });

    // 8. Guarantee restoration of live preview zoom and guides
    if (scaler) {
      scaler.style.transform = originalTransform;
      scaler.style.marginBottom = originalMarginBottom;
      scaler.style.transition = originalTransition;
    }
    guides.forEach((g) => {
      (g as HTMLElement).style.display = '';
    });
  }
}

export function printResume(): void {
  window.print();
}
