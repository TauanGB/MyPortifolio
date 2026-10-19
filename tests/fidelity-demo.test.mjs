import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../src/app/components/portfolio/fidelityDemo.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const context = { exports: {} };
vm.runInNewContext(compiled, context);
const { fidelityDemoReducer: reduce, initialDemoState: initial, DEMO_GOAL } = context.exports;

test('an early redemption does not consume purchases or create a reward', () => {
  const result = reduce(initial, 'redeem');
  assert.equal(result.purchases, 3);
  assert.equal(result.redemptions, 0);
  assert.equal(initial.purchases, 3);
});

test('two purchases unlock redemption; redeeming starts a fresh cycle', () => {
  const one = reduce(initial, 'purchase');
  assert.equal(one.purchases, 4);
  assert.match(one.message, /Falta 1 compra/);
  const eligible = reduce(one, 'purchase');
  assert.equal(eligible.purchases, DEMO_GOAL);
  assert.match(eligible.message, /Meta atingida/);
  const redeemed = reduce(eligible, 'redeem');
  assert.equal(redeemed.purchases, 0);
  assert.equal(redeemed.redemptions, 1);
  assert.equal(reduce(redeemed, 'redeem').redemptions, 1);
  assert.equal(reduce(redeemed, 'purchase').purchases, 1);
});

test('additional purchases before redemption do not carry over to the next cycle', () => {
  let state = initial;
  for (let i = 0; i < 4; i++) state = reduce(state, 'purchase');
  assert.equal(state.purchases, 7);
  state = reduce(state, 'redeem');
  assert.equal(state.purchases, 0);
  assert.equal(state.redemptions, 1);
});

test('reset restores synthetic fixtures after multiple cycles', () => {
  let state = initial;
  for (let cycle = 0; cycle < 3; cycle++) {
    for (let i = 0; i < DEMO_GOAL; i++) state = reduce(state, 'purchase');
    state = reduce(state, 'redeem');
  }
  assert.equal(state.redemptions, 3);
  const reset = reduce(state, 'reset');
  assert.equal(reset.purchases, 3);
  assert.equal(reset.redemptions, 0);
  assert.match(reset.message, /reiniciada/);
  assert.equal(initial.purchases, 3);
});
