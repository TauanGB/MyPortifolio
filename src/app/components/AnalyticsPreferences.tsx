import { useState, useSyncExternalStore } from 'react';
import { analyticsConfigured, getAnalyticsPreference, subscribeAnalyticsPreference, setAnalyticsPreference } from '../../services/analytics';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './ui/dialog';

export function AnalyticsPreferences() {
  const preference = useSyncExternalStore(subscribeAnalyticsPreference, getAnalyticsPreference);
  const [open, setOpen] = useState(false);
  const choose = (value: 'accepted' | 'rejected') => { setAnalyticsPreference(value); setOpen(false); };
  const choices = <div className="flex flex-wrap gap-3 mt-4">
    <button type="button" onClick={() => choose('rejected')} className="rounded-lg border border-slate-500 px-4 py-2 text-sm text-white hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-blue-400">Recusar medição</button>
    <button type="button" onClick={() => choose('accepted')} className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-white">Aceitar medição</button>
  </div>;
  const description = 'Com sua permissão, o Google Analytics mede visitas, origem do tráfego e cliques em produtos e contato. A tag só carrega após o aceite. Você pode recusar ou alterar sua escolha aqui a qualquer momento.';
  return <>
    {analyticsConfigured && preference === null && !open && <section aria-label="Preferência de medição" className="fixed bottom-4 left-4 right-4 z-40 max-w-xl rounded-2xl border border-slate-600 bg-slate-950 p-5 text-slate-200 shadow-xl sm:left-auto">
      <h2 className="text-base font-semibold text-white">Podemos medir sua visita?</h2>
      <p className="mt-2 text-sm leading-relaxed">{description}</p>
      {choices}
    </section>}
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><button type="button" className="text-sm text-slate-400 underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-blue-400">Privacidade e medição</button></DialogTrigger>
      <DialogContent className="border-slate-600 bg-slate-950 text-slate-100">
        <DialogTitle>Privacidade e medição</DialogTitle>
        <DialogDescription className="text-slate-300 leading-relaxed">{description}</DialogDescription>
        <p className="text-sm text-slate-300">Não enviamos nomes, emails, telefones ou mensagens nos eventos. A preferência fica armazenada neste navegador. Recusar interrompe novos eventos; não apaga dados já enviados.</p>
        <p className="text-sm text-slate-300">{!analyticsConfigured ? 'A medição está desativada neste ambiente.' : preference === 'accepted' ? 'Sua escolha atual: medição aceita.' : preference === 'rejected' ? 'Sua escolha atual: medição recusada.' : 'Você ainda não escolheu.'}</p>
        {analyticsConfigured && choices}
        <a href="https://policies.google.com/privacy?hl=pt-BR" target="_blank" rel="noreferrer" className="text-sm text-blue-400 underline">Política de privacidade do Google</a>
      </DialogContent>
    </Dialog>
  </>;
}
