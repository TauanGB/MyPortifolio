import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileStack, Sparkles, Zap } from "lucide-react";

const FRAMES = [
  {
    key: "chaos",
    microcopy: "Seu negócio hoje",
    Icon: FileStack,
    description: "Caos",
  },
  {
    key: "transformation",
    microcopy: "Organização automática",
    Icon: Sparkles,
    description: "Transformação",
  },
  {
    key: "freedom",
    microcopy: "Mais tempo, menos custo",
    Icon: Zap,
    description: "Liberdade",
  },
];

const FRAME_DURATION_MS = 2500;

interface AnimatedHeroProps {
  name: string;
}

export function AnimatedHero({ name }: AnimatedHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % FRAMES.length);
    }, FRAME_DURATION_MS);
    return () => clearInterval(id);
  }, [reducedMotion]);

  const frame = FRAMES[currentIndex];

  return (
    <div className="text-center mb-12">
      <div className="relative min-h-[280px] md:min-h-[320px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={frame.key}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="bg-neutral-900/50 border border-amber-900/30 rounded-2xl p-10 md:p-14 mb-6"
            >
              <frame.Icon className="w-16 h-16 md:w-20 md:h-20 text-amber-500/90 mx-auto" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-semibold text-amber-50"
            >
              {frame.microcopy}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {FRAMES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para frame ${i + 1}`}
            onClick={() => setCurrentIndex(i)}
            className="h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            style={{
              width: currentIndex === i ? 24 : 8,
              backgroundColor: currentIndex === i ? "rgb(245 158 11)" : "rgb(120 113 108)",
            }}
          />
        ))}
      </div>

      <p className="text-neutral-400 text-base mt-6">— {name}</p>
    </div>
  );
}
