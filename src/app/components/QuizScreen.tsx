import { Code2, Briefcase } from "lucide-react";

interface QuizScreenProps {
  onSelectAudience: (isDeveloper: boolean) => void;
}

export function QuizScreen({ onSelectAudience }: QuizScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-neutral-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-50 mb-4">
            Bem-vindo ao meu Portfólio
          </h1>
          <p className="text-xl text-neutral-400">
            Para uma melhor experiência, me conte:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Opção para Desenvolvedores */}
          <button
            onClick={() => onSelectAudience(true)}
            className="group bg-neutral-900/50 backdrop-blur-sm border-2 border-amber-900/30 rounded-2xl p-8 hover:bg-neutral-900/70 hover:border-amber-700/50 transition-all duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-amber-900/20 p-6 rounded-xl group-hover:bg-amber-900/30 transition-colors">
                <Code2 className="w-12 h-12 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-amber-50">
                Sou Desenvolvedor
              </h2>
              <p className="text-neutral-400">
                Ver detalhes técnicos, stack e arquitetura dos projetos
              </p>
            </div>
          </button>

          {/* Opção para Não-Desenvolvedores */}
          <button
            onClick={() => onSelectAudience(false)}
            className="group bg-neutral-900/50 backdrop-blur-sm border-2 border-stone-700/30 rounded-2xl p-8 hover:bg-neutral-900/70 hover:border-stone-600/50 transition-all duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-stone-800/20 p-6 rounded-xl group-hover:bg-stone-800/30 transition-colors">
                <Briefcase className="w-12 h-12 text-stone-500" />
              </div>
              <h2 className="text-2xl font-bold text-amber-50">
                Tenho um Negócio
              </h2>
              <p className="text-neutral-400">
                Ver como posso resolver problemas do meu negócio
              </p>
            </div>
          </button>
        </div>

        <div className="mt-12 text-center text-sm text-neutral-600">
          Escolha a opção que melhor descreve você
        </div>
      </div>
    </div>
  );
}