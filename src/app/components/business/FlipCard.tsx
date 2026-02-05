import { useState } from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

interface FlipCardProps {
  icon: LucideIcon;
  title: string;
  backCopy: string;
}

export function FlipCard({ icon: Icon, title, backCopy }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="perspective-[1000px] h-[200px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      role="button"
      tabIndex={0}
      aria-label={`${title}. Clique para ver mais.`}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0 bg-neutral-900/30 border border-amber-900/20 rounded-xl p-6 flex flex-col items-center justify-center backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="bg-amber-900/20 w-14 h-14 rounded-xl flex items-center justify-center mb-3">
            <Icon className="w-7 h-7 text-amber-600" />
          </div>
          <h3 className="text-lg font-bold text-amber-50 text-center">
            {title}
          </h3>
        </div>
        <div
          className="absolute inset-0 bg-neutral-900/50 border border-amber-900/30 rounded-xl p-6 flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p className="text-amber-100 text-center font-medium text-lg">
            {backCopy}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
