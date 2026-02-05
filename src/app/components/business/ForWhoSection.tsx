import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Target, Ban, TrendingUp, Gauge, Layers, Globe, FlaskConical, UserX } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../ui/tooltip";

const FOR_ITEMS: { keyword: string; fullText: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { keyword: "Negócio validado", fullText: "Negócios já validados buscando organização e escala", Icon: TrendingUp },
  { keyword: "Precisa organização", fullText: "Empreendedores que precisam de controle sobre processos", Icon: Gauge },
  { keyword: "Quer escalar", fullText: "Empresas cansadas de sistemas improvisados ou planilhas", Icon: Layers },
];

const NOT_FOR_ITEMS: { keyword: string; fullText: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { keyword: "Só visual", fullText: "Quem busca apenas um site bonito sem estratégia", Icon: Globe },
  { keyword: "Experimento", fullText: "Projetos experimentais sem validação de mercado", Icon: FlaskConical },
  { keyword: "Só delegar", fullText: "Quem quer terceirizar sem se envolver no processo", Icon: UserX },
];

function Item({
  keyword,
  fullText,
  Icon,
  isPositive,
  index,
  isInView,
}: {
  keyword: string;
  fullText: string;
  Icon: React.ComponentType<{ className?: string }>;
  isPositive: boolean;
  index: number;
  isInView: boolean;
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.li
            initial={{ opacity: 0, x: isPositive ? -12 : 12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.08, duration: 0.35 }}
            className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-white/5 transition-colors cursor-default"
          >
            <div
              className={
                isPositive
                  ? "bg-emerald-900/30 p-2 rounded-lg"
                  : "bg-neutral-800/50 p-2 rounded-lg opacity-70"
              }
            >
              <Icon
                className={
                  isPositive ? "w-5 h-5 text-emerald-400" : "w-5 h-5 text-neutral-500"
                }
              />
            </div>
            <span
              className={
                isPositive ? "text-amber-50 font-medium" : "text-neutral-400 font-medium"
              }
            >
              {keyword}
            </span>
          </motion.li>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="max-w-xs bg-neutral-900 border border-stone-700 text-neutral-200 px-4 py-3 text-sm"
        >
          {fullText}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ForWhoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-6 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="bg-neutral-900/30 border border-emerald-900/20 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-amber-50 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-500" />
          Para você
        </h3>
        <ul className="space-y-0">
          {FOR_ITEMS.map((item, idx) => (
            <Item
              key={idx}
              keyword={item.keyword}
              fullText={item.fullText}
              Icon={item.Icon}
              isPositive={true}
              index={idx}
              isInView={isInView}
            />
          ))}
        </ul>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
        className="bg-neutral-900/30 border border-stone-700/30 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-amber-50 mb-4 flex items-center gap-2">
          <Ban className="w-5 h-5 text-neutral-500" />
          Não é para
        </h3>
        <ul className="space-y-0">
          {NOT_FOR_ITEMS.map((item, idx) => (
            <Item
              key={idx}
              keyword={item.keyword}
              fullText={item.fullText}
              Icon={item.Icon}
              isPositive={false}
              index={idx}
              isInView={isInView}
            />
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
