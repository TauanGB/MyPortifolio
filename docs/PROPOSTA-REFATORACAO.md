# Proposta de refatoração do portfólio

Data: 13/10/2026. Estado: proposta para execução por agentes; frontend e publicação ainda não alterados.

## Objetivo

Apresentar Tauan Gomes como desenvolvedor de produtos digitais, evidenciar produtos já comercializados — Petlife e Sistema EG3, conforme informado pelo proprietário — e facilitar contatos. Medir acessos e interesse nos projetos com Google Analytics 4 no GitHub Pages.

## Diagnóstico do código atual

- React, TypeScript, Vite e Tailwind já permitem executar a mudança sem migrar de framework.
- `App.tsx` começa pelo `QuizScreen`, exigindo uma escolha antes de mostrar projetos ou apresentação.
- `BusinessView.tsx` contém cases genéricos, depoimentos e percentuais. Substituir por conteúdo comprovado; não reaproveitar números como resultados reais.
- Há email de exemplo na área comercial. Centralizar contatos e confirmar os dados antes da publicação.
- A área técnica consulta a API pública do GitHub. A vitrine principal deve funcionar mesmo quando essa API falhar.
- `vite.config.ts` já define `/MyPortifolio/`; `.github/workflows/deploy.yml` já prepara publicação via Actions ao receber push em `main`. Isso não comprova que o site esteja publicado atualmente.
- Não foi identificada integração GA4 nos arquivos inspecionados.
- Existem alterações locais em `package.json`, `package-lock.json`, `App.tsx` e um `tsconfig.json` não rastreado. Preservar e integrar essas alterações.

## Direção visual proposta

Uma página principal com fundo grafite, textos claros, destaque azul e espaçamento generoso. A paleta conversa com o terno azul e o fundo escuro da foto fornecida. Tipografia com títulos fortes e parágrafos curtos; reduzir cards repetitivos, efeitos de virar cartões e carrosséis automáticos.

Ordem da página:

1. Cabeçalho: nome, Produtos, Serviços, Sobre, contato e acesso à visão técnica.
2. Abertura: “Desenvolvo produtos digitais que simplificam operações.” Subtítulo sobre sistemas, aplicativos e integrações; botões “Conhecer meus produtos” e “Conversar sobre um projeto”. Foto à direita no desktop e abaixo do texto no celular.
3. Produtos comercializados: Petlife e Sistema EG3 em destaque, com imagens reais, descrição curta e botão para conhecer cada produto.
4. Serviços: desenvolvimento de sistemas, aplicativos e automações, descritos por problema resolvido.
5. Sobre: trajetória, forma de trabalho, foto e competências confirmadas.
6. Detalhes técnicos: projetos selecionados, tecnologias e GitHub; informação complementar ao conteúdo comercial.
7. Contato e rodapé com links, preferências de medição e informação de privacidade.

Não exigir quiz na entrada. Se houver seleção comercial/técnica, torná-la opcional e acessível por link compartilhável com hash, compatível com hospedagem estática.

### Foto fornecida

Origem: `C:/Users/tauan/Downloads/WhatsApp Image 2026-10-13 at 15.37.27.jpeg`.

Na execução, copiar para os assets do projeto, gerar versões otimizadas e preservar o original. Usar enquadramento vertical 4:5 ou 3:4 que reduza o espaço vazio superior sem cortar rosto e ombros. Manter aparência e identidade; não é necessária geração de uma nova imagem. Definir posição focal após conferir desktop e celular. Usar texto alternativo “Tauan Gomes” e dimensões explícitas para evitar deslocamento do conteúdo. A foto principal deve carregar cedo; imagens abaixo da dobra podem carregar sob demanda. Novas fotos devem poder ser trocadas por configuração sem alterar o layout.

## Produtos reais

Cada produto deve ter: nome, segmento, problema, solução, papel de Tauan no desenvolvimento, funcionalidades confirmadas, tecnologias confirmadas, imagens, status e links disponíveis. Só mostrar botões de demonstração ou acesso quando houver destino real; quando não houver, oferecer “Solicitar apresentação”.

- **Petlife:** destacar como produto comercializado. Histórico anterior identifica uma plataforma de fidelização; confirmar descrição atual, funcionalidades e marca antes de publicar.
- **Sistema EG3:** destacar como produto comercializado. Histórico anterior menciona EG3 Driver App com Flutter/GPS; confirmar se é o mesmo produto ou um módulo do Sistema EG3 antes de associar essas características.

Preferir dois estudos de caso completos a uma lista extensa de repositórios. Detalhamento com contexto, telas reais e contribuição do desenvolvedor. Sem métricas, logos de clientes ou depoimentos sem evidência. Não expor dados de clientes nos screenshots nem inventar interfaces do produto para apresentá-las como reais.

## Estrutura técnica sugerida

- `src/content/portfolio.ts`: dados públicos de perfil, contatos e produtos, com tipos explícitos.
- `src/app/components/portfolio/`: Header, Hero, ProductShowcase, ProductDetails, Services, About e Footer.
- `src/assets/`: retrato e imagens dos produtos, importados pelo Vite para respeitar o caminho de publicação.
- `src/services/analytics.ts`: inicialização e eventos GA4 com comportamento seguro quando não configurado.
- `src/app/components/AnalyticsPreferences.tsx`: controle de preferência de medição.
- Reaproveitar componentes acessíveis existentes. Remover dependências somente após verificar uso; não fazer limpeza ampla durante o redesenho.
- GitHub como complemento, com loading, cache e fallback; informações principais em conteúdo local.
- Melhorar título, descrição, imagem de compartilhamento e semântica do HTML. Se indexação completa do conteúdo for requisito, avaliar prerenderização estática em etapa própria.

## Google Analytics 4

Criar ou selecionar uma propriedade GA4 e fluxo Web para a URL final do GitHub Pages. Receber o identificador público `G-...` e configurá-lo como `VITE_GA_MEASUREMENT_ID`, disponível ao build no Actions. Esse identificador não é uma credencial secreta; não inserir chaves de API ou segredos no frontend.

Carregar a tag somente com configuração válida, em produção e após a opção de medição ser aceita. Oferecer aceitar, recusar e alterar preferência; o site deve funcionar em todas as escolhas. A informação de privacidade deve corresponder ao comportamento implementado. Não enviar nomes, emails, telefones ou texto de mensagens ao Analytics.

Eventos propostos:

| Evento | Finalidade | Parâmetros permitidos |
| --- | --- | --- |
| `page_view` | Entrada na página | URL/título sem dados pessoais |
| `view_product` | Abrir detalhes de um produto | `product_id` |
| `click_product_demo` | Clicar em demonstração | `product_id` |
| `click_contact` | Clicar em contato | `channel`, `placement` |
| `view_technical` | Abrir visão técnica | `placement` |

Não contar abertura de modal como nova página por padrão. Evitar duplicar pageviews entre medição automática e manual. Registrar dimensões personalizadas para os parâmetros necessários nos relatórios. Clique em WhatsApp representa interesse, não comprova conversa ou venda.

Acompanhar usuários, sessões, origem do tráfego, dispositivos, produtos consultados e cliques em contato dentro do GA4. Validar com DebugView e Tempo real após publicar; build local não comprova recebimento de eventos. A medição depende da escolha do visitante e pode ser bloqueada pelo navegador.

Referências: [eventos GA4](https://developers.google.com/analytics/devguides/collection/ga4/events), [parâmetros](https://developers.google.com/analytics/devguides/collection/ga4/event-parameters), [Vite no GitHub Pages](https://vite.dev/guide/static-deploy.html).

## Execução por agentes

Coordenador define contratos de dados e componentes primeiro. Depois, agentes 1, 2 e 3 podem trabalhar em paralelo em arquivos distintos. Coordenador integra `App.tsx`, `index.html` e workflow; agente 4 revisa a integração pronta. Todos devem preservar alterações existentes e adaptar-se às mudanças dos demais.

| Responsável | Escopo e propriedade | Entrega |
| --- | --- | --- |
| Coordenador | Contratos, `App.tsx`, `index.html`, workflow e integração | Composição final, metadados e build para Pages |
| Agente 1 — frontend | `components/portfolio/`, estilos específicos e retrato | Página responsiva com nova hierarquia visual |
| Agente 2 — produtos | `src/content/portfolio.ts`, mídia dos produtos e documentação factual | Petlife/EG3 com conteúdo validado e links reais |
| Agente 3 — medição | `analytics.ts`, tipos de ambiente, preferências e `.env.example` | GA4 configurável e eventos sem duplicação |
| Agente 4 — revisão | Inspeção independente; sem edição inicial | Achados de UX, acessibilidade, conteúdo, Pages e medição |

### Instruções prontas para delegação

**Agente 1:** implemente o visual definido nesta proposta usando React/Vite/Tailwind existentes. Sua propriedade é `components/portfolio/`, estilos associados e retrato. Não edite App ou workflow. Entregue componentes com contratos acordados, acessíveis por teclado, adaptados a celular e com movimento reduzido. Você não está sozinho no repositório: preserve alterações de outros agentes e as alterações locais preexistentes.

**Agente 2:** organize os dados em `src/content/portfolio.ts` e mídia de produtos. Use somente fatos confirmados. Petlife e Sistema EG3 são comercializados conforme o proprietário; funcionalidades, papel, links e resultados precisam de validação. Documente lacunas e deixe campos opcionais ausentes, sem conteúdo fictício. Preserve mudanças dos demais; não edite componentes de layout.

**Agente 3:** implemente integração GA4 em `src/services/analytics.ts`, preferências, tipos e `.env.example`. Não crie contas, não publique e não use credenciais privadas. Inativo sem ID válido, fora de produção ou sem aceite. Exponha funções tipadas para os eventos definidos; coordenador liga os componentes e injeta a variável no workflow. Verifique ausência de eventos duplicados e de dados pessoais. Preserve mudanças de outros agentes.

**Agente 4:** revise a integração de forma independente. Verifique conteúdo factual, celular, teclado, foco dos modais, contraste, movimento reduzido, imagens, falha da API GitHub, paths `/MyPortifolio/`, build e preferências de medição. Diferencie evidência local de site publicado e eventos recebidos no GA4. Informe problemas concretos e não publique.

## Critérios de entrega

- Nome, proposta de valor e produtos acessíveis imediatamente, sem quiz obrigatório.
- Retrato real com bom enquadramento em celular e desktop.
- Petlife e EG3 sem funcionalidades ou resultados inventados; nenhum email de exemplo.
- Nenhuma rolagem horizontal em telas pequenas; navegação e detalhes por teclado; foco restaurado ao fechar detalhes.
- Build de produção e verificação TypeScript; smoke test servido sob `/MyPortifolio/`, incluindo imagens e links.
- Página útil mesmo se GitHub ou GA4 não responderem.
- Medição recusada não carrega tag nem envia eventos; aceitar inicia uma vez; alterar preferência interrompe envios e persiste escolha.
- Workflow mantém publicação estática. Executar validação local antes de qualquer push em `main`, pois esse push dispara deploy.
- Publicação e recebimento no GA4 relatados como etapas separadas, com evidência real.

## Insumos ainda necessários para execução completa

Identificador GA4 e URL pública confirmada; email/contatos definitivos; screenshots/logos e links autorizados dos produtos; descrição atual do Petlife; relação entre Sistema EG3 e EG3 Driver App; papel de Tauan em cada produto. A foto já foi fornecida. O layout e a base técnica podem avançar antes dos demais insumos, mantendo conteúdo incompleto fora da versão pública.
