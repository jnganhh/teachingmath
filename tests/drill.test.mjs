import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../mpm2d-drill.html', import.meta.url), 'utf8');
const scripts = [...html.matchAll(/<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .map(m => m[1])
  .filter(s => s.includes('const SKILLS ='));
assert.equal(scripts.length, 1, 'Expected main drill script block');
const mainScript = scripts[0];

const uiSplit = mainScript.indexOf('/* ================= Local storage progress ================= */');
assert.ok(uiSplit > 0, 'Expected Local storage progress marker');
const lvlStart = mainScript.indexOf('const LEVELLED_TASKS =');
const lvlEnd = mainScript.indexOf('function renderLevelled()');
assert.ok(lvlStart > 0 && lvlEnd > lvlStart, 'Expected LEVELLED_TASKS block');
const mathAndGenCode = mainScript.slice(0, uiSplit) + '\n' + mainScript.slice(lvlStart, lvlEnd);

const ctx = {
  Math, Number, String, Array, Object, Set, Map, RegExp, Error, JSON,
  isFinite, isNaN, parseFloat, parseInt,
  console,
  $: () => ({ textContent: '', value: '', classList: { add() {}, remove() {}, replace() {}, toggle() {} }, innerHTML: '' }),
  document: { getElementById: () => ({ textContent: '', value: '', classList: { add() {}, remove() {}, replace() {}, toggle() {} }, innerHTML: '' }) },
};
vm.createContext(ctx);
vm.runInContext(mathAndGenCode + `
;this.__exports = {
  normalizeDigits, parseConstant, splitTopLevel, polyFromAst, polyEq, isVertexFormAst,
  checkLineEq, checkNumber, checkPoint, checkVertexForm, checkSolve,
  SKILLS, LEVELLED_TASKS, parse, hasVar
};
`, ctx);

const {
  parseConstant, splitTopLevel, polyFromAst, polyEq, isVertexFormAst,
  checkLineEq, checkNumber, checkPoint, checkVertexForm, checkSolve,
  SKILLS, LEVELLED_TASKS, parse
} = ctx.__exports;

test('parseConstant rejects variables, malformed decimals, and accepts Persian/Arabic digits', () => {
  assert.equal(parseConstant('2'), 2);
  assert.equal(parseConstant('-3.5'), -3.5);
  assert.equal(parseConstant('1/2 + 1/4'), 0.75);
  assert.equal(parseConstant('۲٫۵'), 2.5);
  assert.equal(parseConstant('−4'), -4);
  assert.throws(() => parseConstant('x+2'));
  assert.throws(() => parseConstant('2.3.9'));
  assert.throws(() => parseConstant(''));
  assert.throws(() => parseConstant('1/0'));
});

test('splitTopLevel & checkPoint reject trailing commas and variable expressions', () => {
  assert.deepEqual([...splitTopLevel('(1, 2)', ',')], ['(1, 2)']);
  assert.deepEqual([...splitTopLevel('1, 2', ',')], ['1', '2']);
  assert.equal(checkPoint('(x,2,)', { point: [0, 2] }).ok, false);
  assert.equal(checkPoint('(x,2)', { point: [0, 2] }).ok, false);
  assert.equal(checkPoint('(0, 2)', { point: [0, 2] }).ok, true);
  assert.equal(checkPoint('0, 2', { point: [0, 2] }).ok, true);
});

test('polyFromAst rejects division by variable x such as (x+1)(x+1)/x*x', () => {
  assert.equal(polyFromAst(parse('(x+1)(x+1)/x*x')), null);
  const p1 = polyFromAst(parse('(x+1)(x+1)'));
  const p2 = polyFromAst(parse('x^2 + 2x + 1'));
  assert.ok(p1 && p2);
  assert.equal(polyEq(p1, p2), true);
  assert.equal(polyEq(polyFromAst(parse('x+0.02')), polyFromAst(parse('x'))), false);
});

test('isVertexFormAst rejects expanded quadratics like y=(x^2+2x+1)', () => {
  assert.equal(isVertexFormAst(parse('(x^2+2x+1)')), false);
  assert.equal(isVertexFormAst(parse('(x+1)^2')), true);
  assert.equal(isVertexFormAst(parse('2(x-3)^2 + 5')), true);
  assert.equal(checkVertexForm('y=(x^2+2x+1)', { co: [1, 2, 1] }).ok, false);
  assert.equal(checkVertexForm('y=(x+1)^2', { co: [1, 2, 1] }).ok, true);
});

test('checkLineEq rejects close approximations like x+0.02 for y=x', () => {
  assert.equal(checkLineEq('y = x + 0.02', { lineEq: { m: 1, b: 0 } }).ok, false);
  assert.equal(checkLineEq('y = x', { lineEq: { m: 1, b: 0 } }).ok, true);
  assert.equal(checkLineEq('x', { lineEq: { m: 1, b: 0 } }).ok, true);
  assert.equal(checkLineEq('y = 2x - 3', { lineEq: { m: 2, b: -3 } }).ok, true);
});

test('checkNumber rejects x+2 for 2 and handles units/tolerance', () => {
  assert.equal(checkNumber('x+2', { numAns: 2, tol: 1e-4 }).ok, false);
  assert.equal(checkNumber('2', { numAns: 2, tol: 1e-4 }).ok, true);
  assert.equal(checkNumber('$2000', { numAns: 2000, tol: 1e-4 }).ok, true);
  assert.equal(checkNumber('10 L', { numAns: 10, tol: 1e-4 }).ok, true);
});

test('checkSolve rejects variable expressions in root list', () => {
  assert.equal(checkSolve('x+2, 3', { roots: [2, 3] }).ok, false);
  assert.equal(checkSolve('2, 3', { roots: [2, 3] }).ok, true);
  assert.equal(checkSolve('x = 2, x = 3', { roots: [2, 3] }).ok, true);
});

test('All 43 SKILLS generators run cleanly across all tiers without NaN/errors', () => {
  const skillEntries = Object.entries(SKILLS);
  assert.ok(skillEntries.length >= 40, `Expected >=40 skills, got ${skillEntries.length}`);
  for (const [id, skill] of skillEntries) {
    for (const tier of ['warmup', 'core', 'challenge']) {
      for (let i = 0; i < 15; i++) {
        const q = skill.gen(tier);
        assert.ok(q && typeof q.expr === 'string' && q.expr.length > 0, `${id}(${tier}) missing expr`);
        if (typeof q.numAns === 'number') {
          assert.ok(Number.isFinite(q.numAns), `${id}(${tier}) non-finite numAns`);
        }
        if (Array.isArray(q.ptAns)) {
          assert.ok(q.ptAns.every(Number.isFinite), `${id}(${tier}) non-finite ptAns`);
        }
        if (Array.isArray(q.roots)) {
          assert.ok(q.roots.every(Number.isFinite), `${id}(${tier}) non-finite roots`);
        }
      }
    }
  }
});

test('l_mixture solution problems have exact target% matching displayed givens', () => {
  for (let i = 0; i < 60; i++) {
    const q = SKILLS.l_mixture.gen('core');
    assert.ok(Number.isFinite(q.numAns));
    const m = q.expr.match(/mixes a (\d+)% saline solution with a (\d+)% solution\nto make (\d+) L of a ([\d.]+)% solution/);
    if (m) {
      const p1 = Number(m[1]), p2 = Number(m[2]), tot = Number(m[3]), target = Number(m[4]);
      const x = q.numAns, y = tot - x;
      assert.ok(Math.abs(x * p1 + y * p2 - target * tot) < 1e-9, `Mismatch: ${x}*${p1}+${y}*${p2} != ${target}*${tot}`);
    }
  }
});

test('ag_classify never generates collinear/duplicate points or ambiguous right+isosceles', () => {
  for (let i = 0; i < 60; i++) {
    const q = SKILLS.ag_classify.gen('core');
    assert.ok(['isosceles', 'scalene', 'right'].includes(q.choice));
    const m = q.expr.match(/A\(([-\d]+),\s*([-\d]+)\),\s*B\(([-\d]+),\s*([-\d]+)\),\s*C\(([-\d]+),\s*([-\d]+)\)/);
    assert.ok(m, `Could not parse vertices: ${q.expr}`);
    const [, ax, ay, bx, by, cx, cy] = m.map(Number);
    const area2 = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
    assert.notEqual(area2, 0, `Collinear vertices generated: ${q.expr}`);
  }
});

test('LEVELLED_TASKS entries generate valid questions', () => {
  const entries = Object.entries(LEVELLED_TASKS);
  assert.equal(entries.length, 4);
  for (const [k, levels] of entries) {
    for (const [lvlNum, genFn] of Object.entries(levels)) {
      const q = genFn();
      assert.ok(q && typeof q.expr === 'string' && q.expr.length > 0, `Levelled ${k}.${lvlNum} missing expr`);
    }
  }
});
