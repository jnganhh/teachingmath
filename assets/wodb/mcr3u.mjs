import { buildBank, card as c, set as w, table, graph, factor as f, shift as s,
  offset as o, signed as m, power as p, sqrt as q, point, money } from './sets.mjs';

const characteristics = [
  ['A1', 'Representations, inverses and transformations', [
    n => w('Lines and their inverses', [
      c(`y = x${o(n)}`, 'It is the only translation upward.'),
      c(`y = ${n + 1}x`, 'It is the only line that is steeper than y = x.'),
      c(`y = −x${o(n)}`, 'It is the only decreasing function. Its inverse is itself.'),
      c(`y = x${o(-n)}`, 'It is the only translation downward. It undoes the upward translation.')
    ]),
    n => w('Relations and the vertical line test', [
      c(table(['x', n, n, n + 1], ['y', 0, 1, 1]), 'It gives two different outputs for one input.'),
      c(table(['x', n, n + 1, n + 2], ['y', 0, 0, 1]), 'It is the only table with a repeated output among the functions.'),
      c(table(['x', n, n + 1, n + 2], ['y', 2, 1, 0]), 'It is the only table whose outputs strictly decrease.'),
      c(table(['x', n, n + 1, n + 2], ['y', 0, 1, 2]), 'It is the only table whose outputs strictly increase.')
    ]),
    n => w('Graphs and inverse relations', [
      c(graph(x => x + n, [-6, 6], [-6, 6], `Line through (0, ${n}) with slope 1.`), 'It is the only straight line.'),
      c(graph(x => x * x - n, [-6, 6], [-6, 6], `Parabola opening up from (0, −${n}).`), 'Its inverse fails the vertical line test when the whole parabola is used.'),
      c(graph(x => Math.sqrt(x) + n, [-6, 6], [-6, 6], `Square-root curve rising from (0, ${n}) to the right.`), 'Its domain has the finite left endpoint x = 0.'),
      c(graph(x => (n + 1) / x, [-6, 6], [-6, 6], 'Two reciprocal branches in quadrants I and III.', { breaks: [0] }), 'Its domain excludes just one x-value.')
    ]),
    n => w('Transformations of the square-root parent', [
      c(`y = ${q(s('x', n))}`, `Only this graph starts to the right of the y-axis, at x = ${n}.`),
      c(`y = ${q(s('x', -n))}`, `Only this graph starts to the left of the y-axis, at x = −${n}.`),
      c(`y = −${q('x')}`, 'Only this graph extends downward from the origin.'),
      c(`y = ${q('−x')}`, 'Only this graph extends leftward from the origin.')
    ]),
    n => w('Absolute value transformations', [
      c(`y = |x|${o(n)}`, `It alone has a minimum of ${n}.`),
      c(`y = |${s('x', n)}|`, 'It alone has a vertex to the right of the y-axis.'),
      c(`y = −|x|`, 'It alone has a maximum.'),
      c(`y = ${n + 1}|x|`, 'It alone is a vertical stretch of the parent.')
    ]),
    n => w('When is the inverse a function?', [
      c(`y = x²${o(n)}, x ∈ ℝ`, 'It is the only relation whose inverse fails the vertical line test.'),
      c(`y = x²${o(n)}, x ≥ 0`, 'It is the only equation here that states a restriction on x explicitly.'),
      c(`y = x³${o(n)}`, 'It is the only function whose graph has both domain and range ℝ.'),
      c(`y = ${q(s('x', -n))}`, 'It is the only formula with a radical and the only one naturally defined on x ≥ −' + n + '.')
    ]),
    n => w('Translations and stretches of a parabola', [
      c(`y = ${f(n)}²`, 'It is the only upward-opening parabola with its vertex off the y-axis.'),
      c(`y = x²${o(n)}`, 'It is the only graph with no x-intercepts.'),
      c(`y = −x²`, 'It is the only graph whose range is bounded above.'),
      c(`y = ${n + 1}x²`, 'It is the only graph that is a vertical stretch of y = x².')
    ])
  ]],
  ['A2', 'Quadratic zeros, extrema and applications', [
    n => w('Quadratic zeros and vertices', [
      c(`y = x²${o(n * n)}`, 'Its graph never touches the x-axis.'),
      c(`y = x²${o(-n * n)}`, 'Its two distinct zeros lie on opposite sides of the y-axis.'),
      c(`y = ${f(n)}²`, 'It has a double zero.'),
      c(`y = −${f(n)}²${o(n * n)}`, 'It is the only parabola with a maximum.')
    ]),
    n => w('Four forms of quadratic information', [
      c(`y = ${f(n)}${f(-n)}`, 'It is the only equation given in factored form.'),
      c(`y = ${f(n)}²${o(-1)}`, 'It is the only equation that shows a horizontal shift inside a squared binomial.'),
      c(`y = x²${o(-(n * n + 1))}`, 'It is the only equation here with non-integer real zeros.'),
      c(table(['x', n - 1, n, n + 1], ['y', -1, 0, -1]), 'It is the only representation that shows a maximum; the tabulated points determine a downward-opening quadratic.')
    ]),
    n => w('Projectile heights', [
      c(`h(t) = −5t(t − ${2 * n})`, 'Only this model starts at ground level.'),
      c(`h(t) = −5${f(n, 't')}²${o(60 * n * n)}`, 'Its maximum height is the largest of the four.'),
      c(`h(t) = −5t²${o(9 * n * n)}`, 'Its maximum occurs at launch.'),
      c(`h(t) = −5${f(n + 1, 't')}²${o(5 * (n + 2) ** 2)}`, 'Its maximum occurs strictly later than all the others.')
    ], 'Height h is measured in metres, t is time in seconds and the ground is h = 0.'),
    n => w('Number of intersections with y = 0', [
      c(`y = ${f(n)}²${o(n)}`, 'It is the only function with no real zero.'),
      c(`y = −${f(n)}²`, 'It is the only function tangent to the x-axis.'),
      c(`y = x²${o(-n * n)}`, 'Its two zeros are opposite numbers.'),
      c(`y = ${f(n)}${f(2 * n)}`, 'Its two distinct zeros are both positive.')
    ]),
    n => w('Rectangular areas with fixed perimeter', [
      c(`A(x) = x(${12 * n} − x)`, `Its maximum occurs at width ${6 * n}, the largest maximizing width here.`),
      c(`A(x) = x(${8 * n} − x)`, `At width ${8 * n}, only this model gives a degenerate rectangle of zero area.`),
      c(`A(x) = x(${10 * n} − x)`, `Only this model has maximum area ${25 * n * n}.`),
      c(`A(x) = x(${6 * n} − x)`, 'It is the only model whose feasible positive widths are all less than ' + (7 * n) + '.')
    ], 'Here x is the width and both side lengths must be positive.'),
    n => w('The discriminant and real zeros', [
      c(`x²${o(-2 * n)}x${o(n * n)} = 0`, 'Its discriminant is zero.'),
      c(`x²${o(-2 * n)}x${o(n * n + 1)} = 0`, 'Its discriminant is negative.'),
      c(`x²${o(-2 * n)}x${o(n * n - 1)} = 0`, 'Its discriminant is 4 and the midpoint of the roots is positive.'),
      c(`x²${o(2 * n)}x${o(n * n - 1)} = 0`, 'Its axis of symmetry is at a negative x-value.')
    ]),
    n => w('A line meeting a parabola', [
      c(`y = ${n + 1}`, 'It crosses the parabola at two points with opposite x-coordinates.'),
      c(`y = ${n}`, 'It is tangent to the parabola.'),
      c(`y = ${n - 1}`, 'It never meets the parabola.'),
      c(`y = 2x${o(n)}`, 'It is the only sloping line and meets the parabola at x = 0 and x = 2.')
    ], `Compare where each line meets y = x²${o(n)}.`)
  ]],
  ['A3', 'Equivalent polynomial, radical and rational expressions', [
    n => w('Equivalent forms of a square', [
      c(`${f(-n)}²`, 'It is the only expression written as a square.'),
      c(`x² + ${2 * n}x${o(n * n)}`, 'It is the only expanded trinomial.'),
      c(`${f(-n)}${f(n)}`, 'It is the only expression that simplifies to a difference of squares.'),
      c(`x${f(-n)} + ${m(n, f(-n))}`, 'It is the only sum with the same binomial as a factor in both terms.')
    ]),
    n => w('Simplifying radicals', [
      c(q(18 * n * n), `It is a single radical that simplifies to ${3 * n}√2.`),
      c(`${q(8 * n * n)} + ${q(2 * n * n)}`, 'It is the only sum whose two terms become like radicals.'),
      c(`${q(8 * n * n)} − ${q(2 * n * n)}`, 'It is the only difference and simplifies to ' + n + '√2.'),
      c(`${q(9 * n * n)} · √2`, 'It is the only product of two radicals.')
    ]),
    n => w('Restrictions after cancellation', [
      c(`${f(n)}${f(-n)} / ${f(n)}`, `It simplifies to x + ${n} with x = ${n} excluded.`),
      c(`${f(n)}${f(-n)} / ${f(-n)}`, `It simplifies to x − ${n} with x = −${n} excluded.`),
      c(`(${s('x', -n)})`, 'It is the only expression defined for every real x.'),
      c(`(x²${o(n * n)}) / ${f(n)}`, 'Its denominator cannot be cancelled because its numerator has no real zeros.')
    ]),
    n => w('Spot the hidden structure', [
      c(`x² − ${n * n}`, 'Only this expression has a negative constant term.'),
      c(`x² + ${2 * n}x + ${n * n}`, 'Only this expression has a double zero.'),
      c(`x² + ${n}x`, 'Only this expression has a common factor of x.'),
      c(`x² + ${n * n}`, 'Only this expression has no real linear factors.')
    ]),
    n => w('Adding and subtracting rational expressions', [
      c(`1/${f(n)} + 1/${f(n)}`, 'Only this expression simplifies to twice its first term.'),
      c(`1/${f(n)} − 1/${f(n)}`, 'Only this expression equals zero wherever it is defined.'),
      c(`1/${f(n)} + 1/${f(-n)}`, 'It is the only expression with two excluded inputs.'),
      c(`1/${f(n)} + ${n}`, 'It is the only expression that adds a nonzero constant.')
    ]),
    n => w('Multiplying and dividing rational expressions', [
      c(`${f(n)}/${f(-n)} · ${f(-n)}/${f(n)}`, 'It equals 1 everywhere in its domain.'),
      c(`${f(n)}/${f(-n)} ÷ ${f(n)}`, `Its numerator cancels and it becomes 1/${f(-n)}.`),
      c(`${f(n)}/${f(-n)} · ${f(-n)}`, `Its denominator cancels and it becomes x − ${n}.`),
      c(`${f(n)}/${f(-n)} ÷ ${f(-n)}`, 'Its simplified denominator has a square.')
    ]),
    n => w('Square roots, signs and equivalence', [
      c(q(p(f(n), 2)), 'It is always nonnegative and equals the distance from x to ' + n + '.'),
      c(s('x', n), 'It alone is linear and increasing.'),
      c(`−${f(n)}`, 'It alone is linear and decreasing.'),
      c(`${f(n)}²`, 'It alone is a quadratic.')
    ], 'Compare the expressions over all real x.')
  ]]
];

const exponential = [
  ['B1', 'Rational exponents, exponent laws and properties', [
    n => { const a = n + 1; return w('Four ways to read a power', [
      c(`${a ** 2}¹⁄²`, 'It is the only square root expressed as a fractional power.'),
      c(`∛(${a ** 3})`, 'It is the only expression written with a cube-root symbol.'),
      c(`${a}⁻¹`, 'It is the only expression whose value is below 1.'),
      c(`(${a}⁴)¹⁄⁴`, 'It is the only expression that takes a fourth root of a fourth power.')
    ]); },
    n => w('Exponent laws with positive variables', [
      c(`x${p('', n + 1)} · x¹⁄²`, 'Its exponent increases by one-half when simplified.'),
      c(`x${p('', n + 1)} ÷ x¹⁄²`, 'Its exponent decreases by one-half when simplified.'),
      c(`(x${p('', 2 * n + 2)})¹⁄²`, 'Its simplified exponent is a positive integer.'),
      c(`x⁻¹⁄²`, 'Its result lies strictly between 0 and 1 when x > 1.')
    ], 'Use x > 1 to compare the expressions.'),
    n => w('Growth, decay and reflection', [
      c(`y = ${n + 1}ˣ`, 'It increases and takes every positive value.'),
      c(`y = (1/${n + 1})ˣ`, 'It decreases and stays strictly above y = 0.'),
      c(`y = −${n + 1}ˣ`, 'It decreases and stays strictly below y = 0.'),
      c(`y = ${n + 1}ˣ + 1`, 'Its horizontal asymptote is y = 1.')
    ]),
    n => { const a = n + 1; return w('Negative and rational powers', [
      c(`(${a * a})⁻¹⁄²`, 'It takes the reciprocal of a square root.'),
      c(`(1/${a})¹`, 'It is a first power.'),
      c(`(${a ** 3})¹⁄³`, 'It is the only expression greater than 1.'),
      c(`(1/${a * a})¹⁄²`, 'It is the only square root with a fractional base.')
    ]); },
    n => w('Find the constant ratio', [
      c(table(['x', 0, 1, 2], ['y', n, 2 * n, 4 * n]), 'Its ratio between consecutive outputs is 2.'),
      c(table(['x', 0, 1, 2], ['y', n, 3 * n, 9 * n]), 'Its outputs triple at each step.'),
      c(table(['x', 0, 1, 2], ['y', 4 * n, 2 * n, n]), 'Its positive outputs decrease at each step.'),
      c(table(['x', 0, 1, 2], ['y', n, 2 * n, 3 * n]), 'It has constant first differences and no constant ratio.')
    ]),
    n => w('Exponent rules in numerical expressions', [
      c(`${n + 1}² · ${n + 1}³`, 'It adds exponents to obtain a fifth power.'),
      c(`(${n + 1}²)³`, 'It multiplies exponents to obtain a sixth power.'),
      c(`${n + 1}³ ÷ ${n + 1}²`, 'It subtracts exponents to obtain a first power.'),
      c(`(${n + 1}/${n + 2})²`, 'Its value is strictly between 0 and 1.')
    ]),
    n => { const a = n + 1; return w('Where is the negative sign?', [
      c(`(−${a})²`, 'It is the only positive result.'),
      c(`−${a}²`, 'The minus is applied after squaring.'),
      c(`(−${a})³`, 'It is the only negative result with magnitude greater than the square of the base.'),
      c(`(−${a})⁻¹`, 'It is the only negative result between −1 and 0.')
    ]); }
  ]],
  ['B2', 'Tables, graphs and equations of exponential functions', [
    n => w('Read the shape of an exponential graph', [
      c(graph(x => n * 2 ** x, [-3, 3], [-8, 12], `Increasing exponential with y-intercept ${n} and asymptote y = 0.`), 'It increases, stays positive and approaches the x-axis on the left.'),
      c(graph(x => n * 2 ** -x, [-3, 3], [-8, 12], `Decreasing exponential with y-intercept ${n} and asymptote y = 0.`), 'It has positive values and decreases as x increases.'),
      c(graph(x => -n * 2 ** x, [-3, 3], [-8, 12], `Decreasing exponential with y-intercept −${n} and asymptote y = 0.`), 'It is the only curve entirely below the x-axis.'),
      c(graph(x => n * 2 ** x + 2, [-3, 3], [-8, 12], `Increasing exponential with y-intercept ${n + 2} and asymptote y = 2.`), 'It approaches a horizontal line above the x-axis.')
    ]),
    n => w('Match a table to an equation', [
      c(table(['x', -1, 0, 1], ['y', n, 2 * n, 4 * n]), 'It is the only numerical table, and its outputs double at each step.'),
      c(`y = ${2 * n} · 2ˣ`, 'It is the only equation that exactly matches the table.'),
      c(`y = ${2 * n} · (1/2)ˣ`, 'It is the only model that halves with each step to the right.'),
      c(`y = ${n} · 2ˣ`, 'It is the only model with y-intercept ' + n + '.')
    ]),
    n => w('Exponential parent transformations', [
      c(`y = 2ˣ${o(n)}`, 'Only this graph has an asymptote above the x-axis.'),
      c(`y = 2ˣ${o(-n)}`, 'Only this graph has a negative horizontal asymptote.'),
      c(`y = 2^(${s('x', n)})`, 'Only this graph shifts right by ' + n + ' and has y-intercept below 1 but above 0.'),
      c(`y = 2^(${s('x', -n)})`, 'Only this graph shifts left by ' + n + ' and has the largest y-intercept.')
    ]),
    n => w('Same intercept, different change', [
      c(`y = ${n} · 2ˣ`, 'Only this function doubles its positive output at each unit step.'),
      c(`y = ${n} · 3ˣ`, 'Only this function triples its positive output at each unit step.'),
      c(`y = ${n} · (1/2)ˣ`, 'Only this function decreases.'),
      c(`y = ${n} + x`, 'Only this function has a constant first difference.')
    ]),
    n => w('Unequal input steps', [
      c(table(['x', 0, 2, 4], ['y', n, 4 * n, 16 * n]), 'Its output quadruples every two units of x.'),
      c(table(['x', 0, 1, 3], ['y', n, 2 * n, 8 * n]), 'It is the only table with unequal input spacing. The output still doubles per unit of x.'),
      c(table(['x', 0, 1, 2], ['y', n, 4 * n, 16 * n]), 'Its output quadruples in just one unit of x.'),
      c(table(['x', 0, 1, 2], ['y', 4 * n, 2 * n, n]), 'It is the only table for exponential decay.')
    ]),
    n => w('Equivalent exponential forms', [
      c(`y = 2^(${s('x', -n)})`, 'It expresses the left shift inside the exponent.'),
      c(`y = ${2 ** n} · 2ˣ`, 'It expresses the same graph as a vertical stretch.'),
      c(`y = 2ˣ + ${2 ** n}`, 'Only this graph has positive horizontal asymptote.'),
      c(`y = ${2 ** (n + 1)} · 2ˣ`, 'Only this graph is exactly twice the height of the first two forms at every x.')
    ]),
    n => w('Read an exponential from three points', [
      c(table(['x', 0, 1, 2], ['y', n, 2 * n, 4 * n]), 'It is the only table. It shows increasing exponential growth.'),
      c(`Graph through ${point(0, n)}, ${point(1, 2 * n)}, ${point(2, 4 * n)} with asymptote y = 0`, 'It is the only description that specifies the horizontal asymptote directly.'),
      c(`y = ${n} · (1/2)ˣ`, 'Only this rule reaches half its starting value at x = 1.'),
      c(`y = ${n} · 2ˣ`, 'It is the only rule that yields the values of the table.')
    ])
  ]],
  ['B3', 'Exponential modelling and applications', [
    n => w('A culture starts with the same number of cells', [
      c(`N(t) = ${100 * n} · 2ᵗ`, 'It doubles in one hour.'),
      c(`N(t) = ${100 * n} · 2^(t/2)`, 'It doubles in two hours.'),
      c(`N(t) = ${100 * n} · (1/2)ᵗ`, 'It halves in one hour.'),
      c(`N(t) = ${100 * n}(1 + t)`, 'It adds the same number of cells each hour.')
    ], 'Compare the models for elapsed time t ≥ 0 in hours.'),
    n => w('Cooling toward room temperature', [
      c(`T(t) = ${15 + n} + 60(1/2)^(t/5)`, 'Only this liquid has a five-minute half-life for its excess temperature.'),
      c(`T(t) = ${15 + n} + 60(1/2)^(t/10)`, 'Only this liquid has a ten-minute half-life for its excess temperature.'),
      c(`T(t) = ${15 + n} + 60(1/2)^(t/20)`, 'Only this liquid has a twenty-minute half-life for its excess temperature.'),
      c(`T(t) = ${16 + n} + 60(1/2)^(t/10)`, 'Only this liquid approaches a different room temperature.')
    ], 'Temperatures are in °C and t is in minutes.'),
    n => w('Model the sales of four clubs', [
      c(`Begins with ${100 * n} sales and gains 10% each month`, 'Only this club multiplies by 1.10 every month.'),
      c(`Begins with ${100 * n} sales and gains 10 sales each month`, 'Only this club adds a fixed amount.'),
      c(`Begins with ${100 * n} sales and loses 10% each month`, 'Only this club has declining monthly sales.'),
      c(`Begins with ${200 * n} sales and gains 10% each month`, 'Only this club has twice the starting value of each other model.')
    ], 'Treat counts as model estimates.'),
    n => w('Bouncing ball data', [
      c(table(['bounce', 0, 1, 2], ['cm', 80 * n, 40 * n, 20 * n]), 'It loses half its previous height per bounce.'),
      c(table(['bounce', 0, 1, 2], ['cm', 80 * n, 60 * n, 45 * n]), 'It retains three quarters of its previous height.'),
      c(table(['bounce', 0, 1, 2], ['cm', 80 * n, 60 * n, 40 * n]), 'It falls by the same number of centimetres each bounce.'),
      c(table(['bounce', 0, 1, 2], ['cm', 80 * n, 80 * n, 80 * n]), 'The height stays constant across the listed bounces.')
    ]),
    n => w('Changes of time unit', [
      c(`A(t) = ${40 * n} · 3ᵗ; t in hours`, 'It is the only growth model with time in hours.'),
      c(`A(t) = ${40 * n} · 3^(t/60); t in minutes`, 'It writes the one-hour tripling model in minutes.'),
      c(`A(t) = ${40 * n} · 3ᵗ; t in minutes`, 'It grows 60 times as quickly in the exponent and triples every minute.'),
      c(`A(t) = ${40 * n} · (1/3)ᵗ; t in hours`, 'Only this model shrinks with time.')
    ], 'Compare what happens after one minute and after one hour.'),
    n => w('Track when half the initial amount remains', [
      c(`M(t) = ${32 * n}(1/2)^(t/3)`, 'It reaches half the initial mass at t = 3.'),
      c(`M(t) = ${32 * n}(1/4)^(t/3)`, 'It already has a quarter of the mass at t = 3.'),
      c(`M(t) = ${32 * n}(1/2)^(t/6)`, 'It takes longest among the decaying models to reach half the initial mass.'),
      c(`M(t) = ${32 * n} · 2^(t/3)`, 'It never reaches half the initial mass for t ≥ 0.')
    ]),
    n => w('Depreciation and resale value', [
      c(`V(t) = ${money(1000 * n)} · 0.8ᵗ`, 'It loses 20% of its current value each year.'),
      c(`V(t) = ${money(1000 * n)} · 0.9ᵗ`, 'It loses 10% of its current value each year.'),
      c(`V(t) = ${money(1000 * n)} − ${money(200 * n)}t`, 'It loses a fixed amount each year and eventually reaches zero.'),
      c(`V(t) = ${money(200 * n)} + ${money(800 * n)} · 0.8ᵗ`, 'It tends toward a positive resale value.')
    ], 'Here t is the number of years after purchase.')
  ]]
];

const discrete = [
  ['C1', 'Recursive sequences and Pascal’s triangle', [
    n => w('Recursive rules and first terms', [
      c(`a₁ = ${n}, aₖ₊₁ = aₖ + 2`, 'Only this rule adds the same positive number at every step.'),
      c(`a₁ = ${n}, aₖ₊₁ = 2aₖ`, 'Only this rule doubles every time.'),
      c(`a₁ = ${n}, aₖ₊₁ = aₖ + k`, 'Only this rule adds the index of the previous term.'),
      c(`a₁ = ${n}, aₖ₊₁ = −aₖ`, 'Only this rule alternates the signs of consecutive terms.')
    ], 'In these rules k = 1, 2, 3, …'),
    n => w('Recursive patterns in term lists', [
      c(`${n}, ${n + 2}, ${n + 4}, ${n + 6}, …`, 'The displayed differences are constant and positive.'),
      c(`${n}, ${2 * n}, ${4 * n}, ${8 * n}, …`, 'The displayed terms have constant ratio 2.'),
      c(`${n}, ${n + 1}, ${n + 3}, ${n + 6}, …`, 'The displayed differences are consecutive integers 1, 2 and 3.'),
      c(`${n}, ${-n}, ${n}, ${-n}, …`, 'The displayed terms alternate between two values.')
    ]),
    n => { const k = n + 4; return w('Reading a row of Pascal’s triangle', [
      c(`Sum of all entries in row ${k}`, `It is the only total of the full row and equals ${2 ** k}.`),
      c(`Sum of entries in row ${k} at even positions`, 'It pairs with the odd-position sum; its first contribution is the leftmost 1.'),
      c(`Sum of entries in row ${k} at odd positions`, 'It pairs with the even-position sum; its first contribution is ' + k + '.'),
      c(`Sum of the two outer entries in row ${k}`, 'It is 2 in every row with two distinct outer positions.')
    ], 'Number both rows and positions starting at 0.'); },
    n => { const k = n + 4; const a = k * (k - 1) / 2; return w('Find a missing Pascal entry', [
      c(`1 + ${k}`, 'Its result is the entry directly next to an outer 1 in the next row.'),
      c(`${k} + ${a}`, 'Its result is the entry in position 2 of the next row.'),
      c(`${a} − ${k}`, 'It is the only subtraction; a missing parent can be recovered by subtracting from a child.'),
      c(`1 + 1`, 'The two summands are the endpoints of the row and are not adjacent.')
    ], `Pascal row ${k} starts 1, ${k}, ${a}, … . Count rows and positions from 0.`); },
    n => w('How many previous terms are needed?', [
      c(`a₁ = ${n}, aₖ₊₁ = aₖ`, 'It keeps the starting value forever.'),
      c(`a₁ = ${n}, aₖ₊₁ = aₖ + 3`, 'It increases by a fixed amount and needs just one initial value.'),
      c(`a₁ = ${n}, a₂ = ${n + 1}, aₖ₊₂ = aₖ₊₁ + aₖ`, 'It needs two earlier terms to get the next term.'),
      c(`aₖ = ${n} + k²`, 'It finds each term directly from its index.')
    ], 'Use positive integer indices.'),
    n => { const k = n + 3; return w('Binomial coefficients and symmetry', [
      c(`Coefficient of x in (1 + x)${p('', k)}`, `It equals ${k} and comes from choosing the x term from one factor.`),
      c(`Coefficient of x${p('', k - 1)} in (1 + x)${p('', k)}`, `It equals ${k} and comes from choosing the constant from one factor.`),
      c(`Constant term of (1 + x)${p('', k)}`, 'It is the only entry on the left edge of the Pascal row.'),
      c(`Sum of all coefficients in (1 + x)${p('', k)}`, 'It can be found by evaluating the expression at x = 1.')
    ]); },
    n => w('One rule, different domains', [
      c(`f(x) = ${n}x, x ∈ ℝ`, 'Only this representation describes the whole continuous line.'),
      c(`aₖ = ${n}k, k = 1, 2, 3, …`, 'Only this rule directly evaluates the kth term of the positive-index sequence.'),
      c(`a₁ = ${n}, aₖ₊₁ = aₖ + ${n}`, 'Only this rule uses an earlier term to get the next one.'),
      c(table(['k', 0, 1, 2], ['aₖ', 0, n, 2 * n]), 'Only this discrete representation starts its indexing at zero.')
    ])
  ]],
  ['C2', 'Arithmetic and geometric sequences and series', [
    n => w('Terms with the same beginning', [
      c(`${n}, ${2 * n}, ${3 * n}, ${4 * n}, …`, 'Each term increases by a fixed positive amount.'),
      c(`${n}, ${2 * n}, ${4 * n}, ${8 * n}, …`, 'Each term is twice the preceding term.'),
      c(`${n}, ${n / 2}, ${n / 4}, ${n / 8}, …`, 'It is the only strictly decreasing list.'),
      c(`${n}, ${-n}, ${n}, ${-n}, …`, 'It is the only sequence with a negative common ratio.')
    ]),
    n => w('Arithmetic terms and their sums', [
      c(`aₖ = ${n}k`, 'It is a term rule with a constant positive difference.'),
      c(`Sₖ = ${n}k(k + 1)/2`, 'It is the partial sum of the increasing arithmetic sequence in the set.'),
      c(`aₖ = ${n} · 2^(k − 1)`, 'It gives a geometric term directly from its index.'),
      c(`Sₖ = ${n}(2ᵏ − 1)`, 'Its first differences form a geometric sequence when the sums start at S₀ = 0.')
    ], 'Here aₖ is a term and Sₖ is a partial sum.'),
    n => w('Adding terms from opposite directions', [
      c(`${n} + ${2 * n} + ${3 * n} + ${4 * n}`, 'It is the only arithmetic series with a positive common difference.'),
      c(`${n} + ${2 * n} + ${4 * n} + ${8 * n}`, 'It is the only geometric series with common ratio greater than 1.'),
      c(`${4 * n} + ${3 * n} + ${2 * n} + ${n}`, 'It is the only arithmetic series with a negative common difference.'),
      c(`${8 * n} + ${4 * n} + ${2 * n} + ${n}`, 'It is the only geometric series with common ratio between 0 and 1.')
    ]),
    n => w('Compare the sums of four terms', [
      c(`${n} + ${n} + ${n} + ${n}`, 'All its terms are equal and nonzero.'),
      c(`${n} + ${-n} + ${n} + ${-n}`, 'Its terms cancel in pairs and its sum is zero.'),
      c(`${n} + ${2 * n} + ${3 * n} + ${4 * n}`, 'Its total is ten times its first term.'),
      c(`${n} + ${3 * n} + ${9 * n} + ${27 * n}`, 'It has the greatest sum and common ratio 3.')
    ]),
    n => w('Check for a common difference or ratio', [
      c(table(['k', 1, 2, 3], ['aₖ', n, 3 * n, 5 * n]), 'It has constant difference and changing ratio.'),
      c(table(['k', 1, 2, 3], ['aₖ', n, 3 * n, 9 * n]), 'It has constant ratio and changing difference.'),
      c(table(['k', 1, 2, 3], ['aₖ', n, n, n]), 'Its nonzero terms satisfy both tests.'),
      c(table(['k', 1, 2, 3], ['aₖ', n, 3 * n, 6 * n]), 'Its three terms satisfy neither test.')
    ]),
    n => w('Rows in a small theatre', [
      c(`First row has ${10 + n} seats; add 2 seats per row for 6 rows`, 'It has the greatest fixed increase in seats per row.'),
      c(`First row has ${10 + n} seats; add 1 seat per row for 6 rows`, 'It is the only model whose positive arithmetic difference is 1.'),
      c(`First row has ${10 + n} seats; take away 1 seat per row for 6 rows`, 'It is the only model with fewer seats in the last row than in the first.'),
      c(`First row has ${10 + n} seats; every row holds the same number; 6 rows`, 'It fits both the arithmetic and geometric term rules.')
    ], 'Compare the seat patterns and how you would find the total.'),
    n => w('A common first term, four fifth terms', [
      c(`aₖ = ${n} + 3(k − 1)`, `It is the only arithmetic sequence that rises, to ${n + 12} at k = 5.`),
      c(`aₖ = ${n} − 3(k − 1)`, 'It is the only sequence whose fifth term is negative.'),
      c(`aₖ = ${n} · 2^(k − 1)`, 'It is the only geometric sequence that rises.'),
      c(`aₖ = ${n} · (1/2)^(k − 1)`, 'It has a fifth term strictly between 0 and its first term.')
    ])
  ]],
  ['C3', 'Compound interest and ordinary annuities', [
    n => w('Interest on a single deposit', [
      c(`${money(500 * n)}(1.04)⁵`, 'It compounds once per year for five years.'),
      c(`${money(500 * n)}(1 + 0.04/12)⁶⁰`, 'It compounds monthly for five years.'),
      c(`${money(500 * n)}(1 + 0.04/4)²⁰`, 'It compounds quarterly for five years.'),
      c(`${money(500 * n)}(1 + 5 · 0.04)`, 'It pays interest only on the principal.')
    ], 'Each expression models five years at a stated annual rate of 4%.'),
    n => w('Value after three years', [
      c(`${money(100 * n)}[(1.05)² + 1.05 + 1]`, 'It represents three deposits made at year-end. The last one earns no interest by year three.'),
      c(`${money(100 * n)}[(1.05)³ + (1.05)² + 1.05]`, 'It represents three deposits made at the start of each year. All have earned interest.'),
      c(`${money(300 * n)}(1.05)³`, 'It represents one lump sum paid at the start.'),
      c(`${money(300 * n)}`, 'It represents the total paid in without any interest.')
    ]),
    n => w('Present and future values', [
      c(`${money(200 * n)}(1.03)⁴`, 'It grows a single amount through four periods.'),
      c(`${money(200 * n)}(1.03)⁻⁴`, 'It discounts a single future amount back four periods.'),
      c(`${money(200 * n)}[(1.03)³ + (1.03)² + 1.03 + 1]`, 'It accumulates four end-of-year deposits to a future value.'),
      c(`${money(200 * n)}[(1.03)⁻¹ + (1.03)⁻² + (1.03)⁻³ + (1.03)⁻⁴]`, 'It discounts four end-of-year payments to a present value.')
    ]),
    n => w('Compare savings plans', [
      c(`${money(50 * n)} each month for 12 months at 6% per year, compounded monthly`, 'Its number of compounding periods is 12 and its payment and compounding periods are equal.'),
      c(`${money(150 * n)} each quarter for 4 quarters at 6% per year, compounded quarterly`, 'It has four end-of-period payments with matching compounding periods.'),
      c(`${money(600 * n)} now at 6% per year, compounded monthly for one year`, 'All the money is deposited at time zero.'),
      c(`${money(50 * n)} each month for 12 months at 0% interest`, 'It is the only plan whose accumulated value equals the total deposited.')
    ], 'Assume recurring deposits arrive at the end of the payment period.'),
    n => w('Which annual rate is being used?', [
      c(`${money(1000 * n)}(1.06)²`, 'The 6% is applied each year to the updated balance.'),
      c(`${money(1000 * n)}(1.03)⁴`, 'It uses a 3% semi-annual rate for two years.'),
      c(`${money(1000 * n)}(1.005)²⁴`, 'It uses a 0.5% monthly rate for two years.'),
      c(`${money(1000 * n)}(1 + 2 · 0.06)`, 'It has the smallest ending value because there is no interest on interest.')
    ]),
    n => w('One payment, four times of deposit', [
      c(`${money(100 * n)}(1.02)³`, 'It is the oldest deposit and earns interest for three periods.'),
      c(`${money(100 * n)}(1.02)²`, 'It earns exactly two periods of interest.'),
      c(`${money(100 * n)}(1.02)`, 'It earns exactly one period of interest.'),
      c(`${money(100 * n)}`, 'It is the deposit just made. It has accumulated no interest.')
    ], 'Each card shows a term in the future value of the same ordinary annuity.'),
    n => w('Track a declining loan balance', [
      c(`Bₖ₊₁ = 1.01Bₖ − ${money(100 * n)}`, 'It charges one period of interest before subtracting a fixed payment.'),
      c(`Bₖ₊₁ = 1.01(Bₖ − ${money(100 * n)})`, 'It subtracts the payment before charging interest.'),
      c(`Bₖ₊₁ = Bₖ − ${money(100 * n)}`, 'It has a fixed difference and charges no interest.'),
      c('Bₖ₊₁ = 1.01Bₖ', 'It compounds without any payment.')
    ], 'Here Bₖ is the balance after k periods, before the loan is fully paid.')
  ]]
];

const ratios = (kind, quadrant, a, b) => `${kind} θ, θ in quadrant ${quadrant}, reference triangle legs ${a} and ${b}`;
const wave = (amplitude, k, phase, midline, kind = 'sin') => {
  const input = k === 1 ? s('x', phase) : m(k, f(phase));
  return `y = ${m(amplitude, kind)}(${input})${o(midline)}`;
};

const trigonometric = [
  ['D1', 'Trigonometric ratios, identities and triangle problems', [
    n => { const a = [30, 45, 60, 36, 54][n - 1]; return w('Reference angles and signs', [
      c(`sin ${a}°`, 'It is the only ratio evaluated in quadrant I.'),
      c(`sin ${180 - a}°`, 'It is positive and shares the quadrant-I sine value by symmetry across the y-axis.'),
      c(`sin ${180 + a}°`, 'Its angle is in quadrant III, where both sine and cosine are negative.'),
      c(`sin ${360 - a}°`, 'Its angle is in quadrant IV, where sine is negative and cosine is positive.')
    ]); },
    n => w('Right-triangle ratios', [
      c(ratios('sin', 'I', 3 * n, 4 * n), 'It compares the opposite leg with the hypotenuse and is positive.'),
      c(ratios('cos', 'II', 3 * n, 4 * n), 'It compares the signed horizontal component with the hypotenuse and is negative.'),
      c(ratios('tan', 'III', 3 * n, 4 * n), 'It is a ratio of two negative components and is positive.'),
      c(ratios('sin', 'IV', 3 * n, 4 * n), 'It compares the signed vertical component with the hypotenuse and is negative.')
    ], 'Each pair of leg lengths is listed in vertical, then horizontal order.'),
    n => w('Decide what the triangle data determine', [
      c(`a = ${5 * n}, b = ${8 * n}, A = 30°`, 'Two triangles fit. The given opposite side lies between the altitude and side b.'),
      c(`a = ${4 * n}, b = ${8 * n}, A = 30°`, 'Only a right triangle fits because side a equals the altitude.'),
      c(`a = ${3 * n}, b = ${8 * n}, A = 30°`, 'No triangle fits because side a is shorter than the altitude.'),
      c(`a = ${9 * n}, b = ${8 * n}, A = 30°`, 'Only one non-right triangle fits because a is greater than b.')
    ], 'Lowercase letters name sides opposite the matching uppercase angles.'),
    n => w('Choose a triangle strategy', [
      c(`Sides ${5 * n} and ${7 * n}; included angle 60°`, 'The cosine law finds the third side from two sides and their included angle.'),
      c(`Side ${5 * n} opposite 40°; another angle is 60°`, 'The sine law can be used immediately because one complete opposite pair is given.'),
      c(`Right triangle; adjacent leg ${5 * n} and angle 60°`, 'A primary ratio such as tangent can find the missing opposite leg directly.'),
      c(`Three sides ${5 * n}, ${6 * n} and ${7 * n}`, 'No angle is given; a rearranged cosine law finds one.')
    ]),
    n => w('Compare statements about sine and cosine', [
      c(`sin² θ + cos² θ = ${n / n}`, 'It is the Pythagorean identity and is valid for every angle.'),
      c(`sin(θ + ${360 * n}°) = sin θ`, 'It follows from a whole-number turn in the positive direction.'),
      c(`sin(${360 * n}° − θ) = −sin θ`, 'It follows from reflection across the horizontal axis.'),
      c(`sin(θ + ${180 * (2 * n - 1)}°) = sin θ`, 'It is false in general. An odd number of half turns reverses the sign of sine.')
    ]),
    n => w('Bearing, length and height', [
      c(`Walk ${10 * n} m due north, then ${10 * n} m due east`, 'The resultant is the hypotenuse of an isosceles right triangle.'),
      c(`Two trails of ${10 * n} m leave the same point with a 60° angle between them`, 'The triangle is equilateral; the distance between trail ends equals a trail length.'),
      c(`A ${10 * n} m ladder makes a 60° angle with level ground`, 'The given length is the hypotenuse; sine gives the vertical height.'),
      c(`A vertical pole casts a ${10 * n} m shadow at 60° solar elevation`, 'The given length is the adjacent leg; tangent gives the pole height.')
    ]),
    n => { const a = 30 + 5 * n; return w('Related sine and cosine angles', [
      c(`sin ${a}°`, 'It is the sine of the acute reference angle and is positive.'),
      c(`cos ${90 - a}°`, 'Its angle is complementary to the acute sine angle and its value equals that sine.'),
      c(`sin ${180 - a}°`, 'Its angle is supplementary to the acute sine angle and its value equals that sine.'),
      c(`cos ${90 + a}°`, 'It is the only negative value because cosine is negative in quadrant II.')
    ]); }
  ]],
  ['D2', 'Periodic relationships and sinusoidal representations', [
    n => w('Amplitude, period and midline', [
      c(wave(n + 1, 1, 0, 0), 'It changes only the amplitude from y = sin x.'),
      c(wave(1, n + 1, 0, 0), 'It changes only the period from y = sin x.'),
      c(wave(1, 1, 15 * n, 0), 'It changes only the phase from y = sin x.'),
      c(wave(1, 1, 0, n), 'It changes only the midline from y = sin x.')
    ], 'All angles are in degrees.'),
    n => { const sin = x => Math.sin(x * Math.PI / 180); return w('Compare one cycle on common axes', [
      c(graph(x => n * sin(x), [0, 360], [-6, 8], `Sine wave of amplitude ${n} passing upward through (0, 0).`, { xStep: 90, yStep: 2 }), 'It starts on its midline and rises, completing one cycle in 360°.'),
      c(graph(x => n * sin(x + 90), [0, 360], [-6, 8], `Wave of amplitude ${n} starting at its maximum.`, { xStep: 90, yStep: 2 }), 'It starts at its maximum.'),
      c(graph(x => n * sin(2 * x), [0, 360], [-6, 8], `Wave of amplitude ${n} repeating twice from 0° to 360°.`, { xStep: 90, yStep: 2 }), 'It completes two full cycles in the window.'),
      c(graph(x => n * sin(x) + 2, [0, 360], [-6, 8], `Sine wave with midline y = 2 and amplitude ${n}.`, { xStep: 90, yStep: 2 }), 'It is the only one whose midline is above the horizontal axis.')
    ], 'The horizontal axis measures degrees.'); },
    n => w('Quarter-cycle values', [
      c(table(['x°', 0, 90, 180, 270, 360], ['y', 0, n, 0, -n, 0]), 'It starts on its midline and then rises.'),
      c(table(['x°', 0, 90, 180, 270, 360], ['y', n, 0, -n, 0, n]), 'It starts at its maximum.'),
      c(table(['x°', 0, 90, 180, 270, 360], ['y', -n, 0, n, 0, -n]), 'It starts at its minimum.'),
      c(table(['x°', 0, 90, 180, 270, 360], ['y', 1, n + 1, 1, 1 - n, 1]), 'Its midline is y = 1.')
    ], 'Assume each table shows a full cycle, with points recorded at quarter-cycle intervals.'),
    n => w('Find maximum and minimum', [
      c(wave(n, 1, 0, n), 'It stays nonnegative and reaches zero at its minimum.'),
      c(wave(n, 1, 0, -n), 'It stays nonpositive and reaches zero at its maximum.'),
      c(wave(n, 1, 0, 2 * n), 'Its minimum is strictly positive.'),
      c(wave(n, 1, 0, 0), 'Its maximum and minimum add to zero.')
    ], 'All angles are in degrees.'),
    n => w('A shifted sine or cosine?', [
      c(wave(n, 1, 0, 0, 'cos'), 'It displays the cosine rule directly.'),
      c(wave(n, 1, -90, 0), 'It expresses cosine as a left shift of sine by 90°.'),
      c(wave(n, 1, 90, 0), 'It starts at its minimum and is the reflection of cosine across the x-axis.'),
      c(wave(-n, 1, 0, 0, 'cos'), 'It expresses the reflected cosine directly with a negative coefficient.')
    ], 'All angles are in degrees.'),
    n => w('Spot the period from an equation', [
      c(wave(n, 2, 0, 0), 'The period is 180°, and it passes upward through its midline at x = 0.'),
      c(wave(n, 3, 0, 0), 'The period is 120°, the shortest shown.'),
      c(wave(n, 1, 0, 0), 'The period is 360°, the longest shown.'),
      c(wave(n, 2, 0, 0, 'cos'), 'It has period 180° and starts at its maximum.')
    ], 'All angles are in degrees.'),
    n => w('Read a wave from its extrema', [
      c(`Maximum ${3 * n}, minimum ${n}, period 180°`, `It has midline ${2 * n} and the shorter period.`),
      c(`Maximum ${3 * n}, minimum ${n}, period 360°`, `It has midline ${2 * n} and the longer period.`),
      c(`Maximum ${2 * n}, minimum ${-2 * n}, period 180°`, 'It alone has twice the amplitude of each other description.'),
      c(`Maximum ${n}, minimum ${-n}, period 360°`, 'Its midline is zero and its period is 360°.')
    ])
  ]],
  ['D3', 'Sinusoidal modelling and applications', [
    n => w('Four Ferris wheel rides', [
      c(`Radius ${6 * n} m; centre ${8 * n} m high; one turn in 40 s`, 'Its minimum height is ' + (2 * n) + ' m and its period is 40 s.'),
      c(`Radius ${6 * n} m; centre ${8 * n} m high; one turn in 20 s`, 'It reaches the same extrema twice as often as the 40 s ride.'),
      c(`Radius ${4 * n} m; centre ${8 * n} m high; one turn in 40 s`, 'Only this ride has the smaller amplitude.'),
      c(`Radius ${6 * n} m; centre ${9 * n} m high; one turn in 40 s`, 'Only this ride has the higher midline.')
    ]),
    n => w('Water height over time', [
      c(`h(t) = ${5 * n} + ${n}cos(30°t)`, 'It starts at high tide and repeats after 12 h.'),
      c(`h(t) = ${5 * n} − ${n}cos(30°t)`, 'It starts at low tide.'),
      c(`h(t) = ${5 * n} + ${n}sin(30°t)`, 'It starts at mean height and rises immediately.'),
      c(`h(t) = ${5 * n} + ${n}cos(60°t)`, 'Its period is six hours, only half as long as the others.')
    ], 'Height h is in metres and t is elapsed time in hours.'),
    n => w('Daylight in four fictitious locations', [
      c(`D(t) = 12 + ${n}sin(30°t)`, 'It begins by rising from 12 hours.'),
      c(`D(t) = 12 − ${n}sin(30°t)`, 'It begins by falling from 12 hours.'),
      c(`D(t) = 12 + ${n}cos(30°t)`, 'It starts at its annual maximum.'),
      c(`D(t) = 12`, 'It has no seasonal variation.')
    ], 'Here t is time in months and D is hours of daylight.'),
    n => w('Ferris wheel quarter-turn measurements', [
      c(table(['s', 0, 10, 20, 30, 40], ['m', n, 2 * n, 3 * n, 2 * n, n]), 'The ride starts at its lowest height.'),
      c(table(['s', 0, 10, 20, 30, 40], ['m', 3 * n, 2 * n, n, 2 * n, 3 * n]), 'The ride starts at its highest height.'),
      c(table(['s', 0, 10, 20, 30, 40], ['m', 2 * n, 3 * n, 2 * n, n, 2 * n]), 'The ride starts at its centre height and climbs.'),
      c(table(['s', 0, 10, 20, 30, 40], ['m', 2 * n, n, 2 * n, 3 * n, 2 * n]), 'The ride starts at its centre height and descends.')
    ]),
    n => w('A temperature reaches its maximum at noon', [
      c(`T(t) = 15 + ${n}cos(15°(t − 12))`, 'It reaches the daily maximum at noon and has a 24 h period.'),
      c(`T(t) = 15 + ${n}cos(15°t)`, 'It reaches a minimum at noon.'),
      c(`T(t) = 15 + ${n}sin(15°(t − 12))`, 'At noon it is on the midline and rising.'),
      c(`T(t) = 15 + ${n}cos(30°(t − 12))`, 'It reaches a maximum at noon but it repeats every 12 h.')
    ], 'Here t is hours since midnight and T is in °C.'),
    n => w('Compare thresholds in periodic motion', [
      c(`h(t) = ${n + 5} + ${n}sin(90°t)`, 'It stays at or above 5 throughout.'),
      c(`h(t) = ${n + 5} + ${n + 1}sin(90°t)`, 'It dips below 5 even though its midline is more than 5.'),
      c(`h(t) = 5 + ${n}sin(90°t)`, 'It spends exactly half of each cycle strictly above 5.'),
      c(`h(t) = ${5 - n} + ${n}sin(90°t)`, 'Its maximum is exactly 5.')
    ], 'Compare when these signed heights, relative to a reference level, reach or exceed 5 m.'),
    n => w('Choose a model from repeating data', [
      c(table(['t (h)', 0, 6, 12, 18, 24], ['h (m)', 4 * n, 3 * n, 2 * n, 3 * n, 4 * n]), 'A cosine model with a maximum at t = 0 and period 24 h fits.'),
      c(table(['t (h)', 0, 6, 12, 18, 24], ['h (m)', 4 * n, 2 * n, 4 * n, 2 * n, 4 * n]), 'A cosine model with consecutive peaks 12 h apart fits.'),
      c(table(['t (h)', 0, 6, 12, 18, 24], ['h (m)', 2 * n, 3 * n, 4 * n, 5 * n, 6 * n]), 'A linear model with positive slope fits all the measurements.'),
      c(table(['t (h)', 0, 6, 12, 18, 24], ['h (m)', 3 * n, 4 * n, 3 * n, 2 * n, 3 * n]), 'A rising sine model beginning on the midline fits.')
    ])
  ]]
];

export const mcr3u = buildBank([
  ['Characteristics of Functions', characteristics],
  ['Exponential Functions', exponential],
  ['Discrete Functions', discrete],
  ['Trigonometric Functions', trigonometric]
]);
