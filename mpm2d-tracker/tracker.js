"use strict";

const baseKey = "mpm2d-tracker-v1";
const storageKey = () => period.value === "1" ? baseKey : `${baseKey}-period-${period.value}`;
const homework = {done:"Done", partial:"Partial", missing:"Missing"};
const statuses = {P:"Present", L:"Late", E:"Excused", U:"Unexcused"};
const activities = ["Algebra problem string", "Building Thinking Classrooms", "Whiteboard task", "Low-floor, high-ceiling task", "Other"];
const skills = [
  ["Responsibility", "At the whiteboard, follows through on an agreed group role."],
  ["Organization", "In a problem string, records earlier cases so the emerging pattern can be checked."],
  ["Independent Work", "Uses individual think time to try a case and independently checks a step."],
  ["Collaboration", "At a group board, invites a peer's reasoning and builds on it."],
  ["Initiative", "Starts with an accessible case, then poses and tries an extension."],
  ["Self-Regulation", "Recognizes a stalled approach, asks a focused question, and tries a new representation."]
];
const criteria = [
  ["Contributes ideas", "Shares a pattern from earlier cases using words, a sketch, or algebra."],
  ["Asks relevant questions", "Asks whether a pattern holds when the starting value changes."],
  ["Respects peers’ contributions", "Restates a peer's strategy before comparing approaches."],
  ["Builds classroom culture", "Makes room for a classmate and treats a wrong turn as something the group can investigate."]
];

const $ = (id) => document.getElementById(id);
const period = $("period");
const form = $("evidence-form");
const field = (name) => form.elements.namedItem(name);
const date = $("class-date");
const filter = $("evidence-filter");
const activity = $("session-activity");
const focus = $("session-focus");
const focusExamples = new Map([...skills, ...criteria]);
const blank = () => ({students: [], attendance: {}, observations: [], marks: {}, lessons: {}, tallies: {}, checkins: {}});
const localDate = (now = new Date()) => [
  now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")
].join("-");
const dayPattern = /^\d{4}-\d{2}-\d{2}$/;
const uid = () => crypto.randomUUID();
let state = blank();
let editing = null;
let cardStudent = null;
const studentCard = $("student-card");
let storageReady = true;

function message(text) {
  $("notice").textContent = text;
}

function node(tag, text) {
  const item = document.createElement(tag);
  if (text !== undefined) item.textContent = text;
  return item;
}

function options(select, entries, placeholder) {
  select.replaceChildren(new Option(placeholder, ""));
  for (const [value, label] of entries) select.add(new Option(label, value));
}

function restore(raw) {
  const record = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
  const validId = (value) => typeof value === "string" && /^[a-f0-9-]{36}$/.test(value);
  const string = (value) => typeof value === "string";
  if (!record(raw) || !Array.isArray(raw.students) || !record(raw.attendance) ||
      !Array.isArray(raw.observations) || !record(raw.marks)) throw Error("Invalid backup.");
  const ids = new Set();
  for (const student of raw.students) {
    if (!record(student) || !validId(student.id) || ids.has(student.id) ||
        !string(student.name) || !student.name.trim()) throw Error("Invalid roster.");
    ids.add(student.id);
  }
  for (const [day, entries] of Object.entries(raw.attendance)) {
    if (!dayPattern.test(day) || !record(entries) || !Object.entries(entries)
      .every(([id, code]) => ids.has(id) && Object.hasOwn(statuses, code))) throw Error("Invalid attendance.");
  }
  const observationIds = new Set();
  for (const item of raw.observations) {
    if (!record(item) || !validId(item.id) || observationIds.has(item.id) ||
        !ids.has(item.student) || !dayPattern.test(item.date) ||
        !activities.includes(item.activity) || !string(item.observation) || !item.observation.trim() ||
        !string(item.feedback) || !["", ...criteria.map(([label]) => label)].includes(item.criterion) ||
        !["", ...skills.map(([label]) => label)].includes(item.skill)) throw Error("Invalid observation.");
    observationIds.add(item.id);
  }
  for (const [id, mark] of Object.entries(raw.marks)) {
    if (!ids.has(id) || !Number.isFinite(mark) || mark < 0 || mark > 100) throw Error("Invalid mark.");
  }
  const lessons = raw.lessons ?? {};
  if (!record(lessons)) throw Error("Invalid lessons.");
  for (const [day, lesson] of Object.entries(lessons)) {
    if (!dayPattern.test(day) || !record(lesson) || !["", ...activities].includes(lesson.activity) ||
        (lesson.focus !== "" && !focusExamples.has(lesson.focus))) throw Error("Invalid lesson.");
  }
  const tallies = raw.tallies ?? {};
  if (!record(tallies)) throw Error("Invalid tallies.");
  for (const [day, entries] of Object.entries(tallies)) {
    if (!dayPattern.test(day) || !record(entries) || !Object.entries(entries).every(([id, count]) =>
      ids.has(id) && Number.isSafeInteger(count) && count > 0)) throw Error("Invalid tally.");
  }
  const checkins = raw.checkins ?? {};
  if (!record(checkins)) throw Error("Invalid daily records.");
  for (const [day, entries] of Object.entries(checkins)) {
    if (!dayPattern.test(day) || !record(entries) || !Object.entries(entries).every(([id, entry]) =>
      ids.has(id) && record(entry) && (entry.homework === "" || Object.hasOwn(homework, entry.homework)) &&
      typeof entry.device === "boolean")) throw Error("Invalid daily record.");
  }
  return {...raw, lessons, tallies, checkins};
}

function loadPeriod() {
  state = blank();
  storageReady = true;
  try {
    const saved = localStorage.getItem(storageKey());
    if (saved) state = restore(JSON.parse(saved));
    message("");
  } catch {
    storageReady = false;
    message("Saved records could not be opened. Restore a backup to resume saving.");
  }
}

loadPeriod();

function save(next) {
  if (!storageReady) return false;
  try {
    localStorage.setItem(storageKey(), JSON.stringify(next));
    state = next;
    message("");
    return true;
  } catch {
    message("The browser could not save this change. Download a backup of your saved records before continuing.");
    return false;
  }
}

function renderLesson() {
  const lesson = state.lessons[date.value];
  activity.value = lesson?.activity ?? "";
  focus.value = lesson?.focus ?? "";
  activity.disabled = focus.disabled = !date.value;
  const example = $("focus-example");
  example.textContent = focusExamples.get(focus.value) ?? "";
  example.hidden = !example.textContent;
  if (!editing) {
    field("date").value = date.value;
    field("activity").value = activity.value;
  }
  $("capture-context").textContent = [field("date").value, field("activity").value].filter(Boolean).join(" · ");
}

function captureFor(id) {
  if (editing || (field("student").value !== id && field("observation").value.trim())) {
    message("Save or clear the current observation before starting another.");
    field("observation").focus();
    return;
  }
  field("student").value = id;
  if (activity.value) field("observation").focus();
  else {
    message("Choose the class activity first. It will apply to each observation for this session.");
    activity.focus();
  }
}

function filteredStudents() {
  const search = $("student-search").value.trim().toLocaleLowerCase();
  return state.students.filter(({name}) => name.toLocaleLowerCase().includes(search));
}

function renderGrid() {
  const grid = $("student-grid");
  grid.replaceChildren();
  const students = filteredStudents();
  if (!students.length) grid.append(node("p", state.students.length ? "No matching students." : "Add students to start taking attendance."));
  for (const {id, name} of students) {
    const status = state.attendance[date.value]?.[id] ?? "";
    const count = state.tallies[date.value]?.[id] ?? 0;
    const tile = node("button");
    tile.type = "button";
    tile.className = "student-tile";
    tile.dataset.status = status;
    tile.disabled = !date.value;
    tile.append(node("strong", name), node("small", `${statuses[status] ?? "Unrecorded"} · Tally ${count}`));
    const checkin = state.checkins[date.value]?.[id];
    const indicators = [checkin?.homework && `HW ${homework[checkin.homework].toLowerCase()}`,
      checkin?.device && "Device reminder"].filter(Boolean);
    if (indicators.length) tile.append(node("small", indicators.join(" · ")));
    tile.addEventListener("click", () => {
      cardStudent = id;
      $("student-card-title").textContent = name;
      renderStudentCard();
      studentCard.showModal();
    });
    grid.append(tile);
  }
}

function renderStudentCard() {
  $("card-attendance").value = state.attendance[date.value]?.[cardStudent] ?? "";
  const count = state.tallies[date.value]?.[cardStudent] ?? 0;
  $("card-tally").textContent = count;
  $("subtract-tally").disabled = count === 0;
  const checkin = state.checkins[date.value]?.[cardStudent];
  $("card-homework").value = checkin?.homework ?? "";
  $("card-device").checked = checkin?.device ?? false;
}

function renderDailyTotals(day = state.attendance[date.value] ?? {}, recorded = Object.keys(day).length) {
  const checkins = Object.values(state.checkins[date.value] ?? {});
  const counts = Object.values(day);
  $("daily-totals").replaceChildren(...[
    `Present ${counts.filter((code) => code === "P").length}`,
    `Late ${counts.filter((code) => code === "L").length}`,
    `Excused ${counts.filter((code) => code === "E").length}`,
    `Unexcused ${counts.filter((code) => code === "U").length}`,
    `HW done ${checkins.filter((entry) => entry.homework === "done").length}`,
    `Device reminders ${checkins.filter((entry) => entry.device).length}`,
    `Math tallies ${Object.values(state.tallies[date.value] ?? {}).reduce((total, count) => total + count, 0)}`
  ].map((text) => node("span", text)));
  $("roll-progress").textContent = `${recorded} of ${state.students.length} recorded`;
  $("mark-present").disabled = !date.value || recorded === state.students.length;
}

function renderRoll() {
  const body = $("roll");
  body.replaceChildren();
  const day = state.attendance[date.value] ?? {};
  const recorded = Object.keys(day).length;
  renderDailyTotals(day, recorded);
  const students = filteredStudents();
  if (!students.length) emptyRow(body, 3, state.students.length ? "No matching students." : "Add your class roster to start taking attendance.");
  for (const {id, name} of students) {
    const row = body.insertRow();
    row.insertCell().textContent = name;
    const select = node("select");
    options(select, Object.entries(statuses), "Unrecorded");
    select.setAttribute("aria-label", `Attendance for ${name}`);
    select.value = day[id] ?? "";
    select.dataset.status = select.value;
    select.disabled = !date.value;
    select.addEventListener("change", () => {
      const next = structuredClone(state);
      const entries = next.attendance[date.value] ??= {};
      if (select.value) entries[id] = select.value;
      else delete entries[id];
      if (save(next)) {
        select.dataset.status = select.value;
        renderDailyTotals(entries);
        renderGrid();
      } else {
        select.value = state.attendance[date.value]?.[id] ?? "";
      }
    });
    row.insertCell().append(select);
    const note = node("button", "Add note");
    note.type = "button";
    note.disabled = !date.value;
    note.setAttribute("aria-label", `Add note for ${name}`);
    note.addEventListener("click", () => captureFor(id));
    row.insertCell().append(note);
  }
  renderGrid();
}

function emptyRow(body, columns, text) {
  const cell = body.insertRow().insertCell();
  cell.colSpan = columns;
  cell.textContent = text;
}

function renderSummary() {
  const body = $("summary-rows");
  body.replaceChildren();
  const history = $("attendance-dates");
  history.replaceChildren();
  const student = state.students.find(({id}) => id === filter.value);
  $("attendance-history").hidden = !student;
  if (!student) {
    emptyRow(body, 9, "Choose a student to review their record.");
    return;
  }
  const {id, name} = student;
  const days = Object.entries(state.attendance).filter(([, entries]) => entries[id])
    .sort(([a], [b]) => b.localeCompare(a));
  const counts = {P:0, L:0, E:0, U:0};
  for (const [day, entries] of days) {
    const code = entries[id];
    counts[code]++;
    history.append(node("li", `${day} · ${statuses[code]}`));
  }
  if (!days.length) history.append(node("li", "No attendance recorded."));
  const recorded = days.length;
  const tallies = Object.values(state.tallies).reduce((total, entries) => total + (entries[id] ?? 0), 0);
  const row = body.insertRow();
  for (const value of [recorded, ...Object.values(counts),
    recorded ? `${(100 * counts.U / recorded).toFixed(1)}%` : "—", tallies]) {
    row.insertCell().textContent = value;
  }
    const input = node("input");
    input.type = "number";
    input.min = "0";
    input.max = "100";
    input.step = "any";
    input.value = state.marks[id] ?? "";
    input.setAttribute("aria-label", `Attendance and participation mark for ${name}`);
    row.insertCell().append(input);
    const points = row.insertCell();
    const updatePoints = () => {
      points.textContent = state.marks[id] === undefined ? "—" : (state.marks[id] * 0.15).toFixed(2);
    };
    updatePoints();
    input.addEventListener("change", () => {
      if (!input.reportValidity()) return;
      const next = structuredClone(state);
      if (input.value === "") delete next.marks[id];
      else next.marks[id] = input.valueAsNumber;
      if (!save(next)) input.value = state.marks[id] ?? "";
      updatePoints();
    });
}

function resetEvidence() {
  editing = null;
  form.reset();
  $("evidence-details").open = false;
  $("cancel-edit").hidden = true;
  form.querySelector('[type="submit"]').textContent = "Save observation";
  renderLesson();
}

function showView(view) {
  for (const tab of document.querySelectorAll("[data-view]")) {
    const selected = tab.dataset.view === view;
    $(tab.dataset.view).hidden = !selected;
    if (selected) tab.setAttribute("aria-current", "page");
    else tab.removeAttribute("aria-current");
  }
  if (view === "summary") renderReview();
  if (view === "history") {
    $("review-date").value = date.value;
    renderHistory();
  }
}

function editObservation(item) {
  if ((editing && editing !== item.id) || (!editing && field("observation").value.trim())) {
    message("Save or clear the current observation before editing another.");
    return;
  }
  showView("today");
  editing = item.id;
  for (const name of ["date", "student", "activity", "criterion", "skill", "observation", "feedback"]) {
    field(name).value = item[name];
  }
  $("capture-context").textContent = `Editing · ${item.date} · ${item.activity}`;
  $("evidence-details").open = true;
  $("cancel-edit").hidden = false;
  form.querySelector('[type="submit"]').textContent = "Update observation";
  field("observation").focus();
}

function renderObservations(target, observations, showName) {
  target.replaceChildren();
  const names = new Map(state.students.map(({id, name}) => [id, name]));
  const recent = observations.slice().reverse().sort((a, b) => b.date.localeCompare(a.date));
  if (!recent.length) target.append(node("p", "No observations recorded."));
  for (const item of recent) {
    const card = node("article");
    card.className = "observation";
    const metadata = node("p", [item.date, item.activity, item.criterion, item.skill].filter(Boolean).join(" · "));
    metadata.className = "meta";
    if (showName) card.append(node("strong", names.get(item.student)));
    card.append(metadata, node("p", item.observation));
    if (item.feedback) card.append(node("p", `Next step: ${item.feedback}`));
    const edit = node("button", "Edit observation");
    edit.addEventListener("click", () => editObservation(item));
    card.append(edit);
    target.append(card);
  }
}

function renderTodayObservations() {
  renderObservations($("today-observations"), state.observations.filter((item) => item.date === date.value), true);
}

function renderReview() {
  renderSummary();
  if (!filter.value) {
    $("observations").replaceChildren(node("p", "Choose a student to see their observations."));
    return;
  }
  renderObservations($("observations"), state.observations.filter((item) => item.student === filter.value), false);
}

function renderHistory() {
  const body = $("history-rows");
  body.replaceChildren();
  const day = $("review-date").value;
  if (!state.students.length) emptyRow(body, 6, "Add students to this period to start keeping records.");
  for (const {id, name} of state.students) {
    const row = body.insertRow();
    const checkin = state.checkins[day]?.[id];
    const notes = state.observations.filter((item) => item.date === day && item.student === id);
    for (const value of [name, statuses[state.attendance[day]?.[id]] ?? "Unrecorded",
      homework[checkin?.homework] ?? "Unrecorded", checkin?.device ? "Reminder" : "—",
      state.tallies[day]?.[id] ?? 0, notes.map((item) => item.observation).join("\n") || "—"]) {
      row.insertCell().textContent = value;
    }
  }
}

function renderStudentOptions() {
  const entries = state.students.map(({id, name}) => [id, name]);
  const chosen = field("student").value;
  const filtered = filter.value;
  options(field("student"), entries, "Choose a student");
  options(filter, entries, "Choose a student");
  if (entries.some(([id]) => id === chosen)) field("student").value = chosen;
  if (entries.some(([id]) => id === filtered)) filter.value = filtered;
  else if (entries.length) filter.value = entries[0][0];
}

date.value = localDate();
options(activity, activities.map((name) => [name, name]), "Choose an activity");
options(focus, [...focusExamples.keys()].map((name) => [name, name]), "Optional look-for");
options(field("criterion"), criteria.map(([name]) => [name, name]), "Choose a criterion");
options(field("skill"), skills.map(([name]) => [name, name]), "Choose a learning skill");

for (const [target, entries] of [["skill-examples", skills], ["criterion-examples", criteria]]) {
  for (const [label, example] of entries) {
    const card = node("div");
    card.className = "card";
    card.append(node("strong", label), node("p", example));
    $(target).append(card);
  }
}

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.view));
});

options($("card-attendance"), Object.entries(statuses), "Unrecorded");
$("student-search").addEventListener("input", renderRoll);

for (const [button, grid] of [[$("grid-view"), true], [$("table-view"), false]]) {
  button.addEventListener("click", () => {
    $("student-grid").hidden = !grid;
    $("roster-table").hidden = grid;
    $("grid-view").setAttribute("aria-pressed", String(grid));
    $("table-view").setAttribute("aria-pressed", String(!grid));
  });
}

$("card-attendance").addEventListener("change", (event) => {
  const next = structuredClone(state);
  const entries = next.attendance[date.value] ??= {};
  if (event.target.value) entries[cardStudent] = event.target.value;
  else delete entries[cardStudent];
  if (save(next)) renderRoll();
  renderStudentCard();
});

for (const [button, amount] of [[$("add-tally"), 1], [$("subtract-tally"), -1]]) {
  button.addEventListener("click", () => {
    const next = structuredClone(state);
    const entries = next.tallies[date.value] ??= {};
    const count = (entries[cardStudent] ?? 0) + amount;
    if (count > 0) entries[cardStudent] = count;
    else delete entries[cardStudent];
    if (save(next)) {
      renderGrid();
      renderDailyTotals();
    }
    renderStudentCard();
  });
}

for (const control of [$("card-homework"), $("card-device")]) {
  control.addEventListener("change", () => {
    const next = structuredClone(state);
    const entries = next.checkins[date.value] ??= {};
    const entry = {homework: $("card-homework").value, device: $("card-device").checked};
    if (entry.homework || entry.device) entries[cardStudent] = entry;
    else delete entries[cardStudent];
    if (save(next)) {
      renderGrid();
      renderDailyTotals();
    }
    renderStudentCard();
  });
}

let currentPeriod = period.value;
period.addEventListener("change", () => {
  if (field("observation").value.trim()) {
    period.value = currentPeriod;
    message("Save or clear the observation before changing periods.");
    return;
  }
  currentPeriod = period.value;
  loadPeriod();
  resetEvidence();
  $("student-search").value = "";
  $("roster-form").reset();
  renderStudentOptions();
  renderRoll();
  renderTodayObservations();
  const active = document.querySelector("nav [aria-current]").dataset.view;
  showView(active);
});

$("review-date").addEventListener("change", renderHistory);

$("card-note").addEventListener("click", () => {
  studentCard.close();
  captureFor(cardStudent);
});

date.addEventListener("change", () => {
  if (!editing && field("observation").value.trim()) {
    date.value = field("date").value;
    message("Save or clear the observation before changing its class date.");
    return;
  }
  renderLesson();
  renderRoll();
  renderTodayObservations();
});

for (const control of [activity, focus]) {
  control.addEventListener("change", () => {
    const next = structuredClone(state);
    next.lessons[date.value] = {activity: activity.value, focus: focus.value};
    save(next);
    renderLesson();
  });
}

$("roster-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const names = $("names").value.split(/\r?\n/).map((name) => name.trim()).filter(Boolean);
  if (!names.length) return;
  const next = structuredClone(state);
  next.students.push(...names.map((name) => ({id: uid(), name})));
  if (!save(next)) return;
  event.target.reset();
  $("roster-settings").open = false;
  renderStudentOptions();
  renderRoll();
});

$("mark-present").addEventListener("click", () => {
  if (!date.value) return;
  const next = structuredClone(state);
  const day = next.attendance[date.value] ??= {};
  for (const {id} of next.students) day[id] ??= "P";
  if (save(next)) renderRoll();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(form));
  values.observation = values.observation.trim();
  values.feedback = values.feedback.trim();
  if (!values.date || !values.activity || !values.observation) {
    message("Choose a class date and activity, then enter the observation.");
    if (!values.activity) activity.focus();
    return;
  }
  const next = structuredClone(state);
  const item = {id: editing ?? uid(), ...values};
  if (editing) next.observations[next.observations.findIndex(({id}) => id === editing)] = item;
  else next.observations.push(item);
  if (!save(next)) return;
  resetEvidence();
  renderTodayObservations();
  message("Observation saved.");
});

$("cancel-edit").addEventListener("click", resetEvidence);
filter.addEventListener("change", renderReview);

$("export").addEventListener("click", () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], {type:"application/json"}));
  const link = node("a");
  link.href = url;
  link.download = `mpm2d-period-${period.value}-${localDate()}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

$("import").addEventListener("change", async (event) => {
  const [file] = event.target.files;
  event.target.value = "";
  if (!file) return;
  const targetPeriod = period.value;
  try {
    const next = restore(JSON.parse(await file.text()));
    if (period.value !== targetPeriod) {
      message("Select the intended period and choose the backup again.");
      return;
    }
    if (!confirm(`Replace the records for Period ${period.value} in this browser with this backup?`)) return;
    storageReady = true;
    if (!save(next)) return;
    resetEvidence();
    renderStudentOptions();
    renderRoll();
    renderReview();
    renderHistory();
    renderTodayObservations();
    message("Backup restored.");
  } catch {
    message("Choose a valid MPM2D tracker backup.");
  }
});

renderStudentOptions();
renderLesson();
renderRoll();
renderTodayObservations();
