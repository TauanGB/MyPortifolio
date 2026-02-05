/**
 * Mensagens exibidas durante o carregamento dos dados da API.
 * Texto único para manter consistência e fácil compreensão.
 */
export const LOADING_LABEL = "Carregando dados do GitHub…";
export const LOADING_HINT =
  "O tempo pode variar conforme sua conexão e o desempenho do seu dispositivo.";

interface LoadingMessageProps {
  className?: string;
}

export function LoadingMessage({ className = "" }: LoadingMessageProps) {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-amber-100 font-medium">{LOADING_LABEL}</p>
      <p className="text-neutral-500 text-sm mt-1 max-w-md mx-auto">{LOADING_HINT}</p>
    </div>
  );
}
