# Meu Portfólio

Portfólio pessoal desenvolvido com React, apresentando experiências voltadas para desenvolvedores e profissionais de negócios.

## Tecnologias

- **React** - Biblioteca para construção de interfaces
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis
- **shadcn/ui** - Componentes UI baseados em Radix

## Como executar localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Deploy

O site é publicado automaticamente no [GitHub Pages](https://pages.github.com/) a cada push na branch `main`.

**URL:** `https://[seu-usuario].github.io/MyPortifolio/`

Para ativar o deploy:

1. Faça push das alterações para o repositório
2. Acesse **Settings** → **Pages** no GitHub
3. Configure **Source:** GitHub Actions
4. O workflow `.github/workflows/deploy.yml` fará o deploy automaticamente

## Estrutura do projeto

- `src/app/App.tsx` - Componente principal com navegação entre views
- `src/app/components/` - Componentes da aplicação
  - `QuizScreen` - Tela inicial de seleção de público
  - `DeveloperView` - Visualização para desenvolvedores
  - `BusinessView` - Visualização para negócios

## Créditos

- [shadcn/ui](https://ui.shadcn.com/) - Componentes utilizados sob licença MIT
- [Unsplash](https://unsplash.com) - Fotos utilizadas conforme licença do serviço

## Nova página e Analytics

A página principal apresenta produtos comercializados, serviços, perfil e contato. O conteúdo está em `src/content/portfolio.ts`; a foto principal está em `src/assets/` e a imagem de compartilhamento em `public/`.

Petlife e Sistema EG3 usam descrições neutras até que funcionalidades, screenshots, papel no desenvolvimento e links de demonstração sejam confirmados. Os antigos cases genéricos não fazem parte da nova página.

### Configurar GA4

1. Crie ou selecione um fluxo Web no Google Analytics para `https://tauangb.github.io/MyPortifolio/`.
2. Em Settings → Secrets and variables → Actions → Variables do repositório, adicione `VITE_GA_MEASUREMENT_ID` com o ID público `G-...`.
3. O próximo build de produção inclui essa configuração. Sem ID, a página funciona sem Analytics.
4. Para testar localmente, copie `.env.example` para `.env.local`, informe o ID e use o build/preview de produção.
5. Aceite a medição e confira os eventos no Tempo real/DebugView do GA4. Recusar ou revogar interrompe a medição. Navegação local não comprova entrega ao Google.

Eventos: `page_view`, `view_product`, `click_contact`, `view_technical`; `click_product_demo` fica disponível para quando houver demos reais. Cadastre dimensões personalizadas para `product_id`, `channel` e `placement` se quiser usá-las nos relatórios. Não configure identificação de usuários nem dados pessoais em eventos. Cliques de contato não comprovam mensagens ou vendas.

A preferência é armazenada no navegador. O visitante pode alterá-la no rodapé. A medição é opcional e pode ser bloqueada pelo navegador.

### Validar e publicar

Execute `npx tsc --noEmit` e `npm run build`. O workflow usa `npm ci`, verifica TypeScript e publica o build sob `/MyPortifolio/` quando há push em `main`. Um commit local não publica o site. Confira o site publicado e a recepção no GA4 separadamente.

Para manter somente os eventos definidos no código e evitar envio automático de URLs de links/formulários, desative a **Medição otimizada (Enhanced measurement)** nas configurações do fluxo Web do GA4. O código desativa o pageview automático da tag, mas as opções do fluxo também precisam ser conferidas. O Analytics recebe URLs sem parâmetros e fragmentos nos eventos manuais.
