import { useState } from "react";
import {
  Award,
  Star,
  ArrowLeft,
  Linkedin,
  Globe,
  MessageSquare,
  LayoutGrid,
  BarChart3,
  Cog,
  TrendingUp,
  FileStack,
  LayoutDashboard,
  Target,
  ShoppingCart,
  Package,
} from "lucide-react";
import { ContactPanel } from "./ContactPanel";
import { AnimatedHero } from "./business/AnimatedHero";
import { AnimatedStats } from "./business/AnimatedStats";
import { FlipCard } from "./business/FlipCard";
import { ProcessTimeline } from "./business/ProcessTimeline";
import { ForWhoSection } from "./business/ForWhoSection";
import { ServiceCard } from "./business/ServiceCard";
import type { ServiceItem } from "./business/ServiceCard";
import { CaseModal } from "./business/CaseModal";
import type { CaseData } from "./business/CaseModal";
import { CtaSection } from "./business/CtaSection";
import { AnimatePresence } from "motion/react";

interface BusinessViewProps {
  onBack: () => void;
}

// ========================================
// Dados de negócio — edite aqui
// ========================================
const CONTACT_DATA = {
  email: "seu.email@exemplo.com",
  whatsapp: "5577999786153",
  instagram: "https://www.instagram.com/tgb_inova/",
};

const BUSINESS_DATA = {
  name: "Tauan Gomes",
  linkedin: "https://www.linkedin.com/in/tauan-gomes-941866256/",
  website: null as string | null,
};

const PROCESS_STEPS = [
  {
    title: "Entendimento Profundo",
    shortLabel: "Entendemos",
    description:
      "Mapeamos seu negócio, processos atuais e objetivos. Não começamos sem entender o problema real.",
  },
  {
    title: "Planejamento Estratégico",
    shortLabel: "Planejamos",
    description:
      "Desenhamos a solução ideal para seu contexto: o que entregar, em que ordem, com qual investimento.",
  },
  {
    title: "Desenvolvimento Iterativo",
    shortLabel: "Construímos",
    description:
      "Você acompanha a evolução em ciclos curtos. Vê resultados rápidos, ajusta o rumo quando necessário.",
  },
  {
    title: "Entrega e Treinamento",
    shortLabel: "Entregamos",
    description:
      "Sistema no ar, equipe treinada, documentação completa. Você assume o controle desde o dia 1.",
  },
  {
    title: "Evolução Contínua",
    shortLabel: "Evoluímos",
    description:
      "Suporte técnico, ajustes e melhorias. Seu sistema evolui junto com seu negócio.",
  },
];

const SUCCESS_CASES: CaseData[] = [
  {
    id: 1,
    clientName: "Cliente E-commerce",
    projectType: "Loja Virtual Profissional",
    description:
      "Cliente vendia desorganizadamente pelo WhatsApp. Implementamos uma loja profissional que centralizou pedidos, pagamentos e estoque, aumentando as vendas em 150% nos primeiros 3 meses.",
    beforeLabel: "Vendas desorganizadas pelo WhatsApp",
    afterLabel: "Loja profissional com pedidos, pagamentos e estoque centralizados",
    results: [
      "150% de aumento nas vendas",
      "5.000+ produtos cadastrados",
      "Pagamentos integrados e seguros",
      "Gestão de estoque automatizada",
    ],
    testimonial:
      "A plataforma superou todas as expectativas. Hoje operamos com muito mais controle e escalabilidade.",
    rating: 5,
  },
  {
    id: 2,
    clientName: "Cliente B2B",
    projectType: "Landing Page + Gestão de Leads",
    description:
      "Empresa sem presença digital forte e leads dispersos em planilhas. Criamos uma página focada em conversão integrada a um sistema de gestão que qualificou e organizou o funil de vendas.",
    beforeLabel: "Sem presença digital, leads em planilhas",
    afterLabel: "Página de conversão + gestão de leads e funil organizado",
    results: [
      "300% mais leads qualificados",
      "Redução de 70% no tempo de atendimento",
      "Automação de follow-up",
      "Visibilidade em tempo real do funil",
    ],
    testimonial:
      "Recomendo de olhos fechados. O processo ficou claro e os resultados apareceram rápido.",
    rating: 5,
  },
  {
    id: 3,
    clientName: "Cliente Indústria",
    projectType: "Sistema de Gestão Operacional",
    description:
      "Operação dependente de planilhas e processos manuais. Desenvolvemos um sistema sob medida que integrou estoque, produção e vendas, eliminando retrabalho e inconsistências.",
    beforeLabel: "Planilhas e processos manuais",
    afterLabel: "Sistema integrado: estoque, produção e vendas",
    results: [
      "80% de redução em processos manuais",
      "Integração com ferramentas existentes",
      "Dashboards para decisão rápida",
      "Treinamento completo da equipe",
    ],
    testimonial:
      "A solução otimizou completamente nossos processos. Ótimo investimento para o negócio.",
    rating: 5,
  },
];

const SERVICES: ServiceItem[] = [
  {
    title: "Sites Institucionais & Landing Pages",
    problem: "Falta de presença digital profissional ou baixa conversão",
    transformation: "De invisível online para geração de leads qualificados",
    microcopy: "De invisível para leads",
    beforeIcon: Globe,
    afterIcon: Target,
    includes: [
      "Estratégia de conversão",
      "Integração com ferramentas de gestão",
      "Otimização para mecanismos de busca",
    ],
  },
  {
    title: "E-commerce Completo",
    problem: "Dificuldade em vender online ou gestão caótica de pedidos",
    transformation: "De vendas informais para operação profissional e escalável",
    microcopy: "De caos para controle",
    beforeIcon: ShoppingCart,
    afterIcon: Package,
    includes: [
      "Pagamentos integrados",
      "Gestão de estoque",
      "Relatórios de vendas",
      "Painel administrativo",
    ],
  },
  {
    title: "Sistemas Sob Medida",
    problem: "Processos manuais, planilhas desorganizadas, falta de integração",
    transformation: "De operação manual para automatizada e controlada",
    microcopy: "De manual para automático",
    beforeIcon: FileStack,
    afterIcon: LayoutDashboard,
    includes: [
      "Automações personalizadas",
      "Dashboards gerenciais",
      "Integrações com ferramentas existentes",
    ],
  },
];

export function BusinessView({ onBack }: BusinessViewProps) {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [showContactPanel, setShowContactPanel] = useState(false);
  const selectedCaseData = SUCCESS_CASES.find((c) => c.id === selectedCase);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-stone-900 to-neutral-950">
      {/* Header */}
      <header className="border-b border-stone-800/50 bg-neutral-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-neutral-400 hover:text-amber-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <div className="flex items-center gap-4">
            <a
              href={BUSINESS_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-amber-50 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            {BUSINESS_DATA.website && (
              <a
                href={BUSINESS_DATA.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-amber-50 transition-colors"
              >
                <Globe className="w-5 h-5" />
              </a>
            )}
            <button
              onClick={() => setShowContactPanel(true)}
              className="px-4 py-2 bg-amber-900/30 hover:bg-amber-900/50 text-amber-100 rounded-lg flex items-center gap-2 transition-colors border border-amber-900/50"
            >
              <MessageSquare className="w-4 h-4" />
              Vamos conversar
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatedHero name={BUSINESS_DATA.name} />

        <AnimatedStats />

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-amber-50 text-center mb-8">
            O que você ganha trabalhando comigo
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FlipCard
              icon={BarChart3}
              title="Controle Total da Operação"
              backCopy="Visão em tempo real"
            />
            <FlipCard
              icon={Cog}
              title="Processos Automatizados"
              backCopy="Menos tarefas repetitivas"
            />
            <FlipCard
              icon={TrendingUp}
              title="Crescimento Previsível"
              backCopy="Escala sem retrabalho"
            />
            <FlipCard
              icon={LayoutGrid}
              title="Investimento que se Paga"
              backCopy="Retorno em eficiência"
            />
          </div>
        </div>

        <ProcessTimeline steps={PROCESS_STEPS} />

        <ForWhoSection />

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-amber-50 text-center mb-8">
            O que entrego
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                onCta={() => setShowContactPanel(true)}
              />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-amber-50 text-center mb-8 flex items-center justify-center gap-2">
            <Award className="w-8 h-8 text-amber-600" />
            Cases de Sucesso
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUCCESS_CASES.map((case_) => (
              <button
                key={case_.id}
                type="button"
                onClick={() => setSelectedCase(case_.id)}
                className="bg-neutral-900/30 border border-amber-900/20 rounded-xl p-6 hover:border-amber-700/50 transition-all cursor-pointer group text-left"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-amber-50 group-hover:text-amber-400 transition-colors">
                    {case_.clientName}
                  </h3>
                  <div className="flex gap-0.5">
                    {[...Array(case_.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-amber-600 fill-amber-600"
                      />
                    ))}
                  </div>
                </div>
                <span className="inline-block text-amber-700 text-sm font-semibold mb-2">
                  {case_.projectType}
                </span>
                <p className="text-neutral-400 text-sm">Ver transformação</p>
              </button>
            ))}
          </div>
        </div>

        <CtaSection onCta={() => setShowContactPanel(true)} />
      </div>

      <AnimatePresence>
        {selectedCaseData && (
          <CaseModal data={selectedCaseData} onClose={() => setSelectedCase(null)} />
        )}
      </AnimatePresence>

      <ContactPanel
        isOpen={showContactPanel}
        onClose={() => setShowContactPanel(false)}
        email={CONTACT_DATA.email}
        whatsapp={CONTACT_DATA.whatsapp}
        instagram={CONTACT_DATA.instagram}
      />
    </div>
  );
}
