import { useState } from "react";
import {
  Code2,
  Cpu,
  Database,
  GitBranch,
  Terminal,
  Globe,
  Github,
  Linkedin,
  ArrowLeft,
  ExternalLink,
  MessageSquare,
  RefreshCw,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { ContactPanel } from "./ContactPanel";
import { useGitHubData } from "@/hooks/useGitHubData";
import { Skeleton } from "./ui/skeleton";
import { LoadingMessage } from "./LoadingMessage";

interface DeveloperViewProps {
  onBack: () => void;
}

const STAT_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Cpu,
  GitBranch,
  Terminal,
};

export function DeveloperView({ onBack }: DeveloperViewProps) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showContactPanel, setShowContactPanel] = useState(false);
  const { data, loading, error, retry } = useGitHubData();

  const selectedProjectData = data?.projects.find((p) => p.id === selectedProject) ?? null;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-neutral-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-neutral-900/50 border border-amber-900/30 rounded-2xl p-8 text-center">
          <AlertCircle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-amber-50 mb-2">Erro ao carregar dados</h2>
          <p className="text-neutral-400 mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={retry}
              className="px-4 py-2 bg-amber-900/50 hover:bg-amber-900/70 text-amber-100 rounded-lg flex items-center justify-center gap-2 transition-colors border border-amber-900/50"
            >
              <RefreshCw className="w-4 h-4" />
              Tentar novamente
            </button>
            <button
              onClick={onBack}
              className="px-4 py-2 text-neutral-400 hover:text-amber-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-neutral-950">
        <header className="border-b border-neutral-800/50 bg-neutral-950/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-neutral-400 hover:text-amber-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
            <Skeleton className="h-9 w-32 bg-neutral-800" />
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-3 mb-8 pb-6 border-b border-neutral-800/50">
            <Loader2 className="w-8 h-8 text-amber-600 animate-spin" aria-hidden />
            <LoadingMessage />
          </div>
          <div className="mb-8">
            <Skeleton className="h-12 w-64 mb-2 bg-neutral-800" />
            <Skeleton className="h-6 w-48 mb-4 bg-neutral-800" />
            <Skeleton className="h-20 max-w-3xl bg-neutral-800" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 rounded-xl bg-neutral-800" />
            ))}
          </div>
          <div className="mb-8 bg-neutral-900/30 border border-amber-900/20 rounded-xl p-6">
            <Skeleton className="h-8 w-48 mb-6 bg-neutral-800" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32 bg-neutral-800" />
              ))}
            </div>
          </div>
          <div className="mb-8">
            <Skeleton className="h-8 w-56 mb-6 bg-neutral-800" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 rounded-xl bg-neutral-800" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { developerData, stats, projects, skills } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-neutral-950">
      <header className="border-b border-neutral-800/50 bg-neutral-950/80 backdrop-blur-sm sticky top-0 z-10">
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
              href={developerData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-amber-50 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            {developerData.linkedin && (
              <a
                href={developerData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-amber-50 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            <a
              href={developerData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-amber-50 transition-colors"
            >
              <Globe className="w-5 h-5" />
            </a>
            <button
              onClick={() => setShowContactPanel(true)}
              className="px-4 py-2 bg-amber-900/30 hover:bg-amber-900/50 text-amber-100 rounded-lg flex items-center gap-2 transition-colors border border-amber-900/50"
            >
              <MessageSquare className="w-4 h-4" />
              Entrar em Contato
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-50 mb-2">
            {developerData.name}
          </h1>
          <p className="text-xl text-amber-600 mb-4">{developerData.title}</p>
          <p className="text-neutral-300 max-w-3xl">{developerData.bio}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = STAT_ICON_MAP[stat.icon] ?? Code2;
            return (
              <div
                key={index}
                className="bg-neutral-900/50 border border-amber-900/20 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <IconComponent className="w-5 h-5 text-amber-600" />
                  <span className="text-3xl font-bold text-amber-50">{stat.value}</span>
                </div>
                <p className="text-sm text-neutral-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="mb-8 bg-neutral-900/30 border border-amber-900/20 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-amber-50 mb-6 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-amber-600" />
            Stack Técnico
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 mb-3">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frontend.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-amber-900/20 text-amber-300 rounded-lg text-sm border border-amber-900/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 mb-3">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {skills.backend.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-emerald-900/20 text-emerald-300 rounded-lg text-sm border border-emerald-900/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 mb-3">DevOps</h3>
              <div className="flex flex-wrap gap-2">
                {skills.devops.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-stone-700/20 text-stone-300 rounded-lg text-sm border border-stone-700/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 mb-3">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-neutral-700/20 text-neutral-300 rounded-lg text-sm border border-neutral-700/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-amber-50 mb-6 flex items-center gap-2">
            <Database className="w-6 h-6 text-amber-600" />
            Projetos Técnicos
          </h2>
          {projects.length === 0 ? (
            <p className="text-neutral-500">Nenhum repositório público encontrado.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  className="bg-neutral-900/50 border border-amber-900/20 rounded-xl p-6 hover:border-amber-700/50 transition-all cursor-pointer group"
                >
                  <h3 className="text-xl font-bold text-amber-50 mb-2 group-hover:text-amber-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                      <Cpu className="w-3 h-3" />
                      {project.architecture}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                      <Terminal className="w-3 h-3" />
                      {project.performance}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-neutral-800/50 text-neutral-400 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2 py-1 bg-neutral-800/50 text-neutral-400 rounded text-xs">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedProjectData && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-neutral-900 border border-amber-900/30 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-amber-50 mb-2">
                    {selectedProjectData.name}
                  </h2>
                  <a
                    href={selectedProjectData.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-500 text-sm flex items-center gap-1"
                  >
                    <Github className="w-4 h-4" />
                    Ver no GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-neutral-500 hover:text-amber-50 transition-colors text-2xl"
                >
                  ×
                </button>
              </div>

              <p className="text-neutral-300 mb-6">{selectedProjectData.description}</p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-neutral-950/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-semibold text-neutral-500">Arquitetura</span>
                  </div>
                  <p className="text-amber-50">{selectedProjectData.architecture}</p>
                </div>
                <div className="bg-neutral-950/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-semibold text-neutral-500">Performance</span>
                  </div>
                  <p className="text-amber-50">{selectedProjectData.performance}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-amber-50 mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProjectData.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-amber-900/20 text-amber-300 rounded-lg border border-amber-900/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-amber-50 mb-3">Features Técnicas</h3>
                <ul className="space-y-2">
                  {selectedProjectData.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-neutral-300">
                      <span className="text-amber-600 mt-1">▸</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <ContactPanel
        isOpen={showContactPanel}
        onClose={() => setShowContactPanel(false)}
        email={developerData.email}
        whatsapp={developerData.whatsapp}
        instagram={developerData.instagram}
      />
    </div>
  );
}
