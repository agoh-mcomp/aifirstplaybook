import { motion } from "framer-motion";
import { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";

const PlaybookCTA = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      // Hide elements that shouldn't appear in PDF
      const hiddenEls = document.querySelectorAll<HTMLElement>(
        '[data-pdf-hide]'
      );
      hiddenEls.forEach((el) => (el.style.display = "none"));

      const content = document.getElementById("playbook-root");
      if (!content) return;

      const canvas = await html2canvas(content, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: null,
        windowWidth: 1200,
      });

      hiddenEls.forEach((el) => (el.style.display = ""));

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const pdf = new jsPDF("p", "mm", "a4");

      // Calculate how many pixels correspond to one PDF page
      const pxPerMm = canvas.width / imgWidth;
      const pageHeightPx = Math.floor(pageHeight * pxPerMm);
      const totalPages = Math.ceil(canvas.height / pageHeightPx);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();

        // Slice a page-sized chunk from the full canvas
        const sliceHeight = Math.min(pageHeightPx, canvas.height - page * pageHeightPx);
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;
        const ctx = pageCanvas.getContext("2d");
        if (!ctx) continue;

        ctx.drawImage(
          canvas,
          0, page * pageHeightPx,       // source x, y
          canvas.width, sliceHeight,     // source width, height
          0, 0,                          // dest x, y
          canvas.width, sliceHeight      // dest width, height
        );

        const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.85);
        const sliceHeightMm = (sliceHeight / pxPerMm);
        pdf.addImage(pageImgData, "JPEG", 0, 0, imgWidth, sliceHeightMm);
      }

      pdf.save("AI-First-Playbook.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-32 relative">
      <div className="chapter-divider w-full mb-20" />
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, hsl(38 80% 55% / 0.15), transparent 70%)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto px-6 md:px-8 text-center relative"
      >
        <div className="font-mono text-xs tracking-[0.2em] uppercase text-gold-dim mb-6">
          Epilogue
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 text-foreground">
          The story starts<br />
          <span className="italic gradient-gold">when you do.</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-12 font-body">
          Every transformation begins with a single decision. Not to be perfect — but to begin.
          Your citizens are waiting. Your officers are ready. The tools exist.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-pdf-hide>
          <button className="gradient-gold-bg text-primary-foreground font-body font-semibold px-8 py-4 rounded-lg text-base tracking-wide hover:opacity-90 transition-opacity">
            Request a Sprint Briefing
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="border border-border text-foreground font-body font-medium px-8 py-4 rounded-lg text-base hover:bg-secondary transition-colors inline-flex items-center gap-2 disabled:opacity-60"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating PDF…
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4" />
                Download as PDF
              </>
            )}
          </button>
        </div>

        <div className="mt-20 font-mono text-xs text-muted-foreground tracking-wider">
          Built with conviction. Shared with purpose.
        </div>
      </motion.div>
    </section>
  );
};

export default PlaybookCTA;
