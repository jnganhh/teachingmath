import { mcr3u } from './mcr3u.mjs';
import { mhf4u } from './mhf4u.mjs';
import { minus } from './sets.mjs';

const banks = { MCR3U: mcr3u, MHF4U: mhf4u };
const letters = ['A', 'B', 'C', 'D'];
const cardColors = ['bg-blue-50', 'bg-emerald-50', 'bg-amber-50', 'bg-purple-50'];
const PAGE_SIZE = 12;

const COURSE_META = {
  MCR3U: {
    subtitle: 'MCR3U · Functions',
    curriculumUrl: 'https://www.edu.gov.on.ca/eng/curriculum/secondary/math1112currb.pdf#page=45'
  },
  MHF4U: {
    subtitle: 'MHF4U · Advanced Functions',
    curriculumUrl: 'https://www.edu.gov.on.ca/eng/curriculum/secondary/math1112currb.pdf#page=87'
  }
};

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
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
  ctx.fillStyle = style.getPropertyValue('--wodb-plot-text') || '#334155';
  ctx.font = '19px system-ui';
  ctx.strokeStyle = style.getPropertyValue('--wodb-plot-grid') || '#e2e8f0';
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
  ctx.strokeStyle = style.getPropertyValue('--wodb-plot-axis') || '#475569';
  ctx.lineWidth = 2;
  if (xMin <= 0 && xMax >= 0) line(xPixel(0), top, xPixel(0), bottom);
  if (yMin <= 0 && yMax >= 0) line(left, yPixel(0), right, yPixel(0));

  ctx.save();
  ctx.beginPath();
  ctx.rect(left, top, right - left, bottom - top);
  ctx.clip();
  ctx.strokeStyle = style.getPropertyValue('--wodb-accent') || '#1d4ed8';
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
  if (typeof value === 'string') return element('div', 'break-words', value);
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
  const meta = COURSE_META[course] || { subtitle: course, curriculumUrl: '#' };

  // Flatten all sets with group/strand metadata so we can filter by All or specific expectation
  const allEntries = [];
  const groups = [];
  for (const strand of strands) {
    for (const group of strand.groups) {
      groups.push({ ...group, strandName: strand.name });
      group.sets.forEach((set, idxInGroup) => {
        allEntries.push({
          id: setFragment(course, group.code, idxInGroup),
          code: group.code,
          groupTitle: group.title,
          strandName: strand.name,
          idxInGroup,
          groupTotal: group.sets.length,
          set
        });
      });
    }
  }

  // State
  let activeCode = 'ALL';
  let activeEntry = allEntries[0];
  let showReasons = false;
  let hideTotals = false;
  let largeFont = false;
  let isPresenting = false;
  let currentPage = 0;
  let searchQuery = '';
  const votesById = Object.create(null);
  let lastResetBackup = null;

  function getVotes(id = activeEntry.id) {
    if (!votesById[id]) votesById[id] = [0, 0, 0, 0];
    return votesById[id];
  }

  root.className = 'space-y-4 wodb-course';
  root.replaceChildren();

  // 1. Header Card (matching MPM2D)
  const header = element('header', 'wodb-course-header bg-white rounded-xl comic-border p-3.5 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3');
  const headerLeft = element('div');
  const badgeRow = element('div', 'flex items-center gap-2 flex-wrap');
  badgeRow.append(
    element('span', 'px-2.5 py-1 text-xs font-black uppercase rounded bg-blue-100 text-blue-900 border-2 border-slate-800', `Ontario ${course}`),
    element('span', 'px-2.5 py-1 text-xs font-black rounded bg-emerald-100 text-emerald-900 border-2 border-slate-800', `${allEntries.length} WODB Puzzles · ${groups.length} Expectations`)
  );
  const h2 = element('h2', 'text-xl sm:text-3xl font-black text-blue-700 mt-2', meta.subtitle);
  h2.id = `${key}-title`;
  const subtext = element('p', 'text-xs font-bold text-slate-600', 'Every quadrant has a valid mathematical reason! Tap a card or +/− to tally class votes, then reveal sample reasons.');
  headerLeft.append(badgeRow, h2, subtext);

  const actionBar = element('div', 'flex flex-wrap items-center gap-2');
  const randomBtn = element('button', 'px-3 py-2 text-xs font-black rounded-lg bg-amber-300 text-slate-900 comic-btn', '🎲 Random WODB');
  randomBtn.type = 'button';
  const reasonsBtn = element('button', 'px-3 py-2 text-xs font-black rounded-lg bg-emerald-700 text-white comic-btn', '👁️ Sample Reasons');
  reasonsBtn.type = 'button';
  const hideTotalsBtn = element('button', 'px-3 py-2 text-xs font-black rounded-lg bg-slate-100 text-slate-900 comic-btn', '🙈 Hide Totals');
  hideTotalsBtn.type = 'button';
  const resetBtn = element('button', 'px-3 py-2 text-xs font-black rounded-lg bg-slate-100 text-slate-900 comic-btn', '🔄 Reset Votes');
  resetBtn.type = 'button';
  const undoResetBtn = element('button', 'hidden px-3 py-2 text-xs font-black rounded-lg bg-amber-100 text-amber-950 comic-btn', '↩️ Undo Reset');
  undoResetBtn.type = 'button';
  const presentBtn = element('button', 'px-3 py-2 text-xs font-black rounded-lg bg-blue-700 text-white comic-btn', '🖥️ Present');
  presentBtn.type = 'button';
  const fontBtn = element('button', 'px-3 py-2 text-xs font-black rounded-lg bg-slate-800 text-white comic-btn', '⛶ Large Font');
  fontBtn.type = 'button';
  const refreshBtn = element('button', 'px-3 py-2 text-xs font-black rounded-lg bg-cyan-100 text-cyan-950 comic-btn', '🔄 Refresh');
  refreshBtn.type = 'button';
  refreshBtn.title = 'Reload latest version';
  actionBar.append(randomBtn, reasonsBtn, hideTotalsBtn, resetBtn, undoResetBtn, presentBtn, fontBtn, refreshBtn);
  header.append(headerLeft, actionBar);

  // 2. Active 2x2 Stage Card (matching MPM2D)
  const stage = element('section', 'wodb-course-stage bg-white rounded-xl comic-border p-4 sm:p-6 space-y-4');
  stage.tabIndex = -1;
  const stageTop = element('div', 'flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-slate-200 pb-3');
  const stageMeta = element('div');
  const stageBadges = element('div', 'flex items-center gap-2 flex-wrap');
  const expBadge = element('span', 'px-2 py-0.5 text-[10px] font-black uppercase rounded bg-blue-100 text-blue-900 border border-slate-800');
  const strandBadge = element('span', 'px-2 py-0.5 text-[10px] font-black uppercase rounded bg-purple-100 text-purple-900 border border-slate-800');
  stageBadges.append(expBadge, strandBadge);
  const stageTitle = element('h3', 'text-lg sm:text-2xl font-black text-slate-900 mt-1');
  const stagePrompt = element('p', 'text-xs font-bold text-slate-600 mt-1');
  stageMeta.append(stageBadges, stageTitle, stagePrompt);

  const navBtns = element('div', 'flex flex-wrap items-center gap-2 shrink-0');
  const prevBtn = element('button', 'px-3 py-1.5 text-xs font-black rounded-lg bg-slate-100 border-2 border-slate-800 hover:bg-slate-200 disabled:opacity-40', '◀ Prev');
  prevBtn.type = 'button';
  const nextBtn = element('button', 'px-3 py-1.5 text-xs font-black rounded-lg bg-slate-100 border-2 border-slate-800 hover:bg-slate-200 disabled:opacity-40', 'Next ▶');
  nextBtn.type = 'button';
  const presentReasonsBtn = element('button', 'hidden px-3 py-1.5 text-xs font-black rounded-lg bg-emerald-700 text-white border-2 border-slate-800', '👁️ Sample Reasons');
  presentReasonsBtn.type = 'button';
  const presentHideTotalsBtn = element('button', 'hidden px-3 py-1.5 text-xs font-black rounded-lg bg-slate-100 text-slate-900 border-2 border-slate-800', '🙈 Hide Totals');
  presentHideTotalsBtn.type = 'button';
  const presentResetBtn = element('button', 'hidden px-3 py-1.5 text-xs font-black rounded-lg bg-slate-100 text-slate-900 border-2 border-slate-800', '🔄 Reset');
  presentResetBtn.type = 'button';
  const exitPresentBtn = element('button', 'hidden px-3 py-1.5 text-xs font-black rounded-lg bg-slate-800 text-white border-2 border-slate-800', '✕ Exit Present');
  exitPresentBtn.type = 'button';
  navBtns.append(prevBtn, nextBtn, presentReasonsBtn, presentHideTotalsBtn, presentResetBtn, exitPresentBtn);
  stageTop.append(stageMeta, navBtns);

  const cardsGrid = element('div', 'wodb-course-grid grid grid-cols-1 sm:grid-cols-2 gap-4');
  stage.append(stageTop, cardsGrid);

  // 3. Expectation Filter, Search & Paginated Browser Card (matching MPM2D)
  const browser = element('section', 'wodb-course-browser bg-white rounded-xl comic-border p-3 sm:p-4 space-y-3');
  const filterRow = element('div', 'flex flex-col sm:flex-row sm:items-center justify-between gap-2');
  const filterBar = element('div', 'flex flex-wrap items-center gap-1.5');
  filterBar.setAttribute('role', 'tablist');
  filterBar.setAttribute('aria-label', `${course} expectation filter`);

  const searchInput = element('input', 'px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-50 border-2 border-slate-800 w-52 sm:w-64');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search title, code (e.g. A1), or #...';
  searchInput.setAttribute('aria-label', `Search ${course} puzzles`);
  filterRow.append(filterBar, searchInput);

  const selectorGrid = element('div', 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2');
  const pageBar = element('div', 'flex items-center justify-between pt-2 border-t border-slate-200 text-xs font-black');
  const pageInfo = element('span', 'text-slate-600');
  const pageBtns = element('div', 'flex items-center gap-2');
  const prevPageBtn = element('button', 'px-3 py-1 rounded-lg bg-slate-100 border-2 border-slate-800 hover:bg-slate-200 disabled:opacity-40', '◀ Prev 12');
  prevPageBtn.type = 'button';
  const nextPageBtn = element('button', 'px-3 py-1 rounded-lg bg-slate-100 border-2 border-slate-800 hover:bg-slate-200 disabled:opacity-40', 'Next 12 ▶');
  nextPageBtn.type = 'button';
  pageBtns.append(prevPageBtn, nextPageBtn);
  pageBar.append(pageInfo, pageBtns);

  const sourceLink = element('a', 'wodb-course-source inline-block text-xs font-bold text-blue-700 underline hover:text-blue-900', `Ontario ${course} curriculum overall expectations ↗`);
  sourceLink.href = meta.curriculumUrl;
  sourceLink.target = '_blank';
  sourceLink.rel = 'noopener noreferrer';

  browser.append(filterRow, selectorGrid, pageBar);
  root.append(header, stage, browser, sourceLink);

  let visibleGraphs = [];

  function getFilteredEntries() {
    const q = searchQuery.trim().toLowerCase();
    return allEntries.filter(entry => {
      if (activeCode !== 'ALL' && entry.code !== activeCode) return false;
      if (!q) return true;
      return (
        entry.set.title.toLowerCase().includes(q) ||
        entry.code.toLowerCase().includes(q) ||
        entry.groupTitle.toLowerCase().includes(q) ||
        entry.strandName.toLowerCase().includes(q) ||
        String(entry.idxInGroup + 1) === q.replace('#', '')
      );
    });
  }

  function renderFilters() {
    filterBar.replaceChildren();
    const items = [{ code: 'ALL', label: 'All' }, ...groups.map(g => ({ code: g.code, label: g.code, title: g.title }))];
    for (const item of items) {
      const btn = element(
        'button',
        `px-2.5 py-1 text-[11px] font-black rounded-lg border-2 border-slate-800 transition ${activeCode === item.code ? 'tab-active' : 'bg-slate-50 hover:bg-slate-100'}`,
        item.label
      );
      btn.type = 'button';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', String(activeCode === item.code));
      if (item.title) btn.title = `${item.code} · ${item.title}`;
      btn.addEventListener('click', () => {
        activeCode = item.code;
        currentPage = 0;
        renderFilters();
        renderSelector();
      });
      filterBar.append(btn);
    }
  }

  function renderSelector() {
    const filtered = getFilteredEntries();
    const total = filtered.length;
    const maxPage = Math.max(0, Math.ceil(total / PAGE_SIZE) - 1);
    if (currentPage > maxPage) currentPage = maxPage;

    const start = currentPage * PAGE_SIZE;
    const slice = filtered.slice(start, start + PAGE_SIZE);
    selectorGrid.replaceChildren();

    if (slice.length === 0) {
      selectorGrid.append(element('div', 'col-span-full text-center py-4 text-xs font-bold text-slate-600', 'No matching WODB sets found.'));
    } else {
      for (const entry of slice) {
        const isActive = entry.id === activeEntry.id;
        const btn = element(
          'button',
          `text-left p-2.5 rounded-xl border-2 border-slate-800 transition ${isActive ? 'bg-blue-50 ring-2 ring-blue-500' : 'bg-slate-50 hover:bg-yellow-50'}`
        );
        btn.type = 'button';
        if (isActive) btn.setAttribute('aria-current', 'true');
        btn.append(
          element('div', 'text-[10px] font-black uppercase text-blue-700', `${entry.code} · Set ${entry.idxInGroup + 1}`),
          element('div', 'text-xs font-black text-slate-900 mt-0.5', entry.set.title)
        );
        btn.addEventListener('click', () => selectEntry(entry));
        selectorGrid.append(btn);
      }
    }

    const end = Math.min(start + PAGE_SIZE, total);
    pageInfo.textContent = total > 0 ? `Showing ${start + 1}–${end} of ${total}` : '0 sets';
    prevPageBtn.disabled = currentPage === 0;
    nextPageBtn.disabled = end >= total;
    prevBtn.disabled = total === 0;
    nextBtn.disabled = total === 0;
  }

  function updateVoteLabel(index) {
    const span = root.querySelector(`[data-vote-idx="${index}"]`);
    if (!span) return;
    const count = getVotes()[index] || 0;
    span.textContent = hideTotals ? 'Votes: •••' : `Votes: ${count}`;
  }

  function updateUndoBtn() {
    if (lastResetBackup && lastResetBackup.id === activeEntry.id) {
      undoResetBtn.classList.remove('hidden');
    } else {
      undoResetBtn.classList.add('hidden');
    }
  }

  function updateReasonsButtons() {
    const text = showReasons ? '🙈 Hide Reasons' : '👁️ Sample Reasons';
    reasonsBtn.textContent = text;
    presentReasonsBtn.textContent = text;
  }

  function updateHideTotalsButtons() {
    const text = hideTotals ? '👁️ Show Totals' : '🙈 Hide Totals';
    hideTotalsBtn.textContent = text;
    presentHideTotalsBtn.textContent = text;
  }

  function syncPresentUI() {
    document.body.classList.toggle('wodb-course-presenting', isPresenting);
    for (const btn of [presentReasonsBtn, presentHideTotalsBtn, presentResetBtn, exitPresentBtn]) {
      btn.classList.toggle('hidden', !isPresenting);
    }
    renderStage();
  }

  async function enterPresentMode() {
    isPresenting = true;
    syncPresentUI();
    if (typeof stage.requestFullscreen === 'function') {
      try {
        await stage.requestFullscreen();
      } catch (_err) {
        // CSS viewport fallback active
      }
    }
    stage.focus();
  }

  async function exitPresentMode() {
    isPresenting = false;
    if (document.fullscreenElement && typeof document.exitFullscreen === 'function') {
      try {
        await document.exitFullscreen();
      } catch (_err) {
        // Ignore
      }
    }
    syncPresentUI();
  }

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && isPresenting) {
      isPresenting = false;
      syncPresentUI();
    }
  });

  function renderStage() {
    const entry = activeEntry;
    expBadge.textContent = `${entry.code} · ${entry.groupTitle}`;
    strandBadge.textContent = entry.strandName;
    stageTitle.textContent = `Set ${entry.idxInGroup + 1} of ${entry.groupTotal} — ${entry.set.title}`;
    stagePrompt.textContent = entry.set.prompt || '';
    stagePrompt.hidden = !entry.set.prompt;

    const big = largeFont || isPresenting;
    const exprClass = big ? 'text-2xl sm:text-4xl' : 'text-xl sm:text-2xl';
    const reasonClass = big ? 'text-sm sm:text-base' : 'text-xs';
    const votes = getVotes(entry.id);

    visibleGraphs = [];
    cardsGrid.replaceChildren();

    entry.set.cards.forEach((cardData, i) => {
      const card = element(
        'div',
        `cursor-pointer ${cardColors[i % 4]} rounded-2xl comic-border p-5 sm:p-7 flex flex-col justify-between min-h-[185px] sm:min-h-[225px] hover:brightness-95 transition`
      );
      card.addEventListener('click', () => {
        votes[i] = (votes[i] || 0) + 1;
        updateVoteLabel(i);
      });

      const topRow = element('div', 'flex items-center justify-between gap-2');
      const badge = element('span', 'w-8 h-8 rounded-full bg-slate-900 text-white text-sm font-black flex items-center justify-center shrink-0', letters[i]);

      const voteWrap = element('div', 'flex items-center gap-1.5');
      voteWrap.addEventListener('click', e => e.stopPropagation());

      const minusBtn = element('button', 'px-2.5 py-1 text-xs font-black rounded bg-white border-2 border-slate-800 hover:bg-slate-100', '−');
      minusBtn.type = 'button';
      minusBtn.setAttribute('aria-label', `Remove vote for ${letters[i]}`);
      minusBtn.addEventListener('click', () => {
        votes[i] = Math.max(0, (votes[i] || 0) - 1);
        updateVoteLabel(i);
      });

      const countSpan = element('span', `${big ? 'text-sm' : 'text-xs'} px-2.5 py-1 font-mono font-black rounded bg-white border-2 border-slate-800`, hideTotals ? 'Votes: •••' : `Votes: ${votes[i] || 0}`);
      countSpan.dataset.voteIdx = String(i);

      const plusBtn = element('button', 'px-2.5 py-1 text-xs font-black rounded bg-white border-2 border-slate-800 hover:bg-slate-100', '+');
      plusBtn.type = 'button';
      plusBtn.setAttribute('aria-label', `Add vote for ${letters[i]}`);
      plusBtn.addEventListener('click', () => {
        votes[i] = (votes[i] || 0) + 1;
        updateVoteLabel(i);
      });

      voteWrap.append(minusBtn, countSpan, plusBtn);
      topRow.append(badge, voteWrap);

      const contentWrap = element('div', `${exprClass} font-black text-center text-slate-900 my-4 overflow-x-auto max-w-full`);
      const rendered = renderValue(cardData.value);
      contentWrap.append(rendered);
      if (cardData.value.kind === 'graph') visibleGraphs.push([rendered, cardData.value]);

      const footer = showReasons
        ? element('div', `p-2.5 rounded-xl bg-white/95 border-2 border-slate-800 ${reasonClass} font-bold text-slate-900`, `💡 ${cardData.reason}`)
        : element('div', 'text-xs font-bold text-slate-600 text-center', `Why might ${letters[i]} not belong?`);

      card.append(topRow, contentWrap, footer);
      cardsGrid.append(card);
    });

    for (const [canvas, data] of visibleGraphs) drawGraph(canvas, data);
  }

  function selectEntry(entry, updateAddress = true) {
    if (entry.id !== activeEntry.id) {
      activeEntry = entry;
      showReasons = false;
      lastResetBackup = null;
      updateUndoBtn();
      updateReasonsButtons();
    }
    const filtered = getFilteredEntries();
    const idx = filtered.findIndex(e => e.id === activeEntry.id);
    if (idx !== -1) currentPage = Math.floor(idx / PAGE_SIZE);
    renderSelector();
    renderStage();
    if (updateAddress) {
      history.replaceState(null, '', `#${activeEntry.id}`);
    }
  }

  function restoreFromAddress() {
    const match = location.hash.match(new RegExp(`^#${key}-([a-d][1-4])-(\\d{2})$`, 'i'));
    if (!match) return false;
    const targetId = `${key}-${match[1].toLowerCase()}-${match[2]}`;
    const found = allEntries.find(e => e.id === targetId);
    if (!found) return false;
    activeCode = found.code;
    renderFilters();
    selectEntry(found, false);
    return true;
  }

  function stepEntry(delta) {
    const filtered = getFilteredEntries();
    if (filtered.length === 0) return;
    const idx = filtered.findIndex(e => e.id === activeEntry.id);
    const nextIdx = idx === -1 ? 0 : (idx + delta + filtered.length) % filtered.length;
    selectEntry(filtered[nextIdx]);
  }

  function doToggleReasons() {
    showReasons = !showReasons;
    updateReasonsButtons();
    renderStage();
  }

  function doToggleHideTotals() {
    hideTotals = !hideTotals;
    updateHideTotalsButtons();
    for (let i = 0; i < 4; i += 1) updateVoteLabel(i);
  }

  function doResetVotes() {
    lastResetBackup = { id: activeEntry.id, votes: [...getVotes()] };
    votesById[activeEntry.id] = [0, 0, 0, 0];
    for (let i = 0; i < 4; i += 1) updateVoteLabel(i);
    updateUndoBtn();
  }

  // Event listeners
  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value;
    currentPage = 0;
    renderSelector();
  });

  prevPageBtn.addEventListener('click', () => {
    currentPage = Math.max(0, currentPage - 1);
    renderSelector();
  });

  nextPageBtn.addEventListener('click', () => {
    const total = getFilteredEntries().length;
    const maxPage = Math.max(0, Math.ceil(total / PAGE_SIZE) - 1);
    currentPage = Math.min(maxPage, currentPage + 1);
    renderSelector();
  });

  prevBtn.addEventListener('click', () => stepEntry(-1));
  nextBtn.addEventListener('click', () => stepEntry(1));

  randomBtn.addEventListener('click', () => {
    const filtered = getFilteredEntries();
    if (filtered.length === 0) return;
    const choice = filtered[Math.floor(Math.random() * filtered.length)];
    selectEntry(choice);
  });

  reasonsBtn.addEventListener('click', doToggleReasons);
  presentReasonsBtn.addEventListener('click', doToggleReasons);

  hideTotalsBtn.addEventListener('click', doToggleHideTotals);
  presentHideTotalsBtn.addEventListener('click', doToggleHideTotals);

  resetBtn.addEventListener('click', doResetVotes);
  presentResetBtn.addEventListener('click', doResetVotes);

  undoResetBtn.addEventListener('click', () => {
    if (!lastResetBackup || lastResetBackup.id !== activeEntry.id) return;
    votesById[activeEntry.id] = [...lastResetBackup.votes];
    lastResetBackup = null;
    for (let i = 0; i < 4; i += 1) updateVoteLabel(i);
    updateUndoBtn();
  });

  presentBtn.addEventListener('click', () => (isPresenting ? exitPresentMode() : enterPresentMode()));
  exitPresentBtn.addEventListener('click', exitPresentMode);

  fontBtn.addEventListener('click', () => {
    largeFont = !largeFont;
    root.classList.toggle('wodb-large', largeFont);
    fontBtn.textContent = largeFont ? '⛶ Normal Font' : '⛶ Large Font';
    renderStage();
  });

  refreshBtn.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('_r', Date.now());
    window.location.replace(url.toString());
  });

  document.addEventListener('keydown', e => {
    if (root.hidden) return;
    const dlg = document.getElementById('customWodbDialog');
    if (dlg && dlg.open) return;
    const tag = (document.activeElement?.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || document.activeElement?.isContentEditable) return;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stepEntry(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      stepEntry(1);
    } else if (e.key === 'r' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      doToggleReasons();
    } else if (e.key === 'R' && e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      doResetVotes();
    } else if (e.key === 'Escape' && isPresenting && !document.fullscreenElement) {
      e.preventDefault();
      exitPresentMode();
    }
  });

  renderFilters();
  selectEntry(activeEntry, false);
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
