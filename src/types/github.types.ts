/**
 * Tipos para dados da API do GitHub e formato usado pelo portfólio.
 */

/** Resposta da API: perfil do usuário */
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

/** Resposta da API: repositório */
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  languages_url: string;
  updated_at: string;
  created_at: string;
  pushed_at: string | null;
  topics?: string[];
  default_branch: string;
}

/** Resposta da API: linguagens de um repositório (objeto chave=linguagem, valor=bytes) */
export type GitHubRepoLanguages = Record<string, number>;

/** Estatística exibida no portfólio (com ícone referenciado pelo nome) */
export interface StatItem {
  label: string;
  value: string;
  icon: string;
}

/** Projeto no formato do portfólio */
export interface ProjectItem {
  id: number;
  name: string;
  description: string;
  techStack: string[];
  architecture: string;
  performance: string;
  repository: string;
  features: string[];
}

/** Skills agrupadas por categoria */
export interface SkillsData {
  frontend: string[];
  backend: string[];
  devops: string[];
  tools: string[];
}

/** Dados do desenvolvedor no formato consumido pelo DeveloperView */
export interface DeveloperData {
  name: string;
  title: string;
  bio: string;
  email: string;
  whatsapp: string;
  instagram: string;
  github: string;
  linkedin: string;
  website: string;
  avatarUrl?: string;
}

/** Payload completo retornado pelo hook useGitHubData */
export interface GitHubDataPayload {
  developerData: DeveloperData;
  stats: StatItem[];
  projects: ProjectItem[];
  skills: SkillsData;
}

/** Erro da API do GitHub (rate limit, etc.) */
export interface GitHubApiError {
  message: string;
  documentation_url?: string;
  status?: number;
}
