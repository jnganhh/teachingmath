export const card = (value, reason) => ({ value, reason });
export const set = (title, cards, prompt = '') => ({ title, cards, prompt });

export const table = (row1, row2) => ({ kind: 'table', rows: [row1, row2] });

export const graph = (fn, x, y, description, options = {}) => ({
  kind: 'graph', fn, x, y, description, ...options
});

export const minus = value => String(value).replaceAll('-', '−');
export const offset = value => value === 0 ? '' : ` ${value < 0 ? '−' : '+'} ${Math.abs(value)}`;
export const shift = (variable, amount) => `${variable}${offset(-amount)}`;
export const factor = (amount, variable = 'x') => amount === 0 ? variable : `(${shift(variable, amount)})`;
export const signed = (coefficient, expression) => {
  if (coefficient === 1) return expression;
  if (coefficient === -1) return `−${expression}`;
  return `${minus(coefficient)}${expression}`;
};
export const power = (base, exponent) => {
  const superscripts = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
  return `${base}${[...String(exponent)].map(digit => superscripts[digit]).join('')}`;
};
export const log = (base, expression) => {
  const subscripts = '₀₁₂₃₄₅₆₇₈₉';
  const label = [...String(base)].map(digit => subscripts[digit]).join('');
  return `log${label}(${expression})`;
};
export const sqrt = expression => `√(${expression})`;
export const num = value => minus(Number(value.toFixed(3)));
export const point = (x, y) => `(${num(x)}, ${num(y)})`;
export const money = value => `$${value.toLocaleString('en-CA', { maximumFractionDigits: 2 })}`;
export const interval = (a, b, left = false, right = false) =>
  `${left ? '[' : '('}${minus(a)}, ${minus(b)}${right ? ']' : ')'}`;

export function buildBank(strands) {
  return strands.map(([name, groups]) => ({
    name,
    groups: groups.map(([code, title, patterns]) => ({
      code, title,
      sets: [1, 2, 3, 4, 5].flatMap(n => patterns.map(pattern => pattern(n)))
    }))
  }));
}
