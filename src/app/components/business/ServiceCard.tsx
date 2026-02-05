import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ServiceItem {
  title: string;
  problem: string;
  transformation: string;
  includes: string[];
  beforeIcon: LucideIcon;
  afterIcon: LucideIcon;
  microcopy: string;
}

interface ServiceCardProps {
  service: ServiceItem;
  onCta: () => void;
}

export function ServiceCard({ service, onCta }: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [phase, setPhase] = useState<"before" | "after">("before");

  useEffect(() => {
    const id = setInterval(() => {
      setPhase((p) => (p === "before" ? "after" : "before"));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      layout
      className="bg-neutral-900/30 border border-amber-900/20 rounded-xl overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-amber-50 mb-4">{service.title}</h3>

        <div className="flex items-center justify-center gap-8 py-6 bg-neutral-950/50 rounded-xl mb-4">
          <AnimatePresence mode="wait">
            {phase === "before" ? (
              <motion.div
                key="before"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-2"
              >
                <service.beforeIcon className="w-12 h-12 text-amber-600/80" />
                <span className="text-xs text-neutral-500">Antes</span>
              </motion.div>
            ) : (
              <motion.div
                key="after"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-2"
              >
                <service.afterIcon className="w-12 h-12 text-emerald-500" />
                <span className="text-xs text-neutral-500">Depois</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-amber-200/90 text-center text-sm font-medium mb-4">
          {service.microcopy}
        </p>

        <AnimatePresence>
          {!expanded ? (
            <motion.button
              key="show-more"
              initial={false}
              exit={{ opacity: 0, height: 0 }}
              onClick={() => setExpanded(true)}
              className="w-full py-2.5 text-amber-600 hover:text-amber-500 text-sm font-medium transition-colors"
            >
              Ver detalhes
            </motion.button>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <ul className="space-y-2">
                {service.includes.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-neutral-300 text-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={onCta}
                className="w-full py-3 bg-amber-900/40 hover:bg-amber-900/60 text-amber-50 rounded-lg font-medium transition-colors border border-amber-900/50"
              >
                Quero saber mais
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
