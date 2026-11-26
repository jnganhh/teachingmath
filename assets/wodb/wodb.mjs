import { mcr3u } from './mcr3u.mjs';
import { mhf4u } from './mhf4u.mjs';
import { minus } from './sets.mjs';

const banks = { MCR3U: mcr3u, MHF4U: mhf4u };
const letters = ['A', 'B', 'C', 'D'];

function element(tag, className, label) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (label) node.textContent = label;
  return node;
}

function labelledSelect(label, id) {
  const field = element('div', 'wodb-field');
  const caption = element('label', '', label);
  caption.htmlFor = id;
  const select = element('select', '');
  select.id = id;
  field.append(caption, select);
  return { field, select };
}

function button(label) {
  const node = element('button', 'wodb-button', label);
  node.type = 'button';
  return node;
}

function plot(value) {
  const canvas = element('canvas', 'wodb-graph');
  canvas.width = 480;
  canvas.height = 280;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', value.description);
  canvas.textContent = value.description;
  return canvas;
}

function drawGraph(canvas, data) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const style = getComputedStyle(canvas);
  const [xMin, xMax] = data.x;
  const [yMin, yMax] = data.y;
  const left = 45;
  const right = canvas.width - 18;
  const top = 12;
  const bottom = canvas.height - 32;
  const xPixel = x => left + (x - xMin) * (right - left) / (xMax - xMin);
  const yPixel = y => bottom - (y - yMin) * (bottom - top) / (yMax - yMin);

  function line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = style.getPropertyValue('--wodb-plot-text');
  ctx.font = '19px system-ui';
  ctx.strokeStyle = style.getPropertyValue('--wodb-plot-grid');
  ctx.lineWidth = 1;
  ctx.textAlign = 'center';
  const xStep = data.xStep ?? (xMax - xMin > 10 ? 2 : 1);
  const start = data.xLabels ? xMin : Math.ceil(xMin / xStep) * xStep;
  for (let index = 0; start + index * xStep <= xMax + 1e-8; index += 1) {
    const x = start + index * xStep;
    line(xPixel(x), top, xPixel(x), bottom);
    ctx.fillText(data.xLabels?.[index] ?? minus(x), xPixel(x), bottom + 24);
  }
  ctx.textAlign = 'right';
  const yStep = data.yStep ?? (yMax - yMin > 10 ? 2 : 1);
  for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
    line(left, yPixel(y), right, yPixel(y));
    ctx.fillText(minus(y), left - 7, yPixel(y) + 6);
  }
  ctx.strokeStyle = style.getPropertyValue('--wodb-plot-axis');
  ctx.lineWidth = 2;
  if (xMin <= 0 && xMax >= 0) line(xPixel(0), top, xPixel(0), bottom);
  if (yMin <= 0 && yMax >= 0) line(left, yPixel(0), right, yPixel(0));

  ctx.save();
  ctx.beginPath();
  ctx.rect(left, top, right - left, bottom - top);
  ctx.clip();
  ctx.strokeStyle = style.getPropertyValue('--wodb-accent');
  ctx.lineWidth = 4;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  let previous;
  for (let i = 0; i <= 480; i += 1) {
    const x = xMin + (xMax - xMin) * i / 480;
    const y = data.fn(x);
    const gap = data.breaks?.some(breakAt => previous <= breakAt && breakAt <= x);
    if (!Number.isFinite(y) || Math.abs(y) > 1e5) {
      previous = undefined;
      continue;
    }
    if (previous === undefined || gap) ctx.moveTo(xPixel(x), yPixel(y));
    else ctx.lineTo(xPixel(x), yPixel(y));
    previous = x;
  }
  ctx.stroke();
  ctx.restore();
}

function renderValue(value) {
  if (typeof value === 'string') return element('span', 'wodb-expression', value);
  if (value.kind === 'graph') return plot(value);
  const grid = element('table', 'wodb-table');
  const body = grid.createTBody();
  for (const [label, ...values] of value.rows) {
    const row = body.insertRow();
    const header = element('th', '', label);
    header.scope = 'row';
    row.append(header);
    for (const number of values) row.insertCell().textContent = minus(number);
  }
  const wrapper = element('div', 'wodb-table-wrap');
  wrapper.append(grid);
  return wrapper;
}

function setFragment(course, code, index) {
  return `${course.toLowerCase()}-${code.toLowerCase()}-${String(index + 1).padStart(2, '0')}`;
}

function mount(root, strands) {
  const course = root.dataset.course;
  const key = course.toLowerCase();
  const groups = strands.flatMap(strand => strand.groups);
  const counts = element('p', 'wodb-counts',
    `${groups.reduce((total, group) => total + group.sets.length, 0)} sets · ${groups.length} overall expectations`);

  const expectation = labelledSelect('Overall expectation', `${key}-expectation`);
  const picker = labelledSelect('Set', `${key}-set`);
  const controls = element('div', 'wodb-controls');
  controls.append(expectation.field, picker.field);
  for (const strand of strands) {
    const options = element('optgroup');
    options.label = strand.name;
    for (const group of strand.groups) {
      options.append(new Option(`${group.code} · ${group.title}`, group.code));
    }
    expectation.select.append(options);
  }

  const panel = element('div', 'wodb-board comic-border');
  const summary = element('div', 'wodb-board-title');
  summary.setAttribute('aria-live', 'polite');
  const position = element('p', 'wodb-position');
  const title = element('h3', 'wodb-title');
  summary.append(position, title);
  const prompt = element('p', 'wodb-prompt');
  const cards = element('ol', 'wodb-cards');
  cards.type = 'A';
  const navigation = element('div', 'wodb-navigation');
  const previous = button('← Previous');
  const next = button('Next →');
  const random = button('Random set');
  random.title = 'Choose a different set in this expectation';
  const large = button('Large text');
  large.setAttribute('aria-pressed', 'false');
  const reset = button('Reset votes');
  navigation.append(previous, next, random, large, reset);

  const discussion = element('details', 'wodb-discussion');
  const reveal = element('summary', '', 'Show sample arguments');
  const reasons = element('ol', 'wodb-reasons');
  reasons.type = 'A';
  discussion.append(reveal, reasons);

  panel.append(summary, prompt, cards, navigation, discussion);
  const directions = element('p', 'wodb-directions',
    'Choose a card and explain what makes it different. Then find a reason to choose another card.');
  const source = element('a', 'wodb-source', 'Ontario curriculum overall expectations');
  source.href = 'https://www.edu.gov.on.ca/eng/curriculum/secondary/math1112currb.pdf#page=' +
    (course === 'MCR3U' ? '45' : '87');
  root.append(counts, directions, controls, panel, source);
  let group = groups[0];
  let activeIndex = 0;
  let visibleGraphs = [];
  let voteButtons = [];

  function drawVisibleGraphs() {
    for (const [canvas, data] of visibleGraphs) drawGraph(canvas, data);
  }

  function selectGroup(code) {
    group = groups.find(candidate => candidate.code === code);
    expectation.select.value = code;
    picker.select.replaceChildren(...group.sets.map((set, index) =>
      new Option(`${index + 1}. ${set.title}`, String(index))));
  }

  function show(index, updateAddress = true) {
    const current = group.sets[index];
    activeIndex = index;
    picker.select.value = String(index);
    position.textContent = `${group.code} · Set ${index + 1} of ${group.sets.length}`;
    title.textContent = current.title;
    prompt.textContent = current.prompt;
    prompt.hidden = !current.prompt;
    discussion.open = false;
    reveal.textContent = 'Show sample arguments';
    previous.disabled = index === 0;
    next.disabled = index === group.sets.length - 1;

    visibleGraphs = [];
    voteButtons = [];
    cards.replaceChildren(...current.cards.map(({ value }, i) => {
      const tile = element('li', 'wodb-card');
      const label = element('span', 'wodb-letter', letters[i]);
      const vote = button('Vote · 0');
      vote.classList.add('wodb-vote');
      vote.setAttribute('aria-label', `Add vote for ${letters[i]} (0 votes)`);
      vote.dataset.count = '0';
      vote.addEventListener('click', () => setVotes(vote, i, Number(vote.dataset.count) + 1));
      voteButtons.push(vote);
      const cardHeader = element('div', 'wodb-card-header');
      cardHeader.append(label, vote);
      const content = renderValue(value);
      tile.append(cardHeader, content);
      if (value.kind === 'graph') visibleGraphs.push([content, value]);
      return tile;
    }));
    reasons.replaceChildren(...current.cards.map(({ reason }) => element('li', '', reason)));
    drawVisibleGraphs();

    if (updateAddress) {
      history.replaceState(null, '', `#${setFragment(course, group.code, index)}`);
    }
  }

  function restoreFromAddress() {
    const match = location.hash.match(new RegExp(`^#${key}-([a-d][1-4])-(\\d{2})$`, 'i'));
    if (!match) return false;
    const code = match[1].toUpperCase();
    const existing = groups.find(candidate => candidate.code === code);
    const index = Number(match[2]) - 1;
    if (!existing?.sets[index]) return false;
    selectGroup(code);
    show(index, false);
    return true;
  }

  expectation.select.addEventListener('change', () => {
    selectGroup(expectation.select.value);
    show(0);
  });
  picker.select.addEventListener('change', () => show(Number(picker.select.value)));
  previous.addEventListener('click', () => show(activeIndex - 1));
  next.addEventListener('click', () => show(activeIndex + 1));
  random.addEventListener('click', () => {
    const choice = Math.floor(Math.random() * (group.sets.length - 1));
    show(choice < activeIndex ? choice : choice + 1);
  });
  discussion.addEventListener('toggle', () => {
    reveal.textContent = discussion.open ? 'Hide sample arguments' : 'Show sample arguments';
  });
  function setVotes(control, i, total) {
    control.dataset.count = String(total);
    control.textContent = `Vote · ${total}`;
    control.setAttribute('aria-label', `Add vote for ${letters[i]} (${total} ${total === 1 ? 'vote' : 'votes'})`);
  }
  reset.addEventListener('click', () => voteButtons.forEach((control, i) => setVotes(control, i, 0)));
  large.addEventListener('click', () => {
    const enlarged = panel.classList.toggle('wodb-large');
    large.setAttribute('aria-pressed', String(enlarged));
  });

  selectGroup(group.code);
  show(0, false);
  return restoreFromAddress;
}

const panels = [...document.querySelectorAll('[data-course-panel]')];
const courseLinks = document.querySelectorAll('[data-course-link]');
const restore = new Map();

function route() {
  const requested = location.hash.slice(1).split('-')[0].toLowerCase();
  const active = panels.find(panel => panel.id === requested) ?? panels[0];
  for (const panel of panels) panel.hidden = panel !== active;
  for (const link of courseLinks) {
    if (link.dataset.courseLink === active.id) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  if (!active.dataset.course) return;
  if (!restore.has(active.id)) restore.set(active.id, mount(active, banks[active.dataset.course]));
  restore.get(active.id)();
}

for (const link of courseLinks) {
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (link.getAttribute('aria-current') === 'page') return;
    history.pushState(null, '', link.hash);
    route();
  });
}
window.addEventListener('hashchange', route);
route();
