import { Mail, MessageCircle, Instagram, X } from "lucide-react";

interface ContactPanelProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  whatsapp: string;
  instagram: string; // Altere para seu Instagram
}

export function ContactPanel({ isOpen, onClose, email, whatsapp, instagram }: ContactPanelProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-neutral-900 to-neutral-950 border-2 border-amber-900/30 rounded-xl max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-amber-50">Vamos conversar</h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-amber-50 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-neutral-400 mb-6">
            Escolha a melhor forma de contato para você:
          </p>

          <div className="space-y-3">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-neutral-800/50 hover:bg-neutral-800 border border-amber-900/20 hover:border-green-800/50 rounded-lg transition-all group"
            >
              <div className="bg-green-900/30 p-3 rounded-lg group-hover:bg-green-900/50 transition-colors">
                <MessageCircle className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-amber-50">WhatsApp</h3>
                <p className="text-sm text-neutral-400">Resposta rápida e direta</p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-4 p-4 bg-neutral-800/50 hover:bg-neutral-800 border border-amber-900/20 hover:border-amber-900/50 rounded-lg transition-all group"
            >
              <div className="bg-amber-900/30 p-3 rounded-lg group-hover:bg-amber-900/50 transition-colors">
                <Mail className="w-6 h-6 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-amber-50">Email</h3>
                <p className="text-sm text-neutral-400">{email}</p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-neutral-800/50 hover:bg-neutral-800 border border-amber-900/20 hover:border-pink-900/50 rounded-lg transition-all group"
            >
              <div className="bg-pink-900/30 p-3 rounded-lg group-hover:bg-pink-900/50 transition-colors">
                <Instagram className="w-6 h-6 text-pink-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-amber-50">Instagram</h3>
                <p className="text-sm text-neutral-400">Conheça mais do meu trabalho</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
