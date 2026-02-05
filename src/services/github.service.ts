import type {
  GitHubUser,
  GitHubRepo,
  GitHubRepoLanguages,
  DeveloperData,
  StatItem,
  ProjectItem,
  SkillsData,
  GitHubDataPayload,
} from "@/types/github.types";

const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_USERNAME = "TauanGB";

const FRONTEND_LANGS = new Set([
  "JavaScript", "TypeScript", "HTML", "CSS", "SCSS", "Sass", "Vue", "React",
  "Next.js", "Tailwind", "Svelte", "Elm", "Reason", "Dart", "Flutter",
]);
const BACKEND_LANGS = new Set([
  "Python", "Node", "Java", "Kotlin", "Go", "Rust", "C", "C++", "C#",
  "Ruby", "PHP", "Swift", "Django", "FastAPI", "Flask", "Express",
  "PostgreSQL", "MongoDB", "Redis", "SQL", "GraphQL",
]);
const DEVOPS_LANGS = new Set([
  "Docker", "Shell", "Makefile", "YAML", "HCL", "Terraform", "Nginx",
  "CI", "GitHub Actions", "Kubernetes",
]);

async function fetchFromGitHub<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (!res.ok) {
    const err: { message?: string; documentation_url?: string } = await res.json().catch(() => ({}));
    throw new Error(err.message || `GitHub API error: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchUserProfile(username: string = GITHUB_USERNAME): Promise<GitHubUser> {
  return fetchFromGitHub<GitHubUser>(`${GITHUB_API_BASE}/users/${username}`);
}

export async function fetchUserRepos(username: string = GITHUB_USERNAME): Promise<GitHubRepo[]> {
  return fetchFromGitHub<GitHubRepo[]>(
    `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100&type=owner`
  );
}

export async function fetchRepoLanguages(
  owner: string,
  repo: string
): Promise<GitHubRepoLanguages> {
  return fetchFromGitHub<GitHubRepoLanguages>(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`
  );
}

function yearsSince(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const years = Math.floor((now.getTime() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  return years <= 0 ? "1" : `${years}+`;
}

function totalStars(repos: GitHubRepo[]): number {
  return repos.reduce((acc, r) => acc + r.stargazers_count, 0);
}

function aggregateLanguages(reposWithLangs: Map<number, string[]>): string[] {
  const count: Record<string, number> = {};
  for (const langs of reposWithLangs.values()) {
    for (const lang of langs) {
      count[lang] = (count[lang] || 0) + 1;
    }
  }
  return Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);
}

function categorizeSkills(languages: string[]): SkillsData {
  const frontend: string[] = [];
  const backend: string[] = [];
  const devops: string[] = [];
  const tools: string[] = ["Git"];

  const seen = new Set<string>();
  for (const lang of languages) {
    if (seen.has(lang)) continue;
    seen.add(lang);
    const normalized = lang.replace(/\s+/g, "");
    if (FRONTEND_LANGS.has(lang) || /^(js|ts|html|css|vue|react|svelte|tailwind)/i.test(normalized)) {
      frontend.push(lang);
    } else if (BACKEND_LANGS.has(lang) || /^(python|node|django|fastapi|postgres|mongo|redis)/i.test(normalized)) {
      backend.push(lang);
    } else if (DEVOPS_LANGS.has(lang) || /^(docker|shell|yaml|terraform|nginx|kubernetes)/i.test(normalized)) {
      devops.push(lang);
    } else {
      tools.push(lang);
    }
  }

  return {
    frontend: frontend.length ? frontend : ["—"],
    backend: backend.length ? backend : ["—"],
    devops: devops.length ? devops : ["—"],
    tools: [...new Set(tools)],
  };
}

function transformToDeveloperData(user: GitHubUser): DeveloperData {
  const titleFromBio = user.bio?.split("|")[0]?.trim() || user.bio?.split("\n")[0]?.trim();
  const linkedin = user.blog?.includes("linkedin") ? user.blog : "";
  const website = user.blog && !user.blog.includes("linkedin") ? user.blog : user.html_url;

  return {
    name: user.name || user.login,
    title: titleFromBio || "Developer",
    bio: user.bio || "Perfil no GitHub.",
    email: user.email || "",
    whatsapp: "",
    instagram: "",
    github: user.html_url,
    linkedin,
    website,
    avatarUrl: user.avatar_url,
  };
}

function buildStats(
  user: GitHubUser,
  repos: GitHubRepo[],
  allLanguages: string[]
): StatItem[] {
  const stars = totalStars(repos);
  return [
    { label: "Anos no GitHub", value: yearsSince(user.created_at), icon: "Code2" },
    { label: "Repositórios", value: String(user.public_repos), icon: "Cpu" },
    { label: "Total de Stars", value: String(stars), icon: "GitBranch" },
    { label: "Tecnologias", value: String(allLanguages.length), icon: "Terminal" },
  ];
}

function transformToProjectFormat(
  repos: GitHubRepo[],
  repoLanguages: Map<number, string[]>
): ProjectItem[] {
  const sorted = [...repos]
    .filter((r) => !r.name.startsWith(".") && r.description !== null)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 6);

  return sorted.map((repo, index) => {
    const langs = repoLanguages.get(repo.id) || (repo.language ? [repo.language] : []);
    const architecture = repo.topics?.length
      ? repo.topics.slice(0, 3).join(", ")
      : "Repositório no GitHub";
    const performance = `${repo.stargazers_count} stars · ${repo.forks_count} forks`;
    const features = [
      repo.language ? `Linguagem principal: ${repo.language}` : "",
      repo.updated_at ? `Atualizado em ${new Date(repo.updated_at).toLocaleDateString("pt-BR")}` : "",
      repo.description || "Projeto no GitHub",
    ].filter(Boolean);

    return {
      id: repo.id,
      name: repo.name.replace(/-/g, " ").replace(/_/g, " "),
      description: repo.description || "Sem descrição.",
      techStack: langs.length ? langs : ["—"],
      architecture,
      performance,
      repository: repo.html_url,
      features: features.length ? features : ["Ver repositório no GitHub."],
    };
  });
}

export async function fetchAllGitHubData(
  username: string = GITHUB_USERNAME
): Promise<GitHubDataPayload> {
  const [user, repos] = await Promise.all([
    fetchUserProfile(username),
    fetchUserRepos(username),
  ]);

  const topRepos = [...repos]
    .filter((r) => !r.name.startsWith("."))
    .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 10);

  const langResults = await Promise.all(
    topRepos.map((r) =>
      fetchRepoLanguages(username, r.name).then((langs) => ({ repoId: r.id, langs: Object.keys(langs) }))
    )
  );

  const repoLanguages = new Map<number, string[]>();
  for (const { repoId, langs } of langResults) {
    repoLanguages.set(repoId, langs);
  }
  for (const r of repos) {
    if (r.language && !repoLanguages.has(r.id)) {
      repoLanguages.set(r.id, [r.language]);
    }
  }

  const allLangSet = new Set<string>();
  for (const langs of repoLanguages.values()) langs.forEach((l) => allLangSet.add(l));
  for (const r of repos) if (r.language) allLangSet.add(r.language);
  const allLanguages = Array.from(allLangSet);
  const skills = categorizeSkills(allLanguages);
  const developerData = transformToDeveloperData(user);
  const stats = buildStats(user, repos, allLanguages);
  const projects = transformToProjectFormat(repos, repoLanguages);

  return {
    developerData,
    stats,
    projects,
    skills,
  };
}
