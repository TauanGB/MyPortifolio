import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import { CheckSquare, Handshake, Star, Calendar } from "lucide-react";

const STATS = [
  { value: 10, suffix: "+", label: "Projetos", Icon: CheckSquare },
  { value: 8, suffix: "+", label: "Clientes", Icon: Handshake },
  { value: 98, suffix: "%", label: "Satisfação", Icon: Star, isPercent: true },
  { value: 3, suffix: "", label: "Meses suporte", Icon: Calendar },
];

function useCountUp(end: number, isPercent: boolean, enabled: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const duration = 1200;
    const steps = 40;
    const step = end / steps;
    const stepMs = duration / steps;
    let current = 0;
    const id = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(id);
        return;
      }
      setCount(Math.floor(current));
    }, stepMs);
    return () => clearInterval(id);
  }, [end, enabled, isPercent]);
  return count;
}

function StatCard({
  value,
  suffix,
  label,
  Icon,
  isPercent,
  isInView,
}: {
  value: number;
  suffix: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  isPercent?: boolean;
  isInView: boolean;
}) {
  const count = useCountUp(value, !!isPercent, isInView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-neutral-900/30 border border-amber-900/20 rounded-xl p-6 text-center"
    >
      <div className="flex justify-center mb-3">
        <Icon className="w-8 h-8 text-amber-600" />
      </div>
      <motion.div
        className="text-4xl font-bold text-amber-50 mb-2"
        key={count}
        initial={isInView ? { scale: 1.2 } : false}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {count}
        {suffix}
      </motion.div>
      <div className="text-sm text-neutral-400">{label}</div>
    </motion.div>
  );
}

export function AnimatedStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {STATS.map((stat, index) => (
        <StatCard
          key={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
          Icon={stat.Icon}
          isPercent={stat.isPercent}
          isInView={isInView}
        />
      ))}
    </div>
  );
}
