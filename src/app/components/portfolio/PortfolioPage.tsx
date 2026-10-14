import { ArrowDown, ArrowUpRight, Code2, MapPin } from 'lucide-react';
import { profile, products, services } from '../../../content/portfolio';
import { trackEvent } from '../../../services/analytics';
import { AnalyticsPreferences } from '../AnalyticsPreferences';
import '../../../styles/portfolio.css';

const skills = ['Python / Django', 'React / TypeScript', 'Flutter', 'APIs & integrações', 'n8n & automações', 'Webhooks'];

export function PortfolioPage() {
  const contact = (channel: 'whatsapp' | 'linkedin' | 'instagram', placement: string) => trackEvent('click_contact', { channel, placement });
  return (
    <div className="portfolio">
      <a className="pf-skip" href="#conteudo">Pular para o conteúdo</a>
      <header className="pf-header pf-container">
        <a href="#inicio" className="pf-brand" aria-label={`${profile.name}, início`}>tauan<span>.</span></a>
        <nav aria-label="Navegação principal">
          <a href="#produtos">Produtos</a><a href="#servicos">Serviços</a><a href="#sobre">Sobre</a>
          <a href="#tecnico" onClick={() => trackEvent('view_technical', { placement: 'header' })}>Visão técnica</a>
        </nav>
        <a className="pf-header-contact" href="#contato">Vamos conversar <ArrowUpRight size={16}/></a>
      </header>
      <main id="conteudo">
        <section className="pf-hero pf-container" id="inicio" aria-labelledby="hero-title">
          <div className="pf-hero-copy">
            <p className="pf-eyebrow"><span className="pf-dot"/> {profile.role}</p>
            <h1 id="hero-title">Ideias que viram<br/><span>produtos digitais.</span></h1>
            <p className="pf-lead">Desenvolvo produtos digitais que simplificam operações.</p>
            <p className="pf-muted pf-hero-description">{profile.description}</p>
            <div className="pf-actions"><a className="pf-button" href="#produtos">Conhecer meus produtos <ArrowDown size={17}/></a><a className="pf-text-link" href="#contato">Conversar sobre um projeto <ArrowUpRight size={17}/></a></div>
            <p className="pf-location"><MapPin size={15}/>{profile.location}</p>
          </div>
          <figure className="pf-portrait">
            <img src={profile.portrait} alt="Tauan Gomes" width="900" height="1600" fetchPriority="high"/>
            <figcaption><span>{profile.name}</span><span>Desenvolvedor de produtos digitais</span></figcaption>
          </figure>
        </section>
        <div className="pf-capabilities" aria-label="Áreas de atuação"><div className="pf-container"><span>Sistemas web</span><span>Aplicativos</span><span>Automações</span><span>Integrações</span></div></div>
        <section id="produtos" className="pf-section pf-container" aria-labelledby="products-title">
          <div className="pf-section-heading"><div><p className="pf-eyebrow">01 / Produtos</p><h2 id="products-title">Da ideia à<br/>comercialização.</h2></div><p className="pf-muted">Produtos digitais que fazem parte da minha trajetória. Conheça o trabalho e converse comigo sobre uma apresentação.</p></div>
          <div className="pf-product-grid">{products.map((product, index) => <article key={product.id} className={`pf-product pf-product-${index}`}>
            <div className="pf-product-art" aria-hidden="true"><span className="pf-product-number">0{index + 1}</span><div className="pf-product-wordmark">{product.name}<span>produto digital / {product.id === 'petlife' ? 'petlife' : 'eg3'}</span></div><ArrowUpRight className="pf-art-arrow" size={45}/></div>
            <div className="pf-product-body"><p className="pf-eyebrow">{product.label} <span className="pf-status">{product.status}</span></p><h3>{product.name}</h3><p className="pf-muted">{product.description}</p>
              <details onToggle={(event) => { if (event.currentTarget.open) trackEvent('view_product', { product_id: product.id }); }}><summary>Conhecer o produto <span aria-hidden="true">+</span></summary><div className="pf-product-detail"><p>Para conhecer o contexto, os recursos e o trabalho de desenvolvimento do {product.name}, solicite uma apresentação diretamente comigo.</p><a href="#contato" className="pf-text-link">Solicitar apresentação <ArrowUpRight size={16}/></a></div></details>
            </div>
          </article>)}</div>
        </section>
        <section id="servicos" className="pf-section pf-services" aria-labelledby="services-title"><div className="pf-container"><div className="pf-section-heading"><div><p className="pf-eyebrow">02 / Como posso ajudar</p><h2 id="services-title">Tecnologia a serviço<br/>do seu negócio.</h2></div><p className="pf-muted">Do primeiro escopo à evolução do produto, foco no que precisa funcionar no dia a dia.</p></div><div className="pf-service-list">{services.map((service, index) => <article key={service.title}><span className="pf-service-number">0{index+1}</span><h3>{service.title}</h3><p className="pf-muted">{service.description}</p><ArrowUpRight aria-hidden="true" size={23}/></article>)}</div></div></section>
        <section id="sobre" className="pf-section pf-container pf-about" aria-labelledby="about-title"><div><p className="pf-eyebrow">03 / Sobre mim</p><h2 id="about-title">Prazer,<br/>Tauan Gomes<span className="pf-blue">.</span></h2></div><div><p className="pf-about-intro">Construo sistemas, aplicativos e integrações que conectam tecnologia às necessidades de cada projeto.</p><p className="pf-muted">Meu trabalho reúne desenvolvimento Full Stack, automação de processos e integração entre plataformas. O ponto de partida é entender a operação, definir um escopo claro e construir uma solução que possa evoluir.</p><p className="pf-location"><MapPin size={15}/>{profile.location}</p><a href="#contato" className="pf-text-link">Vamos falar sobre sua ideia <ArrowUpRight size={17}/></a></div></section>
        <section id="tecnico" className="pf-section pf-container pf-technical" aria-labelledby="technical-title"><div><p className="pf-eyebrow">04 / Por trás dos produtos</p><h2 id="technical-title"><Code2 size={28} aria-hidden="true"/> Visão técnica</h2><p className="pf-muted">Ferramentas que fazem parte do meu trabalho. A escolha de cada tecnologia depende do problema e do contexto do projeto.</p></div><div><ul className="pf-skills">{skills.map(skill => <li key={skill}>{skill}</li>)}</ul>{profile.github && <a href={profile.github} target="_blank" rel="noopener noreferrer" className="pf-text-link" onClick={() => trackEvent('view_technical', { placement: 'github' })}>Explorar meu GitHub <ArrowUpRight size={17}/></a>}</div></section>
        <section id="contato" className="pf-contact" aria-labelledby="contact-title"><div className="pf-container"><p className="pf-eyebrow">Tem um projeto em mente?</p><h2 id="contact-title">Vamos construir<br/>o próximo passo<span>.</span></h2><p>Conte o que sua operação precisa. Vamos conversar sobre uma solução.</p><div className="pf-actions">{profile.whatsapp && <a className="pf-button" href={profile.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => contact('whatsapp', 'contact')}>Conversar no WhatsApp <ArrowUpRight size={18}/></a>}{profile.linkedin && <a className="pf-text-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => contact('linkedin', 'contact')}>LinkedIn <ArrowUpRight size={17}/></a>}{profile.instagram && <a className="pf-text-link" href={profile.instagram} target="_blank" rel="noopener noreferrer" onClick={() => contact('instagram', 'contact')}>Instagram <ArrowUpRight size={17}/></a>}</div></div></section>
      </main>
      <footer className="pf-container pf-footer"><a className="pf-brand" href="#inicio">tauan<span>.</span></a><p>© {new Date().getFullYear()} {profile.name}</p><div className="pf-footer-links"><a href="#privacidade">Privacidade</a><AnalyticsPreferences/></div></footer>
      <section id="privacidade" className="pf-container pf-privacy" aria-labelledby="privacy-title"><h2 id="privacy-title">Sua escolha de medição</h2><p>Com sua autorização, o Google Analytics pode medir acessos e interações nesta página. Os eventos de interação não incluem nomes, emails, telefones ou mensagens. Você pode recusar ou alterar sua preferência nos controles de medição.</p></section>
    </div>
  );
}

export default PortfolioPage;
