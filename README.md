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
