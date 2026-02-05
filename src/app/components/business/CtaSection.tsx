import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MessageSquare } from "lucide-react";

interface CtaSectionProps {
  onCta: () => void;
}

export function CtaSection({ onCta }: CtaSectionProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="bg-gradient-to-r from-amber-900/40 to-stone-900/40 border border-amber-900/30 rounded-2xl p-8 md:p-12 text-center">
      <p className="text-2xl md:text-3xl font-bold text-amber-50 mb-6">
        Pronto para organizar?
      </p>
      <motion.button
        onClick={onCta}
        className="px-10 py-4 bg-amber-900/50 hover:bg-amber-900/70 text-amber-50 rounded-xl text-lg font-semibold flex items-center gap-2 transition-colors border border-amber-900/50 mx-auto shadow-lg shadow-amber-900/20"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={
          reducedMotion
            ? undefined
            : {
                boxShadow: [
                  "0 0 0 0 rgba(245, 158, 11, 0.2)",
                  "0 0 0 12px rgba(245, 158, 11, 0)",
                ],
              }
        }
        transition={{
          boxShadow: reducedMotion
            ? {}
            : { repeat: Infinity, duration: 2, ease: "easeInOut" },
        }}
      >
        <MessageSquare className="w-5 h-5" />
        Falar agora
      </motion.button>
      <p className="text-neutral-400 text-sm mt-4">30min • Sem compromisso</p>
    </div>
  );
}
