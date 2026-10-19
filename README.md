# Portfólio profissional — Tauan Gomes

Página em React, TypeScript e Vite, com a linguagem visual da landing page Fidelity: branco, superfícies azul claro, ações azuis e um case em azul escuro. A entrada padrão continua exibindo diretamente o portfólio.

## Visualizar localmente

Na pasta `D:\GitHub\MyPortifolio`, execute:

```powershell
npm install # somente se as dependências ainda não estiverem instaladas
npm run dev -- --host 127.0.0.1
```

Abra a URL indicada pelo Vite, normalmente **http://127.0.0.1:5173/MyPortifolio/**. Se a porta estiver ocupada, use a porta que ele informar. O caminho `/MyPortifolio/` preserva a configuração existente para GitHub Pages.

Para conferir o build de produção:

```powershell
npm run check
npm test
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Abra **http://127.0.0.1:4173/MyPortifolio/**. Abrir `dist/index.html` diretamente pelo explorador não substitui servir o build por HTTP.

## Conteúdo e edição

- `src/content/portfolio.ts`: nome, localização, retrato, contatos, link de produção, tecnologias e textos da abordagem. Os dados de contato foram preservados do portfólio existente; não foram inventados novos canais.
- `src/app/components/portfolio/PortfolioPage.tsx`: abertura, projetos, case Fidelity, abordagem, sobre e contato.
- `src/app/components/portfolio/fidelityDemo.ts`: simulação local da campanha de cinco compras.
- `src/styles/portfolio.css`: paleta, hierarquia, layouts, foco, movimento reduzido e suporte a cores forçadas.
- `src/app/components/AnalyticsPreferences.tsx`: preferências de medição e modal Radix acessível.
- `src/services/analytics.ts`: medição opcional existente, preservada com consentimento.
- `index.html` e `public/favicon.svg`: metadados, fallback sem JavaScript e ícone.
- `tests/`: verificações de consentimento, simulação e estrutura do HTML renderizado.

Ao alterar nome ou contatos, atualize também metadados e fallback `<noscript>` em `index.html`. O título do evento de página está em `src/services/analytics.ts`. Não cadastre credenciais ou dados privados no conteúdo público.

## Projetos e evidências

### Fidelity

Produto indicado pelo proprietário como desenvolvido por ele e em produção. Funcionalidades confirmadas por leitura de código, sem consultar banco ou dados reais:

- `customers/models.py`: cadastro de clientes e registros de compras associados à campanha.
- `loyalty/models.py`: campanhas por quantidade de compras ou meses consecutivos e histórico de resgates.
- `loyalty/services.py`: cálculo de progresso, elegibilidade, fechamento mensal e contagem após o último resgate.
- `customers/views.py` e `loyalty/views.py`: gestão, consulta de progresso e validação antes do resgate.
- Templates, CSS e `requirements.txt`: interface e backend Django/Python.

A referência visual foi lida em `D:\GitHub\Client Fidelity System\portfolio`. Nenhum arquivo desse projeto foi alterado. O portfólio não importa código, banco, `.env`, mídia ou capturas do Fidelity.

O botão **Ver projeto em produção** aponta exatamente para `https://pet-life.up.railway.app/`, com `target="_blank"` e `rel="noopener noreferrer"`. Essa URL é apenas um destino externo; não há iframe, consulta ao backend ou carregamento antecipado do produto.

### Este portfólio

Implementação verificável neste repositório: React, TypeScript, Vite e Radix UI. A interface apresenta cases e contatos sem o antigo passo obrigatório de seleção de público. O repositório público configurado é `https://github.com/TauanGB/MyPortifolio`.

### Pendências de conteúdo

- **Sistema EG3:** já era citado nos materiais, mas não há código nem evidências suficientes aqui para descrever problema, funcionalidades, contribuição específica e tecnologias. Foi omitido da vitrine até haver material confirmado. Adicione uma entrada e um case quando essas informações estiverem disponíveis.
- **Email:** não foi localizado email profissional confirmado; o contato usa WhatsApp e LinkedIn já configurados.
- Não há métricas de resultado, depoimentos ou clientes adicionados sem evidência.

## Demonstração e privacidade

As prévias são recriações identificadas, com clientes, compras e recompensa fictícios. Não são capturas do produto em produção. A demonstração começa em 3 de 5 compras; duas compras liberam o resgate. Resgatar zera a contagem e incrementa o ciclo. Compras excedentes não passam para o ciclo seguinte. Reiniciar restaura o estado; recarregar também. O resgate fica desabilitado antes da meta e o resultado das ações é anunciado por uma região de status.

A simulação não usa rede, armazenamento persistente nem dados reais. Ela representa apenas a regra por quantidade de compras; a regra mensal do produto é explicada separadamente.

O Google Analytics existente continua opcional: inativo sem ID válido, fora de produção ou sem aceite. A escolha de medição usa armazenamento local; isso é independente da simulação.

Para configurar GA4, informe o identificador público `VITE_GA_MEASUREMENT_ID` conforme `.env.example` ou a variável do workflow. Não coloque segredos no frontend. Desative a medição otimizada do fluxo se quiser manter somente os eventos manuais. A chegada de eventos ao Google requer validação separada no ambiente publicado.

## Validação desta implementação

Consulte `docs/VALIDACAO-PORTFOLIO.md` para resultados, arquivos alterados e limitações da revisão. A adaptação foi feita sem novas dependências de aplicação.

## Publicação

**Não houve deploy nem push nesta tarefa.** O workflow existente publica no GitHub Pages ao receber push em `main`; mantenha isso em mente ao publicar futuramente. A geração de `dist/` é somente local.
