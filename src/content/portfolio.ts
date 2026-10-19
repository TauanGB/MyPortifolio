import portrait from '../assets/tauan-gomes.jpeg';

// Public professional details retained from the existing portfolio.
// Never put credentials, production records or private customer media here.
export const profile = {
  name: 'Tauan Gomes',
  role: 'Desenvolvedor Full Stack',
  location: 'Feira de Santana, Bahia',
  whatsapp: 'https://wa.me/5577999786153',
  linkedin: 'https://www.linkedin.com/in/tauan-gomes-941866256/',
  github: 'https://github.com/TauanGB',
  instagram: 'https://www.instagram.com/tgb_inova/',
  portrait,
} as const;

export const fidelity = {
  name: 'Fidelity',
  productionUrl: 'https://pet-life.up.railway.app/',
  technologies: ['Python', 'Django', 'Django Templates', 'CSS'],
  features: [
    { title: 'Clientes e histórico', description: 'Cadastros individuais com compras associadas a cada cliente e campanha.' },
    { title: 'Campanhas flexíveis', description: 'Metas por quantidade de compras ou por ciclos mensais consecutivos.' },
    { title: 'Progresso e resgates', description: 'Consulta do progresso, verificação da meta e registro da recompensa resgatada.' },
  ],
} as const;

export const portfolioProject = {
  name: 'Portfólio profissional',
  sourceUrl: 'https://github.com/TauanGB/MyPortifolio',
  technologies: ['React', 'TypeScript', 'Vite', 'Radix UI'],
} as const;

export const approach = [
  { title: 'Entender a regra antes da tela.', description: 'No Fidelity, compras avulsas e ciclos mensais têm critérios diferentes. O progresso traduz essas regras em uma informação clara para quem usa.', evidence: 'Na prática: regras de campanha e elegibilidade.' },
  { title: 'Dar um lugar a cada responsabilidade.', description: 'Cadastros, campanhas e cálculo de progresso têm responsabilidades separadas. Aqui no portfólio, conteúdo, interface e medição também ficam organizados.', evidence: 'Na prática: módulos e serviços com funções definidas.' },
  { title: 'Conectar interface e operação.', description: 'A equipe registra as compras; o cliente acompanha o progresso. Duas perspectivas para a mesma jornada, com ações e informações próprias para cada uma.', evidence: 'Na prática: gestão interna e consulta do cliente.' },
  { title: 'Validar o que precisa funcionar.', description: 'Meta de compras, liberação do resgate e início de um novo ciclo são cenários explícitos. Neste portfólio, a simulação usa dados fictícios e a medição depende de consentimento.', evidence: 'Na prática: cenários verificáveis e privacidade.' },
] as const;
