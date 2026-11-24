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
let recorded = false;
let reviewQuestions = [];
let setVariant = null;
let activeQuestions;

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
  return activeQuestions;
}

function setReveal(name, visible) {
  get(name).hidden = !visible;
  get(name + "-button").setAttribute("aria-expanded", String(visible));
}

function updateSetProgress() {
  const total = questionSet().length;
  const reviewed = Math.min(total, questionIndex + Number(finishedQuestion || revealed));
  get("progress").textContent = questionIndex === total
    ? `${total} questions reviewed`
    : `Question ${questionIndex + 1} of ${total} · ${reviewed} reviewed`;
  const meter = get("progress-meter");
  meter.max = total;
  meter.value = reviewed;
  return reviewed;
}

function saveCurrentSet() {
  const {name} = algebraTopics[topicIndex];
  const level = levels[levelSelect.selectedIndex];
  const total = questionSet().length;
  const reviewed = updateSetProgress();
  if (reviewed === total && !recorded) {
    recordAlgebraAttempt(name, level, firstTry, total);
    recorded = true;
  }
  activeAlgebraSet = {topic:name, level};
  algebraDrafts[algebraSetKey(name, level)] = {
    total, questionIndex, firstTry, attempted, finishedQuestion, revealed, recorded, reviewed, reviewQuestions, setVariant
  };
  saveAlgebraProgress();
  renderAlgebraProgress();
}

function clearQuestionState() {
  attempted = false;
  revealed = false;
  finishedQuestion = false;
}

function renderSetReview(questions) {
  const target = get("review-questions");
  target.replaceChildren();
  get("set-review").hidden = reviewQuestions.length === 0;
  for (const index of reviewQuestions) {
    const question = questions[index];
    if (!question) continue;
    const card = element("article");
    card.className = "review-question";
    const math = element("p");
    setPracticeMath(math, question.math);
    math.className = "review-math";
    const details = element("details");
    const solution = element("p");
    setPracticeMath(solution, question.solution);
    details.append(element("summary", "Show solution"), solution);
    const figure = element("figure");
    figure.className = "math-figure";
    renderPracticeFigure(figure, algebraTopics[topicIndex].name, question.diagram,
      `${question.math} ${question.prompt}`);
    const heading = element("h5");
    heading.append(`Question ${index + 1} · `);
    const prompt = element("span");
    setPracticeMath(prompt, question.prompt);
    heading.append(prompt);
    card.append(heading, math, figure, details);
    target.append(card);
  }
}

function flagForReview() {
  if (!reviewQuestions.includes(questionIndex)) reviewQuestions.push(questionIndex);
}

function renderQuestion() {
  const questions = questionSet();
  const complete = questionIndex === questions.length;
  get("question-area").hidden = complete;
  get("complete").hidden = !complete;
  updateSetProgress();
  if (complete) {
    get("result").textContent = `${firstTry} of ${questions.length} correct on the first attempt before viewing the solution.`;
    renderSetReview(questions);
    get("advance").hidden = levelSelect.selectedIndex === levels.length - 1;
    get("complete-title").focus();
    return;
  }

  const question = questions[questionIndex];
  setPracticeMath(get("prompt"), question.prompt);
  setPracticeMath(get("math"), question.math);
  renderPracticeFigure(get("question-figure"), algebraTopics[topicIndex].name, question.diagram,
    `${question.math} ${question.prompt}`);
  setPracticeMath(get("hint"), question.hint);
  setPracticeMath(get("solution"), question.solution);
  get("feedback").dataset.kind = "success";
  setPracticeMath(get("feedback"), finishedQuestion ? "Correct. " + question.solution : "");
  setReveal("hint", false);
  setReveal("solution", revealed && !finishedQuestion);
  get("next").hidden = !(finishedQuestion || revealed);
  get("next").textContent = questionIndex + 1 === questions.length ? "See results" : "Next question";
  get("check").disabled = finishedQuestion;
  currentOptions = shuffle([[question.correct, ""], ...question.distractors]);
  get("choices").replaceChildren(...currentOptions.map(([answer], index) => {
    const label = element("label");
    label.className = "choice";
    const radio = element("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = String(index);
    radio.required = true;
    radio.disabled = finishedQuestion;
    radio.checked = finishedQuestion && answer === question.correct;
    radio.setAttribute("aria-label", answer);
    const display = element("span");
    setPracticeMath(display, answer);
    label.append(radio, display);
    return label;
  }));
}

function selectQuestionSet(variant) {
  setVariant = variant;
  activeQuestions = buildPracticeSet(algebraTopics[topicIndex], levelSelect.selectedIndex, variant);
}

function restart() {
  const topic = algebraTopics[topicIndex].name;
  const level = levels[levelSelect.selectedIndex];
  const previous = algebraDrafts[algebraSetKey(topic, level)]?.setVariant;
  selectQuestionSet(nextPracticeVariant(isPracticeVariant(previous) ? previous : null));
  questionIndex = 0;
  firstTry = 0;
  recorded = false;
  reviewQuestions = [];
  clearQuestionState();
  renderQuestion();
  saveCurrentSet();
}

function resume() {
  const {name} = algebraTopics[topicIndex];
  const draft = algebraDrafts[algebraSetKey(name, levels[levelSelect.selectedIndex])];
  selectQuestionSet(isPracticeVariant(draft?.setVariant) ? draft.setVariant : null);
  if (draft?.total !== questionSet().length || !Number.isInteger(draft.questionIndex) ||
      draft.questionIndex < 0 || draft.questionIndex > draft.total) {
    restart();
    return;
  }
  ({questionIndex, firstTry, attempted, finishedQuestion, revealed, recorded} = draft);
  reviewQuestions = Array.isArray(draft.reviewQuestions) ? draft.reviewQuestions : [];
  renderQuestion();
  saveCurrentSet();
}

function selectTopic(index, levelIndex = 0) {
  topicIndex = index;
  levelSelect.selectedIndex = levelIndex;
  const {name, example, exampleDiagram} = algebraTopics[index];
  const [math, steps, tip] = example;
  get("topic-title").textContent = name;
  setPracticeMath(get("example-math"), math);
  renderPracticeFigure(get("example-figure"), name, exampleDiagram, math);
  get("example-steps").replaceChildren(...steps.map((step) => {
    const line = element("li");
    setPracticeMath(line, step);
    return line;
  }));
  setPracticeMath(get("tip"), tip);
  for (const [i, button] of Array.from(get("topics").children).entries()) {
    if (i === index) button.setAttribute("aria-current", "true");
    else button.removeAttribute("aria-current");
  }
  resume();
}

const topicDetails = {
  Identities: ["(a + b)²", "Expand and simplify"],
  Factoring: ["(x + a)(x + b)", "Write expressions as products"],
  "Linear systems": ["(x, y)", "Find where two lines meet"],
  Trigonometry: ["sin θ", "Solve right triangles"],
  "Analytic geometry": ["Δy / Δx", "Slope, distance, and midpoint"],
  "Exponent laws": ["xᵃ · xᵇ", "Simplify powers"],
  "Linear equations": ["x = ?", "Find the unknown"],
  "Quadratic equations": ["ax² = ?", "Solve and interpret roots"]
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
  const progress = element("span");
  progress.className = "topic-completion";
  progress.dataset.topic = name;
  button.append(motif, element("strong", name), detail, progress);
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
    setPracticeMath(feedback, reasoning + " Try again.");
    attempted = true;
    flagForReview();
    saveCurrentSet();
    return;
  }
  if (!attempted && !revealed) firstTry++;
  finishedQuestion = true;
  feedback.dataset.kind = "success";
  setPracticeMath(feedback, "Correct. " + questionSet()[questionIndex].solution);
  get("check").disabled = true;
  for (const radio of get("choices").querySelectorAll("input")) radio.disabled = true;
  get("next").hidden = false;
  saveCurrentSet();
});

get("hint-button").addEventListener("click", () => setReveal("hint", get("hint").hidden));
get("solution-button").addEventListener("click", () => {
  if (get("solution").hidden && !finishedQuestion) {
    revealed = true;
    flagForReview();
    get("next").hidden = false;
    saveCurrentSet();
  }
  setReveal("solution", get("solution").hidden);
});
get("next").addEventListener("click", () => {
  questionIndex++;
  clearQuestionState();
  renderQuestion();
  saveCurrentSet();
  if (questionIndex < questionSet().length) get("choices").querySelector("input").focus();
});
levelSelect.addEventListener("change", resume);
get("restart").addEventListener("click", restart);
get("advance").addEventListener("click", () => {
  levelSelect.selectedIndex++;
  resume();
  levelSelect.focus();
});
const savedTopic = algebraTopics.findIndex(({name}) => name === activeAlgebraSet?.topic);
const savedLevel = levels.indexOf(activeAlgebraSet?.level);
selectTopic(Math.max(savedTopic, 0), Math.max(savedLevel, 0));
