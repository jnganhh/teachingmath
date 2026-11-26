import assert from 'node:assert/strict';
import test from 'node:test';
import { mcr3u } from '../assets/wodb/mcr3u.mjs';
import { mhf4u } from '../assets/wodb/mhf4u.mjs';

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
