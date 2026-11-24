"use strict";

const byId = (id) => document.getElementById(id);
const storageKey = "mpm2d-algebra-teacher-reports-v1";
const topics = algebraTopics.map(({name}) => name);
const levels = ["Warm-up", "Core", "Stretch"];
const filter = byId("student-filter");
let reports = [];

function readReport(data) {
  if (data?.format !== "mpm2d-algebra-progress-v1" || typeof data.studentId !== "string" ||
      !data.studentId.trim() || data.studentId.length > 60 || !Array.isArray(data.attempts) ||
      !data.attempts.length || !data.attempts.every((item) =>
        item && typeof item.id === "string" && /^[a-f0-9-]{36}$/.test(item.id) &&
        topics.includes(item.topic) && levels.includes(item.level) &&
        Number.isInteger(item.score) && Number.isInteger(item.total) && item.total > 0 &&
        item.score >= 0 && item.score <= item.total && typeof item.completedAt === "string" &&
        Number.isFinite(Date.parse(item.completedAt)))) throw Error("Invalid algebra progress report.");
  return {studentId:data.studentId.trim(), attempts:data.attempts};
}

try {
  const saved = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
  reports = saved.map((report) => readReport({...report, format:"mpm2d-algebra-progress-v1"}));
} catch {
  byId("status").textContent = "Saved reports could not be read.";
}

function summary() {
  const result = [];
  for (const {studentId, attempts} of reports) {
    if (filter.value && filter.value !== studentId) continue;
    for (const topic of topics) {
      for (const level of levels) {
        const matching = attempts.filter((item) => item.topic === topic && item.level === level)
          .sort((a, b) => Date.parse(b.completedAt) - Date.parse(a.completedAt));
        if (!matching.length) continue;
        const latest = matching[0];
        const best = matching.reduce((top, item) => item.score / item.total > top.score / top.total ? item : top, latest);
        result.push([studentId, topic, level, matching.length, `${latest.score}/${latest.total}`,
          `${best.score}/${best.total}`, new Date(latest.completedAt).toLocaleString()]);
      }
    }
  }
  return result;
}

function render() {
  const selected = filter.value;
  filter.replaceChildren(new Option("All students", ""));
  for (const {studentId} of reports) filter.add(new Option(studentId, studentId));
  filter.value = reports.some(({studentId}) => studentId === selected) ? selected : "";
  const rows = byId("rows");
  const values = summary();
  rows.replaceChildren();
  if (!values.length) {
    const cell = rows.insertRow().insertCell();
    cell.colSpan = 7;
    cell.textContent = "Import a student report to see progress.";
  }
  for (const details of values) {
    const row = rows.insertRow();
    for (const value of details) row.insertCell().textContent = value;
  }
  byId("export").disabled = !values.length;
}

byId("import").addEventListener("change", async (event) => {
  const files = Array.from(event.target.files);
  event.target.value = "";
  const incoming = await Promise.allSettled(files.map(async (file) => readReport(JSON.parse(await file.text()))));
  const next = new Map(reports.map((report) => [report.studentId, new Map(report.attempts.map((item) => [item.id, item]))]));
  let invalid = 0;
  let added = 0;
  for (const result of incoming) {
    if (result.status === "rejected") {
      invalid++;
      continue;
    }
    const {studentId, attempts} = result.value;
    const existing = next.get(studentId) ?? new Map();
    for (const item of attempts) {
      if (existing.has(item.id)) continue;
      existing.set(item.id, item);
      added++;
    }
    next.set(studentId, existing);
  }
  reports = Array.from(next, ([studentId, items]) => ({studentId, attempts:Array.from(items.values())}))
    .sort((a, b) => a.studentId.localeCompare(b.studentId));
  const messages = [`${added} new set completions imported.`];
  if (invalid) messages.push(`${invalid} invalid reports skipped.`);
  try {
    localStorage.setItem(storageKey, JSON.stringify(reports));
  } catch {
    messages.push("Browser storage is unavailable. Export the summary before closing the page.");
  }
  byId("status").textContent = messages.join(" ");
  render();
});

filter.addEventListener("change", render);
byId("export").addEventListener("click", () => {
  const headers = ["Student ID", "Topic", "Level", "Sets completed", "Latest", "Best", "Last completed"];
  const escape = (value) => {
    let text = String(value);
    if (/^[\s]*[=+@-]/.test(text)) text = "'" + text;
    return '"' + text.replaceAll('"', '""') + '"';
  };
  const csv = [headers, ...summary()].map((row) => row.map(escape).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], {type:"text/csv;charset=utf-8"}));
  const link = document.createElement("a");
  link.href = url;
  link.download = "mpm2d-algebra-summary.csv";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

render();
