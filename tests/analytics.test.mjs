import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../src/services/analytics.ts', import.meta.url), 'utf8').split('\nconst analytics =')[0];
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const context = { exports: {}, URL, Date };
vm.runInNewContext(compiled, context);
const { createAnalyticsController } = context.exports;

function fixture({ stored, production = true, id = 'G-ABC1234567', blockedStorage = false } = {}) {
  const scripts = [];
  const storage = new Map(stored ? [['tauan.analytics-consent.v1', stored]] : []);
  const listeners = {};
  const win = {
    location: { href: 'https://example.com/MyPortifolio/?email=private#secret' },
    localStorage: {
      getItem(key) { if (blockedStorage) throw Error('blocked'); return storage.get(key); },
      setItem(key, value) { if (blockedStorage) throw Error('blocked'); storage.set(key, value); },
    },
    addEventListener(name, callback) { listeners[name] = callback; },
  };
  const doc = {
    referrer: 'https://search.example/find?q=private#secret',
    createElement: () => ({}),
    head: { appendChild: element => scripts.push(element) },
  };
  const analytics = createAnalyticsController(win, doc, id, production);
  return { analytics, win, scripts, storage, listeners, events: () => (win.dataLayer || []).map(args => Array.from(args)) };
}

test('no tag or events before consent, after rejection, outside production or with invalid ID', () => {
  for (const options of [{}, { stored: 'rejected' }, { production: false }, { id: 'invalid' }]) {
    const f = fixture(options);
    f.analytics.trackEvent('view_product', { product_id: 'petlife' });
    assert.equal(f.scripts.length, 0);
    assert.equal(f.events().length, 0);
    if (options.production === false || options.id) {
      f.analytics.setPreference('accepted');
      assert.equal(f.scripts.length, 0);
    }
  }
});

test('accept initializes once; pageview and referrer exclude query/hash; extra event fields excluded', () => {
  const f = fixture();
  f.analytics.setPreference('accepted');
  f.analytics.setPreference('accepted');
  f.analytics.trackEvent('view_product', { product_id: 'petlife', email: 'private' });
  assert.equal(f.scripts.length, 1);
  const pages = f.events().filter(event => event[1] === 'page_view');
  assert.equal(pages.length, 1);
  assert.equal(pages[0][2].page_location, 'https://example.com/MyPortifolio/');
  assert.equal(pages[0][2].page_referrer, 'https://search.example/find');
  const config = f.events().find(event => event[0] === 'config');
  assert.equal(config[2].send_page_view, false);
  assert.deepEqual(Object.keys(f.events().at(-1)[2]), ['product_id']);
});

test('revoke immediately disables GA and events; reaccept does not duplicate pageview', () => {
  const f = fixture({ stored: 'accepted' });
  f.analytics.setPreference('rejected');
  assert.equal(f.win['ga-disable-G-ABC1234567'], true);
  assert.equal(f.events().at(-1)[2].analytics_storage, 'denied');
  const count = f.events().length;
  f.analytics.trackEvent('click_contact', { channel: 'github', placement: 'footer' });
  assert.equal(f.events().length, count);
  f.analytics.setPreference('accepted');
  assert.equal(f.win['ga-disable-G-ABC1234567'], false);
  assert.equal(f.scripts.length, 1);
  assert.equal(f.events().filter(event => event[1] === 'page_view').length, 1);
});

test('cross-tab rejection and clear revoke; blocked storage keeps in-tab choice', () => {
  const f = fixture({ stored: 'accepted' });
  f.storage.set('tauan.analytics-consent.v1', 'rejected');
  f.listeners.storage({ key: 'tauan.analytics-consent.v1' });
  assert.equal(f.analytics.getPreference(), 'rejected');
  assert.equal(f.win['ga-disable-G-ABC1234567'], true);
  f.storage.clear();
  f.listeners.storage({ key: null });
  assert.equal(f.analytics.getPreference(), null);
  const blocked = fixture({ blockedStorage: true });
  assert.doesNotThrow(() => blocked.analytics.setPreference('accepted'));
  assert.equal(blocked.analytics.getPreference(), 'accepted');
  assert.equal(blocked.scripts.length, 1);
});
