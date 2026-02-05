import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Search, Map, Cog, Rocket, TrendingUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../ui/tooltip";

export interface ProcessStep {
  title: string;
  shortLabel: string;
  description: string;
}

const STEP_ICONS = [Search, Map, Cog, Rocket, TrendingUp];

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-amber-50 text-center mb-8">
        Como funciona o processo
      </h2>
      <div ref={ref} className="relative">
        <TooltipProvider delayDuration={200}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-2">
            {steps.map((step, index) => {
              const Icon = STEP_ICONS[index] ?? Cog;
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={
                        isInView
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.8 }
                      }
                      transition={{
                        delay: index * 0.12,
                        duration: 0.4,
                      }}
                      className="flex flex-col items-center flex-1"
                    >
                      <motion.div
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-900/30 border-2 border-amber-900/50 flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-amber-500" />
                      </motion.div>
                      <p className="mt-3 text-amber-50 font-semibold text-center text-sm md:text-base">
                        {step.shortLabel}
                      </p>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="max-w-xs bg-neutral-900 border border-amber-900/30 text-amber-50 px-4 py-3 text-sm"
                  >
                    <span className="font-medium text-amber-200">
                      {step.title}
                    </span>
                    <br />
                    {step.description}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
        {/* Connector line for mobile */}
        <div className="md:hidden flex justify-center gap-2 mt-4">
          {steps.slice(0, -1).map((_, i) => (
            <motion.div
              key={i}
              className="h-0.5 w-8 bg-amber-600/50 rounded"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: i * 0.12 + 0.3, duration: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
