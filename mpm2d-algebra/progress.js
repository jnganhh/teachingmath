"use strict";

const algebraProgressKey = "mpm2d-algebra-progress-v1";
const algebraProgressStatus = document.getElementById("progress-status");
const reportId = document.getElementById("student-id");
let algebraAttempts = [];
let algebraDrafts = {};
let activeAlgebraSet = null;

try {
  const saved = JSON.parse(localStorage.getItem(algebraProgressKey) ?? "{}");
  algebraAttempts = Array.isArray(saved.attempts) ? saved.attempts : [];
  reportId.value = saved.studentId ?? "";
  if (saved.drafts && typeof saved.drafts === "object") algebraDrafts = saved.drafts;
  activeAlgebraSet = saved.activeSet ?? null;
} catch {
  algebraProgressStatus.textContent = "Saved progress could not be read in this browser.";
}

const algebraSetKey = (topic, level) => `${topic} / ${level}`;

function renderAlgebraProgress() {
  const rows = document.getElementById("progress-rows");
  rows.replaceChildren();
  for (const {name} of algebraTopics) {
    for (const level of ["Warm-up", "Core", "Stretch"]) {
      const attempts = algebraAttempts.filter((attempt) => attempt.topic === name && attempt.level === level);
      const latest = attempts.at(-1);
      const best = attempts.reduce((top, item) => !top || item.score / item.total > top.score / top.total ? item : top, null);
      const score = (item) => item ? `${item.score}/${item.total}` : "—";
      const draft = algebraDrafts[algebraSetKey(name, level)];
      const current = draft?.reviewed > 0 && draft.reviewed < draft.total ? `${draft.reviewed}/${draft.total} reviewed` : "—";
      const row = rows.insertRow();
      for (const value of [name, level, attempts.length, score(latest), score(best), current]) row.insertCell().textContent = value;
    }
  }
  document.getElementById("download-report").disabled = !algebraAttempts.length;
}

function saveAlgebraProgress(studentId = reportId.value.trim()) {
  try {
    localStorage.setItem(algebraProgressKey, JSON.stringify({studentId, attempts: algebraAttempts, drafts: algebraDrafts, activeSet: activeAlgebraSet}));
  } catch {
    algebraProgressStatus.textContent = "Progress is available in this tab. Download a report before closing it because browser storage is unavailable.";
  }
}

function recordAlgebraAttempt(topic, level, score, total) {
  algebraAttempts.push({id: crypto.randomUUID(), topic, level, score, total, completedAt: new Date().toISOString()});
}

document.getElementById("report-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const studentId = reportId.value.trim();
  if (!studentId) {
    algebraProgressStatus.textContent = "Enter the student ID your teacher assigned.";
    reportId.focus();
    return;
  }
  saveAlgebraProgress(studentId);
  const report = {format:"mpm2d-algebra-progress-v1", studentId, attempts:algebraAttempts};
  const url = URL.createObjectURL(new Blob([JSON.stringify(report)], {type:"application/json"}));
  const link = document.createElement("a");
  link.href = url;
  link.download = "mpm2d-algebra-progress.json";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

renderAlgebraProgress();
