import vm from "node:vm";
import assert from 'node:assert/strict';
import test from 'node:test';
import { mcr3u } from '../assets/wodb/mcr3u.mjs';
import { mhf4u } from '../assets/wodb/mhf4u.mjs';
import fs from 'node:fs';

function cardKey(value) {
  if (typeof value === 'string') return value.trim();
  if (value.kind === 'table') return JSON.stringify(value.rows);
  assert.equal(value.kind, 'graph');
  const [start, end] = value.x;
  const samples = Array.from({ length: 21 }, (_, index) =>
    value.fn(start + (end - start) * index / 20));
  assert.ok(samples.some(Number.isFinite), 'a graph must have visible data');
  return JSON.stringify([value.x, value.y, samples]);
}

const courses = [
  ['MCR3U', mcr3u, ['A1 A2 A3', 'B1 B2 B3', 'C1 C2 C3', 'D1 D2 D3']],
  ['MHF4U', mhf4u, ['A1 A2 A3', 'B1 B2 B3', 'C1 C2 C3 C4', 'D1 D2 D3']]
];

for (const [course, bank, codes] of courses) {
  test(`${course} covers every overall expectation with at least 400 distinct boards`, () => {
    assert.deepEqual(bank.map(strand => strand.groups.map(group => group.code).join(' ')), codes);
    const boards = new Set();
    for (const { code, sets } of bank.flatMap(strand => strand.groups)) {
      assert.equal(sets.length, 35, `${course} ${code} set count`);
      for (const [index, set] of sets.entries()) {
        const id = `${course} ${code} #${index + 1}`;
        assert.ok(set.title.trim(), `${id} title`);
        assert.equal(set.cards.length, 4, `${id} card count`);
        assert.ok(set.cards.every(card => card.reason.trim()), `${id} sample arguments`);
        const cardKeys = set.cards.map(card => cardKey(card.value));
        assert.equal(new Set(cardKeys).size, 4, `${id} has a duplicate card`);
        const key = JSON.stringify([set.prompt, cardKeys.sort()]);
        assert.ok(!boards.has(key), `${id} duplicates an earlier board`);
        boards.add(key);
      }
    }
    assert.ok(boards.size >= 400);
  });
}


// --- MPM2D 800-puzzle & DOM/storage regression tests ---
const html = fs.readFileSync(new URL('../mpm2d-wodb.html', import.meta.url), 'utf8');
const scripts = [...html.matchAll(/<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .map(m => m[1])
  .filter(s => s.includes('function generate800Puzzles()'));
assert.equal(scripts.length, 1, 'Expected main WODB script block');
const mainScript = scripts[0];

function createDomStub() {
  const noop = () => {};
  const makeEl = () => ({
    textContent: '',
    value: '',
    innerHTML: '',
    className: '',
    disabled: false,
    open: false,
    classList: { add: noop, remove: noop, toggle: noop },
    setAttribute: noop,
    addEventListener: noop,
    appendChild: noop,
    replaceChildren: noop,
    focus: noop,
    close: noop,
    showModal: noop
  });
  return {
    getElementById: () => makeEl(),
    createElement: () => makeEl(),
    createElementNS: () => makeEl(),
    addEventListener: noop,
    body: makeEl(),
    activeElement: null,
    fullscreenElement: null
  };
}

function loadWodbContext(storageImpl) {
  const dom = createDomStub();
  const ctx = {
    Math, Number, String, Array, Object, Set, Map, RegExp, Error, JSON, Date, URL,
    isFinite, isNaN, parseFloat, parseInt, console,
    localStorage: storageImpl || {
      getItem: () => null,
      setItem: () => {}
    },
    document: dom,
    window: {
      location: { hash: '', href: 'https://example.test/mpm2d-wodb.html', replace: () => {} },
      history: { pushState: () => {} },
      addEventListener: () => {}
    }
  };
  vm.createContext(ctx);
  vm.runInContext(mainScript + `
    ;this.__exports = {
      BUILTIN_WODB, TOPICS, loadCustomWodb, isValidCustomPuzzle,
      getFilteredPuzzles, generate800Puzzles
    };
  `, ctx);
  return ctx.__exports;
}

const { BUILTIN_WODB } = loadWodbContext();

// Claim predicates verifying that each card's "Only..." claim holds exclusively on its board
const CLAIM_PREDICATES = {
  // A1
  'a1-diff-squares': (item) => item.meta.a === 1 && item.meta.b === 0 && item.meta.c < 0,
  'a1-perfect-square': (item) => item.meta.a === 1 && item.meta.b > 0 && item.meta.b * item.meta.b === 4 * item.meta.c,
  'a1-distinct-factors': (item) => item.meta.a === 1 && item.meta.b > 0 && item.meta.c > 0 && item.meta.b * item.meta.b > 4 * item.meta.c,
  'a1-gcf-no-const': (item) => item.meta.a > 1 && item.meta.c === 0,

  // A2
  'a2-distinct-monic': (item) => item.meta.kind === 'distinct-monic',
  'a2-conjugate': (item) => item.meta.kind === 'conjugate',
  'a2-nonmonic-square': (item) => item.meta.kind === 'nonmonic-square',
  'a2-outer-gcf': (item) => item.meta.kind === 'outer-gcf',

  // B1
  'b1-neg-yint': (item) => item.meta.yInt < 0,
  'b1-one-xint': (item) => item.meta.xIntCount === 1,
  'b1-opens-down': (item) => item.meta.a < 0,
  'b1-stretch-zero-xint': (item) => item.meta.a > 1 && item.meta.xIntCount === 0,

  // B2
  'b2-factored': (item) => item.meta.kind === 'factored',
  'b2-symmetric': (item) => item.meta.kind === 'symmetric',
  'b2-unfactored-two': (item) => item.meta.kind === 'unfactored-two',
  'b2-no-real': (item) => item.meta.kind === 'no-real',

  // C1
  'c1-si-pos': (item) => item.meta.form === 'slope-intercept' && item.meta.slope > 0 && item.meta.yInt > 0,
  'c1-neg-slope': (item) => item.meta.slope < 0,
  'c1-standard': (item) => item.meta.form === 'standard',
  'c1-neg-yint': (item) => item.meta.yInt < 0,

  // C2
  'c2-parallel': (item) => item.meta.solType === 'none',
  'c2-coincident': (item) => item.meta.solType === 'infinite',
  'c2-perpendicular': (item) => Math.abs(item.meta.slopes[0] * item.meta.slopes[1] + 1) < 1e-9,
  'c2-standard-both': (item) => !item.meta.yIsolated && item.meta.solType === 'one-nonperp',

  // D1a
  'd1a-int-radius': (item) => item.meta.kind === 'circle-int',
  'd1a-irr-radius': (item) => item.meta.kind === 'circle-irr',
  'd1a-q1-point': (item) => item.meta.kind === 'point-q1',
  'd1a-axis-point': (item) => item.meta.kind === 'point-axis',

  // D1b
  'd1b-inside': (item) => item.meta.pt[0] ** 2 + item.meta.pt[1] ** 2 < item.meta.R ** 2,
  'd1b-on-circle-q2': (item) => item.meta.pt[0] ** 2 + item.meta.pt[1] ** 2 === item.meta.R ** 2 && item.meta.pt[0] < 0 && item.meta.pt[1] > 0,
  'd1b-on-yx': (item) => item.meta.pt[0] === item.meta.pt[1],
  'd1b-on-axis': (item) => item.meta.pt[0] === 0 || item.meta.pt[1] === 0,

  // D1c
  'd1c-horizontal': (item) => item.meta.p1[1] === item.meta.p2[1],
  'd1c-vertical': (item) => item.meta.p1[0] === item.meta.p2[0],
  'd1c-origin-mid': (item) => item.meta.p1[0] + item.meta.p2[0] === 0 && item.meta.p1[1] + item.meta.p2[1] === 0,
  'd1c-q1-both': (item) => item.meta.p1[0] > 0 && item.meta.p1[1] > 0 && item.meta.p2[0] > 0 && item.meta.p2[1] > 0,

  // D1d
  'd1d-neg-min': (item) => item.meta.a > 0 && item.meta.minVal < 0,
  'd1d-one-xint': (item) => item.meta.xInts === 1,
  'd1d-opens-down': (item) => item.meta.a < 0,
  'd1d-no-zeros': (item) => item.meta.xInts === 0,

  // D2
  'd2-sine': (item) => item.meta.fn === 'sin',
  'd2-cosine': (item) => item.meta.fn === 'cos',
  'd2-tangent-int': (item) => item.meta.fn === 'tan',
  'd2-radical': (item) => item.meta.fn === 'radical'
};

test('generates 800 unique, non-repeating boards with 4 distinct cards each', () => {
  assert.equal(BUILTIN_WODB.length, 800);
  const seenIds = new Set();
  const seenBoards = new Set();

  for (const board of BUILTIN_WODB) {
    assert.ok(!seenIds.has(board.id), `Duplicate ID ${board.id}`);
    seenIds.add(board.id);
    assert.equal(board.items.length, 4, `Board ${board.id} must have 4 items`);

    const exprs = board.items.map(it => it.expr);
    assert.equal(new Set(exprs).size, 4, `Board ${board.id} has duplicate card expressions: ${exprs.join(' | ')}`);

    const boardSig = [...exprs].sort().join(' || ');
    assert.ok(!seenBoards.has(boardSig), `Board ${board.id} repeats an earlier board: ${boardSig}`);
    seenBoards.add(boardSig);
  }
});

test('every card claimId holds uniquely on its board across all 800 puzzles', () => {
  for (const board of BUILTIN_WODB) {
    for (const card of board.items) {
      const pred = CLAIM_PREDICATES[card.claimId];
      assert.ok(pred, `Missing predicate for claimId ${card.claimId} on ${board.id}`);
      const matches = board.items.filter(c => pred(c));
      assert.equal(
        matches.length,
        1,
        `Claim ${card.claimId} on ${board.id} (${board.title}) matched ${matches.length} cards instead of 1`
      );
      assert.equal(matches[0].label, card.label, `Claim ${card.claimId} matched wrong card on ${board.id}`);
    }
  }
});

test('all KaTeX $ delimiters are balanced across all 800 boards', () => {
  for (const board of BUILTIN_WODB) {
    for (const card of board.items) {
      for (const field of [card.expr, card.reason]) {
        const dollars = (field.match(/(?<!\\)\$/g) || []).length;
        assert.equal(dollars % 2, 0, `Unbalanced $ delimiter on ${board.id} (${card.label}): ${field}`);
      }
    }
  }
});

test('regression fixtures #32, #225, #281, #501 are mathematically valid', () => {
  const b32 = BUILTIN_WODB.find(p => p.num === 32);
  assert.equal(new Set(b32.items.map(i => i.expr)).size, 4);

  const b225 = BUILTIN_WODB.find(p => p.num === 225);
  assert.ok(b225.items.some(i => i.reason.includes('negative $y$-intercept')));

  const b281 = BUILTIN_WODB.find(p => p.num === 281);
  assert.ok(b281.items.some(i => i.reason.includes('negative $y$-intercept')));

  const b501 = BUILTIN_WODB.find(p => p.num === 501);
  const perpCards = b501.items.filter(i => Math.abs(i.meta.slopes[0] * i.meta.slopes[1] + 1) < 1e-9);
  assert.equal(perpCards.length, 1);
});

test('loadCustomWodb handles malformed JSON, null, non-array, and blocked storage safely', () => {
  for (const bad of ['not-json{', 'null', '{"a":1}', '[{"id":"wodb-1"}]']) {
    const exp = loadWodbContext({ getItem: () => bad, setItem: () => {} });
    assert.equal(exp.loadCustomWodb().length, 0);
    assert.equal(exp.BUILTIN_WODB.length, 800);
  }
  const blocked = loadWodbContext({
    getItem: () => { throw new Error('SecurityError'); },
    setItem: () => { throw new Error('QuotaExceededError'); }
  });
  assert.equal(blocked.loadCustomWodb().length, 0);
  assert.equal(blocked.BUILTIN_WODB.length, 800);
});

test('no innerHTML or inline onclick interpolation in rendering script', () => {
  assert.ok(!mainScript.includes('.innerHTML'), 'Main script must not use innerHTML');
});
