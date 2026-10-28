// Gera as páginas de cada serviço a partir da home (mesmo visual, cabeçalho, rodapé e scripts).
// Rodar depois de mudar a home ou os textos abaixo:  node scripts/gerar-paginas.js
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "prototipo");
const home = fs.readFileSync(path.join(ROOT, "camuzi-home.html"), "utf8");
const SITE = "https://xn--camuzirefrigerao-snb5e.com.br";

/* ---------- pedaços reaproveitados da home ---------- */
const between = (a, b, from = 0) => {
  const i = home.indexOf(a, from); if (i < 0) throw new Error("não encontrado: " + a);
  const j = home.indexOf(b, i + a.length); if (j < 0) throw new Error("não encontrado: " + b);
  return home.slice(i, j);
};
const css = between("<style>", "</style>").slice("<style>".length);
const sprite = between('<svg width="0"', "</svg>") + "</svg>";
const fixLinks = html => html
  .replace(/href="#topo"/g, 'href="/"')
  .replace(/href="#(problemas|servicos|por-que|trabalhos|avaliacoes|duvidas)"/g, 'href="/#$1"')
  .replace(/(src|srcset)="assets\//g, '$1="/assets/')
  .replace(/, assets\//g, ", /assets/");
const header = fixLinks(between('<header class="hdr', '<main id="conteudo">'));
const ticker = between('<div class="ticker"', "<!-- 2 ·");
const pillars = between("<!-- 4 · BRANCO — POR QUE A CAMUZI -->", "<!-- 5 ·").replace('id="por-que"', 'id="por-que-camuzi"');
const footer = fixLinks(between("<!-- AZUL — RODAPÉ -->", '<script type="application/ld+json">'));
const marqueeJs = between("/* Esteira contínua", "/* Fotos: esteira");
const beltsJs = between("/* Celular: serviços e compromissos", "/* Avaliações:");
const config = between("const CONFIG = {", "};") + "};";

/* ---------- dados comuns ---------- */
const CIDADES = ["Serra", "Vitória", "Vila Velha", "Cariacica", "Viana", "Guarapari", "Fundão"];
const FAQ_CIDADES = ["Quais cidades vocês atendem?", "Atendemos toda a Grande Vitória: Serra, Vitória, Vila Velha, Cariacica, Viana, Guarapari e Fundão."];
const FAQ_GARANTIA = ["O serviço tem garantia?", "Sim. Todo serviço sai com garantia por escrito e nota fiscal."];
const img = (name, alt, { sizes = "(min-width:980px) 520px, 92vw", cls = "", eager = false } = {}) =>
  `<img${cls ? ` class="${cls}"` : ""} src="/assets/fotos/${name}-q540.webp" srcset="/assets/fotos/${name}-q540.webp 540w, /assets/fotos/${name}-q1080.webp 1080w" sizes="${sizes}" width="1080" height="1080" alt="${alt}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'}>`;

/* ---------- as páginas ---------- */
const PAGES = [
  {
    slug: "instalacao-de-ar-condicionado", nome: "Instalação", icon: "i-install",
    title: "Instalação de Ar-Condicionado na Grande Vitória – ES | Camuzi",
    desc: "Instalação de ar-condicionado split e inverter na Serra, Vitória, Vila Velha e Cariacica. Vácuo, teste e acabamento limpo, com garantia. Orçamento grátis.",
    h1: 'Instalação de <span class="nb">ar-condicionado</span> <span class="hl grad">na Grande Vitória</span>',
    lead: "Seu aparelho novo instalado do jeito certo: no melhor ponto do ambiente, com tubulação bem-feita, vácuo e teste completo. Todas as marcas, com garantia.",
    msg: "Olá! Quero um orçamento de instalação de ar-condicionado.",
    cta: "Pedir orçamento de instalação",
    hero: ["tecnico-instalacao", "Técnico da Camuzi Refrigeração instalando um ar-condicionado split"],
    foto: ["split-gree-quarto", "Ar-condicionado split instalado pela Camuzi em um quarto na Grande Vitória"],
    card: ["split-gree-quarto", "Seu aparelho novo funcionando do jeito certo, com acabamento limpo."],
    why: { eyebrow: "Instalação bem-feita", h2: 'Instalar certo <span class="grad">evita dor de cabeça</span>',
      p: "Uma instalação malfeita causa vazamento, barulho e conta de luz alta. A nossa é pensada para durar.",
      items: [["i-gauge", "Aparelho mais econômico", "Gela bem, gastando menos energia"], ["i-drop", "Sem vazamentos nem pingos", "Tubulação, dreno e caimento corretos"], ["i-shield", "Garantia por escrito", "Com nota fiscal"]] },
    steps: { h2: 'Como é a <span class="grad">instalação</span>', items: [
      ["i-home", "Avaliação do local", "Indicamos o melhor ponto para as unidades interna e externa."],
      ["i-install", "Fixação e tubulação", "Suportes firmes, tubulação de cobre e dreno com caimento."],
      ["i-gauge", "Vácuo e conferência", "Vácuo na tubulação e checagem das conexões antes de ligar."],
      ["i-snow", "Teste e acabamento", "Testamos na sua frente e deixamos o local limpo."]] },
    faq: [
      ["Instalam aparelho comprado em outra loja?", "Sim. Instalamos todas as marcas, compradas em qualquer loja ou pela internet."],
      ["Quanto tempo leva uma instalação?", "Em média de 2 a 4 horas para um split padrão."],
      ["Quanto custa a instalação?", "Depende do modelo, da potência e do local. Mande fotos do ambiente pelo WhatsApp e enviamos o orçamento sem compromisso."],
      ["Instalam ar-condicionado inverter?", "Sim. Instalamos split convencional e inverter, de todas as marcas."],
      FAQ_GARANTIA, FAQ_CIDADES],
  },
  {
    slug: "higienizacao-de-ar-condicionado", nome: "Higienização", icon: "i-spray",
    title: "Higienização de Ar-Condicionado na Grande Vitória – ES | Camuzi",
    desc: "Higienização completa de ar-condicionado na Serra, Vitória, Vila Velha e Cariacica. Fim do cheiro de mofo, ar mais saudável e conta de luz menor. Orçamento grátis.",
    h1: 'Higienização de <span class="nb">ar-condicionado</span> <span class="hl grad">na Grande Vitória</span>',
    lead: "Limpeza completa por dentro do aparelho, com produto específico: acaba com o cheiro de mofo, deixa o ar mais saudável e faz o ar gelar melhor.",
    msg: "Olá! Quero agendar uma higienização do meu ar-condicionado.",
    cta: "Agendar higienização",
    hero: ["tecnico-higienizacao", "Técnico da Camuzi Refrigeração higienizando um ar-condicionado split"],
    foto: ["split-hisense-quarto", "Ar-condicionado split higienizado pela Camuzi na Grande Vitória"],
    card: ["tecnico-higienizacao", "Ar limpo, sem mau cheiro e o aparelho gelando melhor."],
    why: { eyebrow: "Por que higienizar", h2: 'Por fora parece limpo. <span class="grad">Por dentro, não.</span>',
      p: "Fungos e poeira se acumulam no aparelho e vão para o ar que sua família respira.",
      items: [["i-lungs", "Menos alergias e rinite", "Ar mais saudável em casa"], ["i-bolt", "Conta de luz menor", "O aparelho gela com menos esforço"], ["i-wind", "Fim do cheiro de mofo", "Eliminamos a causa, não só o odor"]] },
    steps: { h2: 'Como é a <span class="grad">higienização</span>', items: [
      ["i-home", "Proteção do local", "Protegemos a parede e os móveis antes de começar."],
      ["i-spray", "Limpeza completa", "Filtros, serpentina, turbina e bandeja limpos com produto específico."],
      ["i-drop", "Dreno livre", "Conferimos o dreno para a água escoar sem pingar."],
      ["i-snow", "Teste final", "Ligamos e conferimos se está gelando bem e sem cheiro."]] },
    faq: [
      ["De quanto em quanto tempo devo higienizar?", "Em casa, a cada 6 a 12 meses. Em empresas ou uso intenso, a cada 3 a 6 meses."],
      ["A higienização tira o cheiro de mofo?", "Sim. O cheiro vem de fungos e bactérias dentro do aparelho. A higienização elimina a causa, não só o odor."],
      ["Quanto custa a higienização?", "Depende do modelo e da quantidade de aparelhos. Mande uma foto pelo WhatsApp e enviamos o orçamento sem compromisso."],
      ["Atendem empresas?", "Sim. Atendemos lojas, escritórios e clínicas, com manutenção programada para os aparelhos não pararem."],
      FAQ_GARANTIA, FAQ_CIDADES],
  },
  {
    slug: "manutencao-de-ar-condicionado", nome: "Manutenção", icon: "i-cal",
    title: "Manutenção de Ar-Condicionado na Grande Vitória – ES | Camuzi",
    desc: "Manutenção preventiva e corretiva de ar-condicionado na Serra, Vitória, Vila Velha e Cariacica. Para casas e empresas, com garantia. Orçamento grátis pelo WhatsApp.",
    h1: 'Manutenção de <span class="nb">ar-condicionado</span> <span class="hl grad">na Grande Vitória</span>',
    lead: "Preventiva para evitar quebras e corretiva para resolver o que já parou. Para casas, lojas, escritórios e clínicas, com garantia.",
    msg: "Olá! Quero um orçamento de manutenção do meu ar-condicionado.",
    cta: "Pedir orçamento de manutenção",
    hero: ["condensadora-lg-suporte", "Condensadora de ar-condicionado com suporte, atendida pela Camuzi Refrigeração"],
    foto: ["split-escritorio", "Ar-condicionado split em escritório com manutenção da Camuzi na Grande Vitória"],
    card: ["tecnico-instalacao", "Evite quebras inesperadas e economize energia."],
    why: { eyebrow: "Manutenção em dia", h2: 'Prevenir sai <span class="grad">mais barato</span>',
      p: "Aparelho sem manutenção gasta mais energia, gela menos e quebra justo quando você mais precisa.",
      items: [["i-bolt", "Conta de luz menor", "Aparelho limpo trabalha com menos esforço"], ["i-shield", "Menos quebras inesperadas", "Problemas encontrados ainda no começo"], ["i-clock", "Aparelho dura mais", "Peças trabalham sem sobrecarga"]] },
    steps: { h2: 'Como é a <span class="grad">manutenção</span>', biz: true, items: [
      ["i-chat", "Avaliação", "Verificamos o funcionamento e o estado do aparelho."],
      ["i-spray", "Limpeza", "Filtros, serpentina e dreno limpos."],
      ["i-gauge", "Gás e parte elétrica", "Conferimos a pressão do gás, as conexões e os componentes."],
      ["i-wrench", "Ajustes e teste", "Corrigimos o que for preciso e testamos na sua frente."]] },
    faq: [
      ["Qual a diferença entre manutenção preventiva e corretiva?", "A preventiva é feita com o aparelho funcionando, para evitar defeitos. A corretiva resolve um problema que já apareceu, como pingar água, não gelar ou fazer barulho."],
      ["De quanto em quanto tempo fazer manutenção?", "Em casa, a cada 6 a 12 meses. Em empresas ou uso intenso, a cada 3 a 6 meses."],
      ["Atendem empresas?", "Sim. Atendemos lojas, escritórios e clínicas, com manutenção programada para os aparelhos não pararem."],
      ["Quanto custa a manutenção?", "Depende do modelo e da quantidade de aparelhos. Mande uma foto pelo WhatsApp e enviamos o orçamento sem compromisso."],
      FAQ_GARANTIA, FAQ_CIDADES],
  },
  {
    slug: "conserto-de-ar-condicionado", nome: "Conserto e gás", icon: "i-wrench",
    title: "Conserto de Ar-Condicionado e Recarga de Gás na Grande Vitória | Camuzi",
    desc: "Ar-condicionado não gela, pinga ou faz barulho? Conserto e recarga de gás na Serra, Vitória, Vila Velha e Cariacica, com diagnóstico e preço combinado antes.",
    h1: 'Conserto de <span class="nb">ar-condicionado</span> <span class="hl grad">na Grande Vitória</span>',
    lead: "Não gela, pinga água, faz barulho ou desliga sozinho? Encontramos o defeito, combinamos o preço antes e resolvemos, com garantia.",
    msg: "Olá! Meu ar-condicionado está com defeito e preciso de conserto.",
    cta: "Pedir conserto agora",
    hero: ["condensadora-airstage-ligacoes", "Válvulas e ligações de gás de uma condensadora em conserto pela Camuzi Refrigeração"],
    foto: ["condensadora-hisense", "Condensadora de ar-condicionado consertada pela Camuzi na Grande Vitória"],
    card: ["condensadora-airstage-ligacoes", "Encontramos o defeito e resolvemos, com preço combinado antes."],
    why: { eyebrow: "Problemas que resolvemos", h2: 'Seu ar está <span class="grad">dando sinais?</span>',
      p: "Quanto antes chamar, mais simples e barato costuma ser o conserto.",
      items: [["i-snow", "Não está gelando", "Sujeira, falta de gás ou peça com defeito"], ["i-drop", "Pingando água", "Dreno entupido ou mangueira sem caimento"], ["i-sound", "Barulho estranho", "Peça solta, turbina suja ou suporte frouxo"], ["i-power", "Liga e desliga sozinho", "Sensor, placa ou falta de ventilação"]] },
    steps: { h2: 'Como é o <span class="grad">conserto</span>', items: [
      ["i-chat", "Conte o problema", "Mande uma foto ou vídeo pelo WhatsApp."],
      ["i-gauge", "Diagnóstico", "Encontramos a causa antes de trocar qualquer peça."],
      ["i-doc", "Preço combinado", "Você aprova o valor antes do conserto."],
      ["i-wrench", "Conserto e teste", "Resolvemos e testamos na sua frente, com garantia."]] },
    faq: [
      ["Meu ar não gela. É falta de gás?", "Nem sempre. Na maioria das vezes é sujeira ou peça com defeito. Fazemos o diagnóstico antes de qualquer recarga."],
      ["Vocês fazem recarga de gás?", "Sim. Se houver vazamento, corrigimos antes de recarregar, para o gás não acabar de novo."],
      ["O ar está pingando dentro de casa. O que fazer?", "Desligue o aparelho e chame um técnico. Na maioria das vezes é o dreno entupido ou a mangueira sem caimento, o que costuma ser simples de resolver."],
      ["Consertam todas as marcas?", "Sim. Atendemos todas as marcas, split convencional e inverter."],
      ["Quanto custa o conserto?", "Depende do defeito. Primeiro fazemos o diagnóstico e você aprova o valor antes do conserto."],
      FAQ_GARANTIA, FAQ_CIDADES],
  },
];

/* ---------- montagem ---------- */
const esc = s => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const plain = s => s.replace(/<[^>]+>/g, "");
const ico = id => `<svg class="ico"><use href="#${id}"/></svg>`;
const wa = (tag, msg, label, extra = "") => `<a class="btn btn--wa${extra}" data-wa="${tag}" data-msg="${esc(msg)}" href="#"><svg><use href="#i-wa"/></svg>${label}</a>`;

const PAGE_CSS = `
/* páginas de serviço */
.crumbs{display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin:0 0 18px; padding:0; list-style:none; font-size:.86rem; color:var(--muted)}
.crumbs a{color:inherit; text-decoration:none} .crumbs a:hover{color:var(--ink)}
.crumbs li + li::before{content:"›"; margin-right:6px; opacity:.6}
.pg-hero h1{font-size:clamp(2.1rem,4.4vw,3.7rem); margin-top:18px}
.pg-hero .scene--photo .chip--check{top:auto; left:auto; bottom:7%; right:6%}
.nb{white-space:nowrap}
.pg-photo{display:block; width:100%; height:auto; aspect-ratio:1; object-fit:cover; border-radius:var(--r-lg); box-shadow:var(--shadow-lg)}
.pg-why .btn{justify-self:start}
@media (min-width:1080px){ .cards--3{grid-template-columns:repeat(3,minmax(0,1fr))} }
@media (max-width:719px){ .crumbs{justify-content:center} .pg-why .btn{justify-self:center} }
`;

function render(p) {
  const url = `${SITE}/${p.slug}/`;
  const others = PAGES.filter(o => o !== p);
  const ld = [
    { "@context": "https://schema.org", "@type": "Service", name: plain(p.h1), serviceType: plain(p.h1).replace(/ na Grande Vitória$/, ""), url, description: p.desc,
      provider: { "@id": `${SITE}/#empresa`, "@type": "HVACBusiness", name: "Camuzi Refrigeração", telephone: "+55-27-98839-7281", url: `${SITE}/` },
      areaServed: CIDADES.map(c => ({ "@type": "City", name: c })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Serviços", item: `${SITE}/#servicos` },
      { "@type": "ListItem", position: 3, name: p.nome, item: url }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: p.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  ];
  const tag = p.slug.split("-")[0];

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>${p.title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="${esc(p.desc)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#0A3A9C">
<meta property="og:site_name" content="Camuzi Refrigeração">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/assets/fotos/${p.hero[0]}-q1080.webp">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="${url}">
<link rel="icon" type="image/webp" href="/assets/logo-camuzi-128.webp">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="/assets/site.css">
<style>${PAGE_CSS}</style>
${ld.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n")}
</head>
<body>
${sprite}

<a class="sr-only" href="#conteudo">Pular para o conteúdo</a>

${header}<main id="conteudo">

<!-- AZUL — topo do serviço -->
<section class="band blue hero pg-hero">
  <div class="wrap hero__grid">
    <div>
      <nav aria-label="Você está em"><ol class="crumbs"><li><a href="/">Início</a></li><li><a href="/#servicos">Serviços</a></li><li aria-current="page">${p.nome}</li></ol></nav>
      <span class="pill fade-up"><span class="pill__dot">${ico("i-pin")}</span>Grande Vitória e região – ES</span>
      <h1>${p.h1}</h1>
      <p class="hero__lead fade-up" style="--d:.2s">${p.lead}</p>
      <div class="ctas fade-up" style="--d:.3s">
        ${wa(tag + "_hero", p.msg, "Falar com um técnico agora")}
        <a class="btn btn--line" href="#outros">Ver outros serviços</a>
      </div>
      <ul class="ticks fade-up" style="--d:.4s">
        <li>${ico("i-doc")}Orçamento grátis</li>
        <li>${ico("i-bolt")}Atendimento rápido</li>
        <li>${ico("i-shield")}Garantia no serviço</li>
      </ul>
    </div>
    <div class="scene scene--photo">
      ${img(p.hero[0], p.hero[1], { cls: "scene__img", eager: true })}
      <div class="chip chip--check">
        <div class="chip__ic" aria-hidden="true">${ico("i-shield")}</div>
        <div><b>Serviço garantido</b><small>Por escrito, com nota fiscal</small></div>
      </div>
    </div>
  </div>
</section>

${ticker}
<!-- BRANCO — por que fazer -->
<section class="band pg-why" aria-labelledby="t-why">
  <div class="wrap health">
    <div>
      <div class="head rv" style="margin-bottom:0">
        <span class="eyebrow">${p.why.eyebrow}</span>
        <h2 id="t-why">${p.why.h2}</h2>
        <p>${p.why.p}</p>
      </div>
      <ul class="benefits" data-stagger>
${p.why.items.map(([i, b, s]) => `        <li class="rv"><span class="ic">${ico(i)}</span><span>${b}<small>${s}</small></span></li>`).join("\n")}
      </ul>
      ${wa(tag + "_beneficios", p.msg, p.cta, " rv")}
    </div>
    <div class="rv rv--zoom">${img(p.foto[0], p.foto[1], { cls: "pg-photo" })}</div>
  </div>
</section>

<!-- AZUL — como funciona -->
<section class="band blue alt" aria-labelledby="t-como">
  <div class="wrap">
    <div class="head head--center rv">
      <span class="eyebrow">Passo a passo</span>
      <h2 id="t-como">${p.steps.h2}</h2>
    </div>
    <ol class="steps" id="steps" data-stagger>
${p.steps.items.map(([i, h, t], k) => `      <li class="step rv"><div class="step__top"><div class="step__ic">${ico(i)}</div><span class="step__n">0${k + 1}</span></div><h3>${h}</h3><p>${t}</p></li>`).join("\n")}
    </ol>
    <div class="center-cta rv">${wa(tag + "_passos", p.msg, "Iniciar atendimento no WhatsApp")}</div>
${p.steps.biz ? `    <div class="biz rv" id="empresas">
      <span class="biz__ic">${ico("i-building")}</span>
      <div><b>Tem uma empresa, loja ou clínica?</b><span>Manutenção programada para manter os aparelhos do seu negócio sempre funcionando.</span></div>
      ${wa("empresas", "Olá! Tenho uma empresa e gostaria de um orçamento de manutenção dos aparelhos.", "Falar sobre minha empresa", " btn--sm")}
    </div>` : ""}
  </div>
</section>

${pillars}
<!-- AZUL — dúvidas -->
<section class="band blue alt" id="duvidas" aria-labelledby="t-faq">
  <div class="wrap faq">
    <div class="faq__aside rv">
      <span class="eyebrow">Dúvidas frequentes</span>
      <h2 id="t-faq">Perguntas sobre <span class="grad">${p.nome.toLowerCase()}</span></h2>
    </div>
    <div class="rv" style="--d:.1s">
${p.faq.map(([q, a], i) => `      <details class="qa" name="faq"${i === 0 ? " open" : ""}>
        <summary>${q}<span class="pm" aria-hidden="true">${ico("i-plus")}</span></summary>
        <div class="ans"><p>${a}</p></div>
      </details>`).join("\n")}
    </div>
    <div class="faq__end rv">
      <p>Não achou a sua? Um técnico responde pelo WhatsApp.</p>
      ${wa(tag + "_faq", "Olá! Tenho uma dúvida sobre ar-condicionado: ", "Tirar minha dúvida agora")}
    </div>
  </div>
</section>

<!-- BRANCO — outros serviços + chamada final -->
<section class="band" id="outros" aria-labelledby="t-outros">
  <div class="wrap">
    <div class="head head--center rv">
      <span class="eyebrow">Outros serviços</span>
      <h2 id="t-outros">Tudo para o seu <span class="grad">ar-condicionado</span></h2>
    </div>
    <div class="cards cards--3" data-stagger>
${others.map(o => `      <a class="card spot rv" href="/${o.slug}/">
        <img class="card__img" src="/assets/fotos/${o.card[0]}-h480.webp" srcset="/assets/fotos/${o.card[0]}-h480.webp 480w, /assets/fotos/${o.card[0]}-h800.webp 800w" sizes="(min-width:1080px) 360px, (min-width:640px) 45vw, 92vw" width="480" height="300" alt="${esc(plain(o.h1))}" loading="lazy">
        <div class="card__body">
          <span class="card__ic">${ico(o.icon)}</span>
          <h3>${o.nome}</h3>
          <p>${o.card[1]}</p>
          <span class="link-arrow">Ver serviço ${ico("i-arrow")}</span>
        </div>
      </a>`).join("\n")}
    </div>
    <div class="final blue rv rv--zoom" style="margin-top:clamp(48px,7vw,88px)">
      <div>
        <h2 id="t-cta">Pare de passar calor. <span class="grad">Fale com a Camuzi.</span></h2>
        <p>Mande uma foto do aparelho pelo WhatsApp e receba seu orçamento sem compromisso.</p>
      </div>
      <div class="final__act">${wa(tag + "_cta_final", p.msg, "Pedir orçamento agora")}</div>
    </div>
  </div>
</section>

</main>

${footer}
<script>
${config}
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const waLink = msg => \`https://wa.me/\${CONFIG.whatsapp}?text=\${encodeURIComponent(msg || CONFIG.mensagemPadrao)}\`;

/* WhatsApp + rastreamento (GTM / GA4 / Meta Pixel) */
document.querySelectorAll("[data-wa]").forEach(a => { a.href = waLink(a.dataset.msg); a.target = "_blank"; a.rel = "noopener"; });
document.addEventListener("click", e => {
  const a = e.target.closest("[data-wa]");
  if (!a) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event:"whatsapp_click", cta_location:a.dataset.wa, page_path:location.pathname });
  if (typeof window.gtag === "function") gtag("event", "generate_lead", { method:"whatsapp", cta_location:a.dataset.wa });
  if (typeof window.fbq === "function") fbq("track", "Contact", { cta_location:a.dataset.wa });
});
document.querySelectorAll("[data-phone]").forEach(el => el.textContent = CONFIG.telefoneExibido);
document.getElementById("yr").textContent = new Date().getFullYear();

/* Cabeçalho: azul no topo, claro ao rolar */
const hdr = document.querySelector(".hdr");
const onScroll = () => hdr.classList.toggle("blue", scrollY < 40);
addEventListener("scroll", onScroll, { passive:true }); onScroll();

/* Menu mobile */
const mnav = document.getElementById("mnav"), openB = document.getElementById("menuOpen"), closeB = document.getElementById("menuClose");
const setMenu = open => {
  mnav.classList.toggle("is-open", open);
  openB.setAttribute("aria-expanded", open);
  document.documentElement.style.overflow = open ? "hidden" : "";
  if (open) closeB.focus(); else openB.focus({ preventScroll:true });
};
openB.addEventListener("click", () => setMenu(true));
closeB.addEventListener("click", () => setMenu(false));
mnav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
addEventListener("keydown", e => { if (e.key === "Escape" && mnav.classList.contains("is-open")) setMenu(false); });

/* Revelar ao rolar */
document.querySelectorAll("[data-stagger]").forEach(p => [...p.children].forEach((c, i) => c.style.setProperty("--d", (i * 0.09) + "s")));
if ("IntersectionObserver" in window && !REDUCED) {
  document.documentElement.classList.add("rv-on");
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { rootMargin:"0px 0px -8% 0px", threshold:0.12 });
  document.querySelectorAll(".rv, #steps").forEach(el => io.observe(el));
}

/* Holofote nos cards */
document.querySelectorAll(".spot").forEach(el => el.addEventListener("pointermove", e => {
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", (e.clientX - r.left) + "px");
  el.style.setProperty("--my", (e.clientY - r.top) + "px");
}));

${marqueeJs}${beltsJs}</script>
</body>
</html>
`;
}

/* ---------- gravação ---------- */
fs.writeFileSync(path.join(ROOT, "assets", "site.css"), css.trim() + "\n");
for (const p of PAGES) {
  const dir = path.join(ROOT, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), render(p));
}
console.log("ok:", PAGES.map(p => "/" + p.slug + "/").join("  "));
