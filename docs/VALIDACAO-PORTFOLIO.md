# Validação do portfólio — 15/10/2026

## Verificações automatizadas

- `npm run check`: aprovado, sem erros TypeScript.
- `npm test`: 12 testes aprovados com `node:test`, sem novas dependências instaladas.
- `npm run build`: aprovado, build estático para o caminho existente `/MyPortifolio/`.
- `git diff --check`: aprovado, sem erros de espaços ou conflitos no diff.
- Inspeção local de `dist/`: ícone, JavaScript e CSS referenciados pelo HTML existem; imagem de compartilhamento presente; URLs de produção e WhatsApp presentes no bundle; suporte a movimento reduzido presente no CSS gerado. Essa inspeção de arquivos não substitui uma resposta HTTP nem uma revisão no navegador.

Os testes cobrem:

1. Consentimento de medição: ausência de tag antes do aceite, recusa, revogação, sincronização entre abas, armazenamento indisponível e ausência de duplicação de pageview.
2. Simulação: impedir resgate antecipado, atingir a meta, resgatar, iniciar novo ciclo, descartar excedentes na mudança de ciclo e reiniciar os dados fictícios.
3. HTML renderizado do componente real: destino exato do botão de produção, nova aba protegida, destinos das âncoras internas, links de contato e GitHub, um título principal, seções identificadas, link de pular conteúdo e semântica inicial do progresso e do status.
4. Cálculo de contraste: pares principais de texto, superfícies, botão azul e seção escura atingem WCAG AA para texto normal (4,5:1). Isso não equivale a uma auditoria completa de acessibilidade.

## Limitações verificadas do ambiente

- A conexão de automação do navegador foi tentada duas vezes, incluindo reinicialização. Falhou antes de abrir uma página: `MXC launcher: cannot locate required Windows platform directory`, HRESULT `0x80070003`.
- A ferramenta de abertura da prévia no painel também retornou erro de execução.
- O Vite anunciou a prévia em `http://127.0.0.1:4173/MyPortifolio/`, mas as duas tentativas de acesso HTTP local foram bloqueadas por permissões de socket. A tentativa em Node retornou `connect EACCES 127.0.0.1:4173`. Portanto, não há confirmação de resposta HTTP nem de entrega dos assets pelo servidor.
- Sem navegador operacional, **não foram validados visualmente** desktop/celular, ausência real de rolagem horizontal, enquadramento final, cliques, ordem de tabulação, funcionamento do modal ou abertura efetiva da nova aba. Não foram produzidas capturas da página.
- Os destinos externos foram conferidos no HTML renderizado, sem navegar no Fidelity nem iniciar contatos. A disponibilidade atual de WhatsApp, LinkedIn, GitHub e do produto externo não foi testada.

## Revisão manual ao visualizar

1. Execute `npm run dev -- --host 127.0.0.1` e abra a URL do Vite sob `/MyPortifolio/`.
2. Confira em 1440, 1024, 768, 390 e 320 px. Verifique títulos, prévias e retrato, sem rolagem horizontal ou sobreposição de legendas.
3. Navegue com Tab: link de pular, cabeçalho, projetos, produção, simulação e contatos. Confira o foco visível.
4. Na simulação, registre duas compras; resgate e confira 0 de 5 no ciclo seguinte. Reinicie. O foco deve voltar a Registrar compra após o resgate.
5. Abra Privacidade e medição; feche com Escape e confirme retorno do foco ao botão.
6. Ative movimento reduzido: animações, transições e rolagem suave devem parar.
7. Verifique a abertura em nova aba do destino público autorizado, sem acessar dados privados.

## Arquivos alterados ou adicionados

- `src/app/components/portfolio/PortfolioPage.tsx`
- `src/app/components/portfolio/fidelityDemo.ts` (novo)
- `src/content/portfolio.ts`
- `src/styles/portfolio.css`
- `src/app/components/AnalyticsPreferences.tsx`
- `src/app/components/ui/dialog.tsx` (rótulo Fechar)
- `src/services/analytics.ts` (título da página)
- `index.html`
- `public/favicon.svg` (novo)
- `package.json` (scripts de teste e verificação)
- `tests/fidelity-demo.test.mjs` (novo)
- `tests/portfolio.test.mjs` (novo)
- `README.md`
- `docs/VALIDACAO-PORTFOLIO.md` (novo)

Nenhum arquivo do Fidelity foi escrito. Sem cópia de dados de produção, deploy, push ou envio de mensagens.
