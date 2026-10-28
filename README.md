# Camuzi Refrigeração — site

Site da Camuzi Refrigeração: instalação, higienização, manutenção e conserto de ar-condicionado na Grande Vitória e região – ES.

## Estrutura

- `prototipo/camuzi-home.html` — página inicial (HTML, CSS e JavaScript em um único arquivo)
- `prototipo/<serviço>/index.html` — páginas de cada serviço, geradas por `scripts/gerar-paginas.js` a partir da home (textos ficam no próprio script; rode `node scripts/gerar-paginas.js` depois de mudar a home ou os textos)
- `prototipo/assets/` — logos, fotos otimizadas (WebP) e ilustrações; `site.css` é gerado a partir da home
- `.github/workflows/publicar-site.yml` — publica no GitHub Pages (camuzirefrigeração.com.br) a cada envio para a `main`
- `fotos-originais/` — fotos originais dos serviços, em resolução cheia
- `.claude/serve.js` e `.claude/launch.json` — servidor simples para pré-visualizar localmente

## Como visualizar

```bash
node .claude/serve.js
```

Depois abra `http://localhost:5173` no navegador.

## Configuração

No fim de `camuzi-home.html`, o objeto `CONFIG` reúne o WhatsApp, o telefone exibido e o link do Perfil da Empresa no Google (`googlePerfil`, vazio por enquanto: o botão "Ver no Google" fica escondido até ser preenchido).
