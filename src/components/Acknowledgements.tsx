import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

interface AckBlockProps {
  label: string;
  names: string;
  note: string;
  delay?: number;
}

const AckBlock = ({ label, names, note, delay = 0 }: AckBlockProps) => (
  <motion.div {...fadeUp} transition={{ duration: 0.6, delay }} className="text-center space-y-3">
    <span className="inline-block font-mono text-[11px] tracking-[0.2em] uppercase text-gold-dim bg-gold/10 border border-gold/20 px-4 py-1.5 rounded-full">
      {label}
    </span>
    <p className="font-display text-xl md:text-2xl text-foreground leading-relaxed whitespace-pre-line">{names}</p>
    <p className="font-body text-sm md:text-base text-muted-foreground italic max-w-lg mx-auto">{note}</p>
  </motion.div>
);

const Acknowledgements = () => {
  return (
    <div className="space-y-16" data-pdf-hide>
      <div className="space-y-16">
        {/* Title */}
        <motion.div {...fadeUp} className="text-center space-y-6">
          <h2 className="font-display text-4xl md:text-5xl text-foreground leading-tight">
            With Gratitude
            <br />& Deep Thanks
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground italic max-w-xl mx-auto">
            This playbook was built in the trenches from 90 days of high energy, by a team that chose to believe
            something different was possible.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        </div>

        {/* Core Team Label */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center font-mono text-xs tracking-[0.25em] uppercase text-gold-dim"
        >
          The Core Team
        </motion.p>

        {/* Champion */}
        <AckBlock
          label="Champion & Role Model"
          names="Bernard Toh"
          note="For your vision, giving us protected time to reimagine, and leading from the front."
          delay={0.15}
        />

        {/* Divider */}
        <div className="flex items-center justify-center">
          <div className="h-px w-16 bg-border" />
        </div>

        {/* Working Group */}
        <AckBlock
          label="AI-First Working Group"
          names={
            "Adrian Goh  ·  Elise Lee  ·  Bertram Lim  ·  Jackson Wong\nChen Weijun  ·  Alyssa Goh  ·  Debbie Yosh  ·  Jade Lee  ·  Nicole Goh"
          }
          note="For steering, building, and bringing the AI-First initiative to life through every sprint."
          delay={0.2}
        />

        {/* Divider */}
        <div className="flex items-center justify-center">
          <div className="h-px w-16 bg-border" />
        </div>

        {/* CIO Office */}
        <AckBlock
          label="CIO Office & AI-First Clinics"
          names={"Chen Weijun  ·  Poh Quan Wei  ·  Nicholas Foong\nGabriel Chua  ·  Tsang Bao Xian"}
          note="For showing up clinic after clinic, helping to deploy prototypes with tireless patience and expertise."
          delay={0.25}
        />

        {/* Divider */}
        <div className="flex items-center justify-center">
          <div className="h-px w-16 bg-border" />
        </div>

        {/* Leaders & Officers */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center bg-gold/5 border border-gold/15 rounded-xl p-8 md:p-10 space-y-4"
        >
          <span className="inline-block font-mono text-[11px] tracking-[0.2em] uppercase text-gold-dim bg-gold/10 border border-gold/20 px-4 py-1.5 rounded-full">
            Our Leaders & Every SCG Officer
          </span>
          <p className="font-body text-base md:text-lg text-foreground italic max-w-xl mx-auto leading-relaxed">
            To our leaders in SCG and to every SCG team member who raised their hand, showed up to participate in a
            sprint, built their first solution, and made SCG AI-First a reality.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Acknowledgements;
