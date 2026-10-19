import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { buildSync } from 'esbuild';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Render the actual page without accessing a browser, production or the network.
// esbuild is already provided by Vite; no additional dependency is installed.
const bundle = buildSync({
  entryPoints: ['src/app/components/portfolio/PortfolioPage.tsx'],
  bundle: true,
  write: false,
  platform: 'node',
  format: 'cjs',
  packages: 'external',
  loader: { '.css': 'empty', '.jpeg': 'dataurl' },
  define: { 'import.meta.env.PROD': 'false', 'import.meta.env.VITE_GA_MEASUREMENT_ID': '""' },
}).outputFiles[0].text;
const module = { exports: {} };
vm.runInNewContext(bundle, {
  module,
  exports: module.exports,
  require: createRequire(import.meta.url),
  window: { localStorage: { getItem: () => null }, addEventListener() {} },
  document: {},
});
const html = renderToStaticMarkup(createElement(module.exports.PortfolioPage));
const anchors = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map(([, attrs, body]) => ({
  attrs,
  label: body.replace(/<[^>]+>/g, '').trim(),
  href: attrs.match(/\bhref="([^"]*)"/)?.[1],
}));

test('the production CTA has the exact URL and safe new-tab attributes', () => {
  const cta = anchors.find(a => a.label === 'Ver projeto em produção');
  assert.ok(cta);
  assert.equal(cta.href, 'https://pet-life.up.railway.app/');
  assert.match(cta.attrs, /target="_blank"/);
  assert.match(cta.attrs, /rel="noopener noreferrer"/);
});

test('all navigation anchors resolve and every new-tab link is protected', () => {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id));
  for (const anchor of anchors) {
    assert.ok(anchor.href, `Missing destination: ${anchor.label}`);
    if (anchor.href.startsWith('#')) assert.ok(ids.has(anchor.href.slice(1)), anchor.href);
    else assert.equal(new URL(anchor.href).protocol, 'https:');
    if (/target="_blank"/.test(anchor.attrs)) {
      assert.match(anchor.attrs, /rel="[^"]*noopener/);
      assert.match(anchor.attrs, /rel="[^"]*noreferrer/);
    }
  }
  assert.ok(anchors.some(a => a.href === 'https://wa.me/5577999786153'));
  assert.ok(anchors.some(a => a.href === 'https://github.com/TauanGB/MyPortifolio'));
});

test('page landmarks, section labels, skip target and initial demo semantics exist', () => {
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.equal([...html.matchAll(/<main\b/g)].length, 1);
  assert.match(html, /<main id="conteudo" tabindex="-1">/);
  for (const id of ['inicio', 'projetos', 'fidelity', 'abordagem', 'sobre', 'contato']) {
    assert.match(html, new RegExp(`<section[^>]*id="${id}"[^>]*aria-labelledby="[^"]+"`));
  }
  assert.match(html, /role="progressbar"[^>]*aria-valuemax="5"[^>]*aria-valuenow="3"/);
  assert.match(html, /role="status" aria-live="polite" aria-atomic="true"/);
  assert.match(html, /<button[^>]*disabled=""[^>]*>Resgatar/);
  assert.match(html, /sem conexão com o sistema real/);
  assert.doesNotMatch(html, /email@|seu-usuario|example\.com/);
});

function luminance(hex) {
  const rgb = hex.match(/[0-9a-f]{2}/gi).map(value => {
    const channel = parseInt(value, 16) / 255;
    return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
  });
  return .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2];
}

test('primary text, actions and dark-section text meet WCAG AA contrast', () => {
  for (const [foreground, background] of [
    ['142c4b', 'ffffff'], ['52657d', 'ffffff'], ['52657d', 'f1f6fc'],
    ['ffffff', '174be8'], ['bdcde1', '112a49'], ['b4c8e5', '112a49'],
    ['93b5ff', '112a49'], ['e0e9ff', '174be8'], ['31568b', 'f1f6fc'],
  ]) {
    const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
    assert.ok((values[0] + .05) / (values[1] + .05) >= 4.5, `${foreground} on ${background}`);
  }
  const css = readFileSync(new URL('../src/styles/portfolio.css', import.meta.url), 'utf8');
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /focus-visible/);
  assert.match(css, /forced-colors: active/);
});
