"use strict";

const get = (id) => document.getElementById(id);
const levels = ["Warm-up", "Core", "Stretch"];
const levelSelect = get("level");
const answerForm = get("answer-form");
let topicIndex = 0;
let questionIndex = 0;
let firstTry = 0;
let attempted = false;
let finishedQuestion = false;
let revealed = false;
let currentOptions = [];

function element(tag, text) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  return node;
}

function shuffle(items) {
  const result = items.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function questionSet() {
  return algebraTopics[topicIndex].levels[levelSelect.selectedIndex];
}

function setReveal(name, visible) {
  get(name).hidden = !visible;
  get(name + "-button").setAttribute("aria-expanded", String(visible));
}

function renderQuestion() {
  const questions = questionSet();
  const complete = questionIndex === questions.length;
  get("question-area").hidden = complete;
  get("complete").hidden = !complete;
  get("progress").textContent = complete
    ? `${questions.length} questions reviewed`
    : `Question ${questionIndex + 1} of ${questions.length}`;
  get("progress-meter").max = questions.length;
  get("progress-meter").value = questionIndex;
  if (complete) {
    get("result").textContent = `${firstTry} of ${questions.length} correct on the first attempt before viewing the solution.`;
    get("advance").hidden = levelSelect.selectedIndex === levels.length - 1;
    get("complete-title").focus();
    return;
  }

  const question = questions[questionIndex];
  attempted = false;
  revealed = false;
  finishedQuestion = false;
  get("prompt").textContent = question.prompt;
  get("math").textContent = question.math;
  get("hint").textContent = question.hint;
  get("solution").textContent = question.solution;
  get("feedback").textContent = "";
  setReveal("hint", false);
  setReveal("solution", false);
  get("next").hidden = true;
  get("next").textContent = questionIndex + 1 === questions.length ? "See results" : "Next question";
  get("check").disabled = false;
  currentOptions = shuffle([[question.correct, ""], ...question.distractors]);
  get("choices").replaceChildren(...currentOptions.map(([answer], index) => {
    const label = element("label");
    label.className = "choice";
    const radio = element("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = String(index);
    radio.required = true;
    label.append(radio, element("span", answer));
    return label;
  }));
}

function restart() {
  questionIndex = 0;
  firstTry = 0;
  renderQuestion();
}

function selectTopic(index) {
  topicIndex = index;
  levelSelect.selectedIndex = 0;
  const {name, example} = algebraTopics[index];
  const [math, steps, tip] = example;
  get("topic-title").textContent = name;
  get("example-math").textContent = math;
  get("example-steps").replaceChildren(...steps.map((step) => element("li", step)));
  get("tip").textContent = tip;
  for (const [i, button] of Array.from(get("topics").children).entries()) {
    if (i === index) button.setAttribute("aria-current", "true");
    else button.removeAttribute("aria-current");
  }
  restart();
}

const topicDetails = {
  Identities: ["(a + b)²", "Expand and simplify"],
  Factoring: ["(x + a)(x + b)", "Write expressions as products"],
  "Linear systems": ["(x, y)", "Find where two lines meet"],
  Trigonometry: ["sin θ", "Solve right triangles"],
  "Analytic geometry": ["Δy / Δx", "Slope, distance, and midpoint"],
  "Exponent laws": ["xᵃ · xᵇ", "Simplify powers"],
  "Linear equations": ["x = ?", "Find the unknown"]
};

algebraTopics.forEach(({name}, index) => {
  const [symbol, description] = topicDetails[name];
  const button = element("button");
  button.type = "button";
  button.className = "topic-card";
  button.setAttribute("aria-label", name);
  const motif = element("span", symbol);
  motif.className = "topic-symbol";
  motif.setAttribute("aria-hidden", "true");
  const detail = element("span", description);
  detail.className = "topic-detail";
  button.append(motif, element("strong", name), detail);
  button.addEventListener("click", () => selectTopic(index));
  get("topics").append(button);
});

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (finishedQuestion) return;
  const selected = new FormData(answerForm).get("answer");
  if (selected === null) return;
  const [, reasoning] = currentOptions[Number(selected)];
  const feedback = get("feedback");
  if (reasoning) {
    feedback.dataset.kind = "retry";
    feedback.textContent = reasoning + " Try again.";
    attempted = true;
    return;
  }
  if (!attempted && !revealed) firstTry++;
  finishedQuestion = true;
  feedback.dataset.kind = "success";
  feedback.textContent = "Correct. " + questionSet()[questionIndex].solution;
  get("check").disabled = true;
  for (const radio of get("choices").querySelectorAll("input")) radio.disabled = true;
  get("next").hidden = false;
});

get("hint-button").addEventListener("click", () => setReveal("hint", get("hint").hidden));
get("solution-button").addEventListener("click", () => {
  if (get("solution").hidden && !finishedQuestion) {
    revealed = true;
    get("next").hidden = false;
  }
  setReveal("solution", get("solution").hidden);
});
get("next").addEventListener("click", () => {
  questionIndex++;
  if (questionIndex === questionSet().length) {
    recordAlgebraAttempt(algebraTopics[topicIndex].name, levels[levelSelect.selectedIndex], firstTry, questionSet().length);
  }
  renderQuestion();
  if (questionIndex < questionSet().length) get("choices").querySelector("input").focus();
});
levelSelect.addEventListener("change", restart);
get("restart").addEventListener("click", restart);
get("advance").addEventListener("click", () => {
  levelSelect.selectedIndex++;
  restart();
  levelSelect.focus();
});
selectTopic(0);
