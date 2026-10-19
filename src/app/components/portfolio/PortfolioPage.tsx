import { useReducer, useRef } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Code2, Gift, LayoutDashboard, MapPin, Plus, RotateCcw, Users } from 'lucide-react';
import { approach, fidelity, portfolioProject, profile } from '../../../content/portfolio';
import { trackEvent } from '../../../services/analytics';
import { AnalyticsPreferences } from '../AnalyticsPreferences';
import { DEMO_GOAL, fidelityDemoReducer, initialDemoState } from './fidelityDemo';
import '../../../styles/portfolio.css';

function Brand() {
  return <span className="pf-brand"><span className="pf-brand-mark" aria-hidden="true">t.</span>tauan<span className="pf-blue">.</span></span>;
}

function DashboardPreview() {
  return <div className="pf-dashboard" aria-hidden="true">
    <div className="pf-window-bar"><span className="pf-window-dots"><i/><i/><i/></span><span>fidelity / painel da equipe</span><span className="pf-demo-label">DEMO</span></div>
    <div className="pf-dashboard-layout">
      <div className="pf-mini-sidebar"><strong>f.</strong><LayoutDashboard size={18}/><Users size={18}/><Gift size={18}/></div>
      <div className="pf-dashboard-body">
        <div className="pf-dashboard-title"><div><small>PAINEL DE FIDELIDADE</small><h3>Relacionamentos em dia.</h3></div><span className="pf-avatar">FD</span></div>
        <div className="pf-mini-metrics"><div><span>Clientes</span><strong>03</strong></div><div><span>Compras</span><strong>08</strong></div><div><span>Resgates</span><strong>00</strong></div></div>
        <div className="pf-mini-table"><div className="pf-table-head"><span>Clientes fictícios</span><span>Progresso</span></div>{[['AM', 'Ana Martins', '3 / 5'], ['LC', 'Lucas Costa', '1 / 5'], ['BS', 'Beatriz Souza', '4 / 5']].map(([initials, name, progress], index) => <div key={name}><span><i className={`pf-person pf-person-${index}`}>{initials}</i>{name}</span><b>{progress}</b></div>)}</div>
      </div>
    </div>
  </div>;
}

function StampRow({ count = 3 }: { count?: number }) {
  return <div className="pf-stamps" aria-hidden="true">{Array.from({ length: DEMO_GOAL }, (_, index) => <span className={index < count ? 'is-filled' : ''} key={index}>{index < count ? <Check size={19}/> : index + 1}</span>)}</div>;
}

function HeroVisual() {
  return <figure className="pf-hero-visual" aria-label="Prévia recriada do Fidelity com dados fictícios: três clientes e oito compras. Ana tem três de cinco compras para sua recompensa.">
    <div className="pf-visual-grid"/>
    <div className="pf-visual-kicker"><span className="pf-small-square"/> DO CÓDIGO AO PRODUTO</div>
    <DashboardPreview/>
    <div className="pf-floating-card" aria-hidden="true"><div className="pf-card-brand"><strong>f.</strong><span>FIDELITY<small>SEU CARTÃO DE FIDELIDADE</small></span><Gift size={21}/></div><p>Olá, Ana.</p><h3>Voltar tem<br/>seu valor.</h3><StampRow/><p>Faltam 2 compras para sua recompensa.</p></div>
    <figcaption><span className="pf-small-square"/> Interface recriada · Dados fictícios</figcaption>
  </figure>;
}

function PortfolioPreview() {
  return <div className="pf-site-preview" aria-hidden="true"><div className="pf-browser-line"><span className="pf-window-dots"><i/><i/><i/></span><span>tauan / portfólio profissional</span></div><div className="pf-site-nav"><b>tauan<span>.</span></b><span>Projetos &nbsp; Abordagem &nbsp; Contato</span></div><div className="pf-site-hero"><div><small>DESENVOLVIMENTO DE SOFTWARE</small><strong>Seu negócio tem<br/>um desafio.<br/><em>Eu construo<br/>a solução.</em></strong><span className="pf-mini-button">Explore os projetos <ArrowDown size={10}/></span></div><div className="pf-site-code"><Code2 size={30}/><span>ideia</span><i/><span>código</span><i/><b>produto.</b></div></div></div>;
}

function FidelityDemo() {
  const [state, dispatch] = useReducer(fidelityDemoReducer, initialDemoState);
  const purchaseRef = useRef<HTMLButtonElement>(null);
  const ready = state.purchases >= DEMO_GOAL;
  const progress = Math.min(state.purchases, DEMO_GOAL);
  return <div className="pf-live-demo">
    <div className="pf-live-demo-heading"><span className="pf-demo-label">SIMULAÇÃO LOCAL</span><button type="button" className="pf-reset" onClick={() => dispatch('reset')}><RotateCcw size={13}/> Reiniciar</button></div>
    <div className="pf-reward-card"><div className="pf-card-brand"><strong>f.</strong><span>FIDELITY<small>SEU CARTÃO DE FIDELIDADE</small></span><Gift size={25}/></div><div className="pf-reward-greeting"><p>Olá, Ana.</p><span className={ready ? 'pf-state is-ready' : 'pf-state'}>{ready ? 'Meta atingida' : 'Em progresso'}</span></div><h3>Cada volta,<br/>mais perto.</h3><StampRow count={progress}/><div className="pf-progress" role="progressbar" aria-label="Compras para a recompensa fictícia" aria-valuemin={0} aria-valuemax={DEMO_GOAL} aria-valuenow={progress} aria-valuetext={`${state.purchases} de ${DEMO_GOAL} compras${ready ? '. Recompensa disponível.' : '.'}`}><span style={{ width: `${progress / DEMO_GOAL * 100}%` }}/></div><p className="pf-reward-progress">{ready ? 'Sua recompensa está disponível.' : `${state.purchases} de 5 compras neste ciclo.`}</p><div className="pf-reward-detail"><Gift size={22}/><div><small>RECOMPENSA DEMONSTRATIVA</small><strong>Um presente surpresa</strong></div></div><div className="pf-reward-footer"><span>Ciclo {state.redemptions + 1}</span><span>{state.redemptions} {state.redemptions === 1 ? 'resgate' : 'resgates'}</span></div></div>
    <div className="pf-demo-actions"><button type="button" className="pf-button" ref={purchaseRef} onClick={() => dispatch('purchase')}>Registrar compra <Plus size={17}/></button><button type="button" className="pf-button pf-button-outline" disabled={!ready} onClick={() => { dispatch('redeem'); purchaseRef.current?.focus(); }}>Resgatar <Gift size={17}/></button></div>
    <p className="pf-demo-feedback" role="status" aria-live="polite" aria-atomic="true">{state.message}</p>
    <p className="pf-demo-note">Ana e todas as compras são fictícias. Simulação da meta de 5 compras, sem conexão com o sistema real. Recarregar reinicia tudo.</p>
  </div>;
}

export function PortfolioPage() {
  return <div className="portfolio">
    <a className="pf-skip" href="#conteudo">Pular para o conteúdo</a>
    <header className="pf-header pf-container">
      <a href="#inicio" aria-label={`${profile.name}, início`}><Brand/></a>
      <nav aria-label="Navegação principal"><a href="#projetos">Projetos</a><a href="#abordagem">Abordagem</a><a href="#sobre">Sobre mim</a></nav>
      <a className="pf-button pf-button-outline pf-header-contact" href="#contato">Vamos conversar <ArrowUpRight size={16}/></a>
    </header>
    <main id="conteudo" tabIndex={-1}>
      <section className="pf-hero pf-container" id="inicio" aria-labelledby="hero-title">
        <div className="pf-hero-copy"><p className="pf-eyebrow"><span className="pf-small-square"/> DESENVOLVIMENTO DE SOFTWARE</p><h1 id="hero-title">Seu negócio tem<br/>um desafio.<br/><em>Eu construo<br className="pf-mobile-break"/> a solução.</em></h1><p className="pf-lead">Sou {profile.name}, desenvolvedor Full Stack. Transformo regras de negócio em sistemas web com interfaces claras e atenção ao que precisa funcionar.</p><div className="pf-actions"><a className="pf-button" href="#projetos">Explore os projetos <ArrowDown size={17}/></a><a className="pf-text-link" href="#contato">Fale sobre sua ideia <ArrowUpRight size={16}/></a></div><p className="pf-hero-note"><span className="pf-note-line"/> Da necessidade de negócio à aplicação.</p></div>
        <HeroVisual/>
      </section>
      <div className="pf-tech-strip"><div className="pf-container"><span>FERRAMENTAS A SERVIÇO DA SOLUÇÃO</span><b>Python</b><b>Django</b><b>React</b><b>TypeScript</b><b>Vite</b></div></div>

      <section id="projetos" className="pf-section pf-container" aria-labelledby="projects-title">
        <div className="pf-section-heading"><div><p className="pf-eyebrow">01 / PROJETOS SELECIONADOS</p><h2 id="projects-title">Trabalho que você<br/>pode explorar.</h2></div><p className="pf-muted">Da operação de uma empresa à apresentação de um profissional. Cada projeto parte de uma necessidade concreta.</p></div>
        <div className="pf-project-grid">
          <article className="pf-project"><div className="pf-project-art pf-fidelity-art" aria-hidden="true"><div className="pf-project-art-top"><span>01 / SISTEMA WEB</span><span>FIDELIZAÇÃO</span></div><div className="pf-fidelity-wordmark">fidelity<span>.</span><small>Relacionamentos que continuam.</small></div><div className="pf-art-stamps"><StampRow/><span>3 de 5 compras · Exemplo fictício</span></div><ArrowUpRight className="pf-art-arrow" size={35}/></div><div className="pf-project-body"><div className="pf-project-title"><h3>Fidelity</h3><span className="pf-status">Em produção</span></div><p className="pf-project-intro">Da primeira compra à próxima recompensa.</p><dl className="pf-project-facts"><div><dt>O desafio</dt><dd>Organizar compras, metas de campanhas e recompensas em um só fluxo.</dd></div><div><dt>A solução</dt><dd>Um sistema de fidelização com gestão da equipe e acompanhamento pelo cliente.</dd></div><div><dt>Minha contribuição</dt><dd>Desenvolvimento do sistema, das regras de campanha às interfaces.</dd></div></dl><ul className="pf-tags" aria-label="Tecnologias do Fidelity">{fidelity.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul><a className="pf-project-link" href="#fidelity" onClick={() => trackEvent('view_product', { product_id: 'petlife' })}>Explore o case <ArrowRight size={18}/></a></div></article>
          <article className="pf-project"><div className="pf-project-art pf-portfolio-art"><PortfolioPreview/></div><div className="pf-project-body"><div className="pf-project-title"><h3>{portfolioProject.name}</h3><span className="pf-status pf-status-neutral">Você está aqui</span></div><p className="pf-project-intro">Uma interface para aproximar trabalho e oportunidade.</p><dl className="pf-project-facts"><div><dt>O desafio</dt><dd>Apresentar projetos e facilitar o contato sem exigir uma escolha antes de navegar.</dd></div><div><dt>A solução</dt><dd>Uma página responsiva com cases, prévias e canais de contato diretos.</dd></div><div><dt>Minha contribuição</dt><dd>Implementação da interface e organização do conteúdo em React e TypeScript.</dd></div></dl><ul className="pf-tags" aria-label="Tecnologias do portfólio">{portfolioProject.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul><a className="pf-project-link" href={portfolioProject.sourceUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('view_technical', { placement: 'portfolio_source' })}>Veja o código no GitHub <ArrowUpRight size={18}/></a></div></article>
        </div>
      </section>

      <section id="fidelity" className="pf-feature-section" aria-labelledby="fidelity-title"><div className="pf-container pf-feature-layout">
        <div className="pf-feature-copy"><p className="pf-eyebrow"><span className="pf-small-square"/> 02 / CASE EM DESTAQUE</p><h2 id="fidelity-title">A regra é do negócio.<br/>A clareza é<br/><em>do produto.</em></h2><p className="pf-feature-intro">No Fidelity, cada compra faz parte de uma jornada. A equipe registra, o sistema calcula e o cliente acompanha a próxima recompensa.</p><div className="pf-feature-list">{fidelity.features.map((feature, index) => <article key={feature.title}><span>0{index + 1}</span><div><h3>{feature.title}</h3><p>{feature.description}</p></div></article>)}</div><a className="pf-button pf-production-link" href={fidelity.productionUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('click_product_demo', { product_id: 'petlife' })}>Ver projeto em produção <ArrowUpRight size={18}/></a><p className="pf-external-note">Abre o produto em uma nova aba.</p></div>
        <div className="pf-feature-demo"><div className="pf-demo-intro"><span>EXPERIMENTE O FLUXO</span><p>Uma compra. Um progresso visível.</p></div><FidelityDemo/></div>
        <p className="pf-case-footnote">No produto, campanhas mensais também consideram a sequência de meses e o fechamento do último mês. A prévia ao lado representa apenas a regra por quantidade de compras.</p>
      </div></section>

      <section id="abordagem" className="pf-section pf-container" aria-labelledby="approach-title"><div className="pf-section-heading"><div><p className="pf-eyebrow">03 / COMO EU DESENVOLVO</p><h2 id="approach-title">Boas decisões antes.<br/>Clareza em cada etapa.</h2></div><p className="pf-muted">A qualidade da interface começa nas escolhas por trás dela. Veja como isso aparece nestes projetos.</p></div><div className="pf-approach-grid">{approach.map((item, index) => <article key={item.title}><span className="pf-step-number">0{index + 1}<span>/</span></span><h3>{item.title}</h3><p>{item.description}</p><small>{item.evidence}</small></article>)}</div></section>

      <section id="sobre" className="pf-about-section" aria-labelledby="about-title"><div className="pf-container pf-about"><figure className="pf-portrait"><img src={profile.portrait} alt={`Retrato de ${profile.name}`} width="900" height="1600" loading="lazy"/><figcaption><Code2 size={16}/><span>Código com propósito.</span></figcaption></figure><div className="pf-about-copy"><p className="pf-eyebrow">04 / QUEM CONSTRÓI</p><h2 id="about-title">Prazer,<br/>{profile.name}<span className="pf-blue">.</span></h2><p className="pf-about-intro">Meu trabalho é conectar o que um negócio precisa ao que o software pode fazer.</p><p className="pf-muted">Desenvolvo sistemas web, do tratamento das regras à experiência de uso. O Fidelity é uma amostra desse trabalho: cadastros, compras e campanhas conectados em uma aplicação funcional.</p><p className="pf-location"><MapPin size={16}/>{profile.location}</p><a className="pf-text-link" href={profile.github} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('view_technical', { placement: 'about_github' })}>Mais código no GitHub <ArrowUpRight size={17}/></a></div></div></section>

      <section id="contato" className="pf-contact pf-container" aria-labelledby="contact-title"><div><p className="pf-eyebrow">DA CONVERSA AO PRÓXIMO PROJETO</p><h2 id="contact-title">O que vamos<br/><em>construir juntos?</em></h2><p className="pf-muted">Conte o desafio da sua operação ou a ideia que quer tirar do papel. Vamos conversar sobre o próximo passo.</p><div className="pf-actions"><a className="pf-button" href={profile.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('click_contact', { channel: 'whatsapp', placement: 'contact' })}>Conversar no WhatsApp <ArrowUpRight size={18}/></a><a className="pf-text-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('click_contact', { channel: 'linkedin', placement: 'contact' })}>Conectar no LinkedIn <ArrowUpRight size={17}/></a></div></div><span className="pf-closing-mark" aria-hidden="true">t.</span></section>
    </main>
    <footer className="pf-container pf-footer"><a href="#inicio" aria-label="Voltar ao início"><Brand/></a><p>© {new Date().getFullYear()} {profile.name} · Desenvolvimento de software</p><AnalyticsPreferences/><a className="pf-back-top" href="#inicio">Voltar ao início <ArrowUpRight size={15}/></a></footer>
  </div>;
}

export default PortfolioPage;
