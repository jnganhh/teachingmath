"use strict";

const mathNamespace = "http://www.w3.org/1998/Math/MathML";
const superscriptDigits = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const operators = "+−-±=≠≈×·÷,()°?";
const mathToken = /\d+(?:\.\d+)?|[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+|[A-Za-z]+|[θΔ√^/]|[+−±=≠≈×·÷,()°?-]|[^\S\n]+|./gu;
const identifier = /^(?:[xyzabckmvshtwrnpθΔABC]|AB|AC|BC|kx|xy|ab|ac|ax|bx|sin|cos|tan)$/;
const propertyName = /^(?:sin|cos|tan)$/;

function mathNode(tag, value) {
  const node = document.createElementNS(mathNamespace, tag);
  if (typeof value === "string") node.textContent = value;
  else if (value) node.append(...value);
  return node;
}

function toMathRow(parts) {
  return mathNode("mrow", parts);
}

function inFraction(part) {
  return part.group ?? part.node;
}

function stackFractions(parts) {
  const nodes = [];
  let term = [];
  function appendTerm() {
    const slash = term.findIndex((part) => part.token === "/");
    if (slash > 0 && slash < term.length - 1 && !term.slice(slash + 1).some((part) => part.token === "/")) {
      nodes.push(mathNode("mfrac", [
        toMathRow(term.slice(0, slash).map(inFraction)),
        toMathRow(term.slice(slash + 1).map(inFraction))
      ]));
    } else {
      nodes.push(...term.map((part) => part.node));
    }
    term = [];
  }

  for (const part of parts) {
    if (/^[=≠≈+,×·÷±]$/.test(part.token) || (/^[−-]$/.test(part.token) && term.length && term.at(-1).token !== "/")) {
      appendTerm();
      nodes.push(part.node);
    } else {
      term.push(part);
    }
  }
  appendTerm();
  return toMathRow(nodes);
}

function parseMath(tokens) {
  tokens = tokens.flatMap((token) => /^(?:kx|xy|ab|ac|ax|bx)$/.test(token) ? Array.from(token) : [token]);
  let index = 0;

  function readRow(inGroup = false) {
    const parts = [];
    while (index < tokens.length && !(inGroup && tokens[index] === ")")) {
      parts.push(readPower());
    }
    return stackFractions(parts);
  }

  function readAtom() {
    const token = tokens[index++];
    if (token === "(") {
      const group = readRow(true);
      if (tokens[index] === ")") {
        index++;
        return {node:toMathRow([mathNode("mo", "("), group, mathNode("mo", ")")]), group};
      }
      return {node:toMathRow([mathNode("mo", "("), group])};
    }
    if (token === "√" && index < tokens.length) {
      return {node:mathNode("msqrt", [inFraction(readPower())])};
    }
    if (/^\d/.test(token)) return {node:mathNode("mn", token)};
    if (identifier.test(token)) {
      const chars = propertyName.test(token) ? [token] : Array.from(token);
      const symbols = chars.map((char) => mathNode("mi", char));
      return {node:symbols.length === 1 ? symbols[0] : toMathRow(symbols)};
    }
    return {node:mathNode("mo", token === "-" ? "−" : token), token};
  }

  function readPower() {
    const base = readAtom();
    const suffix = tokens[index];
    let exponent;
    if (suffix && /^[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+$/.test(suffix)) {
      index++;
      const chars = Array.from(suffix, (char) => {
        const digit = superscriptDigits.indexOf(char);
        return digit >= 0 ? mathNode("mn", String(digit)) : mathNode("mo", char === "⁻" ? "−" : "+");
      });
      exponent = toMathRow(chars);
    } else if (suffix === "^" && index + 1 < tokens.length) {
      index++;
      exponent = inFraction(readAtom());
    }
    return exponent ? {node:mathNode("msup", [base.node, exponent])} : base;
  }

  return readRow();
}

function appendMathLine(parent, line) {
  const tokens = line.match(mathToken) ?? [];
  let run = [];

  function flush() {
    const raw = run.join("");
    const trimmed = raw.trim();
    let expression = trimmed;
    if (expression.endsWith(",")) expression = expression.slice(0, -1).trimEnd();
    const isMath = /[=≠≈×÷·√^/°⁰¹²³⁴⁵⁶⁷⁸⁹]|\d[xyzabckmvshtwrnp]|\([−-]?\d+\s*,|[+−-]\s*\d|\b(?:sin|cos|tan)\b/.test(expression);
    if (isMath && /[\dA-Za-zθ]/.test(expression)) {
      const start = raw.indexOf(expression);
      const math = mathNode("math");
      math.append(parseMath((expression.match(mathToken) ?? []).filter((token) => token.trim())));
      parent.append(raw.slice(0, start), math, raw.slice(start + expression.length));
    } else {
      parent.append(raw);
    }
    run = [];
  }

  for (const token of tokens) {
    const allowed = !token.trim() || /^\d/.test(token) || identifier.test(token) ||
      /^[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+$/.test(token) || operators.includes(token) || "√^/".includes(token);
    if (allowed) run.push(token);
    else {
      flush();
      parent.append(token);
    }
  }
  flush();
}

function setPracticeMath(target, value) {
  target.replaceChildren();
  for (const [index, line] of value.split("\n").entries()) {
    if (index) target.append(document.createElement("br"));
    appendMathLine(target, line);
  }
}
