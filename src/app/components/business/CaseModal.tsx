import { useEffect } from "react";
import { motion } from "motion/react";
import { Star, TrendingUp, X } from "lucide-react";

export interface CaseData {
  id: number;
  clientName: string;
  projectType: string;
  description: string;
  results: string[];
  testimonial: string;
  rating: number;
  beforeLabel: string;
  afterLabel: string;
}

interface CaseModalProps {
  data: CaseData;
  onClose: () => void;
}

export function CaseModal({ data, onClose }: CaseModalProps) {
  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [onClose]);

  const shortTestimonial =
    data.testimonial.length > 80
      ? data.testimonial.slice(0, 77) + "..."
      : data.testimonial;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-neutral-900 border border-amber-900/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-amber-50 mb-1">
                {data.clientName}
              </h2>
              <p className="text-amber-600 font-semibold text-sm">
                {data.projectType}
              </p>
              <div className="flex gap-0.5 mt-2">
                {[...Array(data.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-500 fill-amber-500"
                  />
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="text-neutral-400 hover:text-amber-50 transition-colors p-1 rounded"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Antes / Depois */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-neutral-950/80 rounded-xl p-4 border border-stone-700/50"
            >
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">
                Antes
              </p>
              <p className="text-neutral-300 text-sm">{data.beforeLabel}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-900/30"
            >
              <p className="text-xs text-emerald-400 uppercase tracking-wider mb-2">
                Depois
              </p>
              <p className="text-neutral-200 text-sm">{data.afterLabel}</p>
            </motion.div>
          </div>

          {/* Resultados */}
          <div className="bg-neutral-950/50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-amber-50 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Resultados
            </h3>
            <ul className="space-y-3">
              {data.results.map((result, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                  className="flex items-start gap-3 text-neutral-300"
                >
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span>{result}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Depoimento */}
          <div className="bg-amber-950/20 rounded-xl p-6 border border-amber-900/20">
            <p className="text-4xl text-amber-900/50 font-serif leading-none mb-2">
              "
            </p>
            <p className="text-neutral-200 italic text-lg">{shortTestimonial}</p>
            <p className="text-4xl text-amber-900/50 font-serif leading-none text-right mt-2">
              "
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
