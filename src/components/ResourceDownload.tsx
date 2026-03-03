import { FileDown, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface ResourceDownloadProps {
  title: string;
  description: string;
  type: "template" | "dashboard" | "toolkit";
  href?: string;
}

const typeConfig = {
  template: { icon: FileDown, label: "Template" },
  dashboard: { icon: ExternalLink, label: "Dashboard" },
  toolkit: { icon: FileDown, label: "Toolkit" },
};

const ResourceDownload = ({ title, description, type, href = "#" }: ResourceDownloadProps) => {
  const { icon: Icon, label } = typeConfig[type];

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group flex items-center gap-4 bg-surface-elevated border border-border rounded-lg p-5 transition-colors hover:border-gold/40 cursor-pointer"
    >
      <div className="shrink-0 w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
        <Icon className="w-5 h-5 text-gold" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gold-dim">{label}</span>
        </div>
        <h5 className="font-display text-base text-foreground leading-tight">{title}</h5>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
      </div>
      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors shrink-0" />
    </motion.a>
  );
};

export default ResourceDownload;
