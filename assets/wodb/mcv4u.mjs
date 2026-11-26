import { buildBank, card as c, set as w, table, graph, factor as f, offset as o,
  signed as m, power as p, shift, sqrt, minus as neg, point } from './sets.mjs';

const tuple = (...components) => `(${components.map(neg).join(', ')})`;
const radians = { xStep: Math.PI / 2, xLabels: ['−π', '−π/2', '0', 'π/2', 'π'], yStep: 2 };

const rateOfChange = [
  ['A1', 'Average and instantaneous rate of change, and limits', [
    n => w('Limits at a finite input', [
      c(`lim(x→${n}) (x² − ${n * n})/${f(n)}`, `Substitution gives 0/0. Cancelling leaves a limit of ${2 * n} at the removable discontinuity.`),
      c(`lim(x→${n}) (x + ${n})`, 'The polynomial is defined at the target input, so direct substitution works.'),
      c(`lim(x→${n}) 1/${f(n)}`, 'The one-sided limits have opposite infinite signs, so the two-sided limit does not exist.'),
      c(`lim(x→0) sin(${m(n, 'x')})/x`, `It is the trigonometric limit at zero. Scaling the input of sine gives a limit of ${n}.`)
    ], 'Use radians.'),
    n => w('Secants around the same point', [
      c(`[${n - 1}, ${n}]`, `It ends at the target and gives a secant slope of ${2 * n - 1}, below the tangent slope.`),
      c(`[${n}, ${n + 1}]`, `It begins at the target and gives a secant slope of ${2 * n + 1}, above the tangent slope.`),
      c(`[${n - 1}, ${n + 1}]`, 'It straddles the target and its secant slope equals the tangent slope for this quadratic.'),
      c(`x = ${n}`, 'It specifies one point for an instantaneous rate, with no secant interval.')
    ], `Compare rates for f(x) = x² near x = ${n}.`),
    n => { const x = ['x', n - 0.1, n - 0.01, n + 0.01, n + 0.1]; return w('Read two-sided behaviour from a table', [
      c(table(x, ['f(x)', n - 0.1, n - 0.01, n + 0.01, n + 0.1]), 'The values approach the same level from opposite sides of that level.'),
      c(table(x, ['f(x)', n - 1, n - 1, n + 1, n + 1]), 'The values stay at different finite levels on the left and right, suggesting a jump.'),
      c(table(x, ['f(x)', -10, -100, 100, 10]), 'The values grow in magnitude toward the middle, with opposite signs on the two sides.'),
      c(table(x, ['f(x)', n + 0.01, n + 0.0001, n + 0.0001, n + 0.01]), 'At matching distances on either side, the listed values agree and approach a common level from above.')
    ], `What behaviour does each table suggest near x = ${n}?`); },
    n => { const x = [n - 3, n + 3]; const y = [-6, 6]; return w('Compare one-sided limits on graphs', [
      c(graph(t => t - n, x, y, `A line through (${n}, 0).`), 'Its left and right limits agree with its value at the target.'),
      c(graph(t => t < n ? -2 : 2, x, y, `Horizontal branches at heights −2 and 2 on either side of x = ${n}.`, { breaks: [n] }), 'Its one-sided limits are finite and unequal.'),
      c(graph(t => 1 / (t - n), x, y, `Reciprocal branches on opposite sides of x = ${n}, one below and one above the horizontal axis.`, { breaks: [n] }), 'Its two sides diverge to infinities with opposite signs.'),
      c(graph(t => 1 / (t - n) ** 2, x, y, `Two positive reciprocal branches separated at x = ${n}.`, { breaks: [n] }), 'Both sides diverge to positive infinity.')
    ], `Focus on x = ${n}.`); },
    n => w('Tangent behaviour at the origin', [
      c(`f(x) = ${m(n, '|x|')}`, 'It has a corner with opposite finite one-sided slopes.'),
      c(`f(x) = ${m(n, 'x²')}`, 'It has a horizontal tangent at the origin.'),
      c(`f(x) = ${m(n, '√x')}`, 'It starts at a domain endpoint and its right-hand secant slopes grow without bound.'),
      c(`f(x) = ${m(n, 'x')}`, 'It has the same nonzero finite slope on both sides.')
    ]),
    n => { const h = ['h', 1, 0.1, 0.01, 0.001]; return w('Shrinking the secant interval', [
      c(table(h, ['m', 2 * n + 1, 2 * n + 0.1, 2 * n + 0.01, 2 * n + 0.001]), 'The secant slopes approach a positive value from above.'),
      c(table(h, ['m', 2 * n - 1, 2 * n - 0.1, 2 * n - 0.01, 2 * n - 0.001]), 'The secant slopes approach that same positive value from below.'),
      c(table(h, ['m', 2 * n, 2 * n, 2 * n, 2 * n]), 'Every sampled secant slope already equals the limiting slope.'),
      c(table(h, ['m', -2 * n - 1, -2 * n - 0.1, -2 * n - 0.01, -2 * n - 0.001]), 'It is the only table of negative slopes. Its inferred tangent slope is also negative.')
    ], 'Here m is a secant slope and h is the interval width.'); },
    n => w('End behaviour and polynomial degree', [
      c(`lim(x→∞) (${m(n, 'x²')} + 1)/(x² + 2)`, `Equal degrees give a nonzero finite limit of ${n}.`),
      c(`lim(x→∞) (${m(n, 'x')} + 1)/(x² + 2)`, 'The denominator has higher degree, so the limit is zero.'),
      c(`lim(x→∞) (${m(n, 'x³')} + 1)/(x² + 2)`, 'A positive cubic dominates the quadratic denominator, so the expression tends to positive infinity.'),
      c(`lim(x→∞) (1 − ${m(n, 'x³')})/(x² + 2)`, 'A negative cubic dominates the quadratic denominator, so the expression tends to negative infinity.')
    ]),
    n => w('What does each expression measure?', [
      c(`lim(h→0) (f(${n} + h) − f(${n}))/h`, 'It gives the tangent slope as the input increment tends to zero.'),
      c(`(f(${n} + 1) − f(${n}))/1`, 'It gives the slope over a fixed interval of width one.'),
      c(`lim(h→0) f(${n} + h)`, 'It gives the limiting function height at the target, independent of any slope.'),
      c(`lim(h→0) (f(${n} + h) − f(${n}))`, 'It gives the limiting change in height, which is zero by continuity.')
    ], 'Assume f is differentiable at the indicated point and its value there is nonzero.'),
    n => w('Average velocity and direction', [
      c(`A cart moves from ${2 * n} m to ${6 * n} m in 4 seconds.`, `Its average velocity is positive and equal to ${n} m/s.`),
      c(`A cart moves from ${2 * n} m to ${6 * n} m in 2 seconds.`, 'The shorter interval gives the greatest positive average velocity.'),
      c(`A cart moves from ${6 * n} m to ${2 * n} m in 4 seconds.`, 'Its signed displacement is negative.'),
      c(`A cart moves from ${2 * n} m to ${6 * n} m and back in 4 seconds.`, 'Its average velocity is zero even though the distance travelled is positive.')
    ], 'Positions are measured along one axis.')
  ]],
  ['A2', 'Derivatives of polynomial, exponential, and sinusoidal functions', [
    n => w('Basic derivative families', [
      c(`d/dx (${p('x', n + 1)}) = ${m(n + 1, n === 1 ? 'x' : p('x', n))}`, 'It differentiates a nonlinear polynomial and lowers its degree by one.'),
      c(`d/dx (e^(${m(n, 'x')})) = ${m(n, `e^(${m(n, 'x')})`)}`, 'It has an exponential derivative proportional to the original function.'),
      c(`d/dx (sin(${m(n, 'x')})) = ${m(n, `cos(${m(n, 'x')})`)}`, 'It has a periodic derivative.'),
      c(`d/dx (${m(n, 'x')} + 1) = ${n}`, 'The original function is linear, so the derivative is a nonzero constant.')
    ], 'Use radians.'),
    n => { const a = n + 1; const x = [-3, 3]; const y = [-8, 8]; return w('Recognize the shape of a derivative', [
      c(graph(t => a * t / 2, x, y, 'An increasing straight line through the origin.'), 'A nonconstant linear derivative can come from a quadratic.'),
      c(graph(t => a * t * t / 3, x, y, 'An upward parabola touching the horizontal axis at the origin.'), 'The nonnegative parabola can come from an increasing cubic with a horizontal tangent at the origin.'),
      c(graph(t => a * Math.exp(t / 2), x, y, `A positive increasing exponential curve through (0, ${a}).`), 'It increases exponentially while staying positive. It can be the derivative of a positive exponential with the same growth factor.'),
      c(graph(t => a * Math.cos(t), x, y, `A cosine curve of amplitude ${a}, peaking at the origin.`), 'The oscillating derivative can come from a sinusoid.')
    ], 'What kind of original function could produce each derivative graph?'); },
    n => { const x = ['x', -1, 0, 1]; return w('Read slope from derivative values', [
      c(table(x, ["f'(x)", -2 * n, 0, 2 * n]), 'The listed tangent slopes move from negative to zero to positive.'),
      c(table(x, ["f'(x)", 2 * n, 0, -2 * n]), 'The listed slopes move from positive to zero to negative.'),
      c(table(x, ["f'(x)", 3 * n, 0, 3 * n]), 'The outer slopes match and are positive, while the middle tangent is horizontal.'),
      c(table(x, ["f'(x)", n, n, n]), 'All three sampled tangent slopes are the same nonzero value.')
    ], 'Use only the sampled inputs.'); },
    n => w('Derivative of a sine wave in several forms', [
      c(`f'(x) = ${m(n, 'cos(x)')}`, 'It gives the correct derivative as an explicit rule for every input.'),
      c(table(['x', '−π/2', '0', 'π/2', 'π'], ["f'(x)", 0, n, 0, -n]), 'It gives four exact samples of that derivative instead of a full rule.'),
      c(`f'(x) = ${m(n, 'sin(x)')}`, 'It repeats the original sine function, so it incorrectly gives zero slope at the origin.'),
      c(`f'(x) = ${m(-n, 'cos(x)')}`, 'It gives the negative of the correct derivative at every input where cosine is nonzero.')
    ], `Compare proposed derivatives of f(x) = ${m(n, 'sin(x)')} in radians.`),
    n => w('Exponential derivatives at the origin', [
      c(`f(x) = e^(${m(n + 1, 'x')})`, 'Its derivative at zero is the positive integer in the exponent coefficient.'),
      c(`f(x) = ${n + 1}ˣ`, 'Its derivative at zero is the natural logarithm of its base.'),
      c(`f(x) = e^(${m(-n, 'x')})`, 'It is positive at zero, with a negative derivative there.'),
      c(`f(x) = −e^(${m(n + 1, 'x')})`, 'It is negative at zero and has a negative derivative there.')
    ]),
    n => w('Track the degree after differentiation', [
      c(`f(x) = ${n + 1}`, 'Its derivative is identically zero.'),
      c(`f(x) = ${m(n, 'x')} + 2`, 'Its derivative is a nonzero constant.'),
      c(`f(x) = ${m(n, 'x²')} + 2`, 'Its derivative is a straight line with nonzero slope.'),
      c(`f(x) = ${m(n, 'x³')} + 2`, 'Its derivative is a quadratic that touches the horizontal axis.')
    ]),
    n => w('Which changes affect the derivative?', [
      c(`f(x) = x² + ${n}`, 'It moves the original graph upward without changing any tangent slopes.'),
      c(`f(x) = x² − ${n}`, 'It moves the original graph downward without changing any tangent slopes.'),
      c(`f(x) = ${n + 1}x²`, 'It multiplies the tangent slope at each input by a factor greater than one.'),
      c(`f(x) = −x²`, 'It reverses the sign of every nonzero tangent slope.')
    ], 'Compare each rule with y = x².'),
    n => { const x = [-Math.PI, Math.PI]; const y = [-6, 6]; return w('Recognize the derivative of cosine', [
      c(graph(t => -n * Math.sin(t), x, y, 'Sine-shaped wave descending through the origin.', radians), 'It is the correct derivative. It changes from positive to negative at the cosine maximum.'),
      c(graph(t => n * Math.sin(t), x, y, 'Sine-shaped wave ascending through the origin.', radians), 'It has the right zeros but reverses the sign of all nonzero slopes.'),
      c(graph(t => n * Math.cos(t), x, y, 'Cosine wave with a maximum at the origin.', radians), 'It is the original function itself.'),
      c(graph(t => -n * Math.cos(t), x, y, 'Cosine-shaped wave with a minimum at the origin.', radians), 'It reflects the original function and gives a negative value where the actual derivative is zero.')
    ], `Compare with f(x) = ${m(n, 'cos(x)')} in radians.`); },
    n => w('Rebuild a rule from its derivative', [
      c(`f(x) = ${m(n, 'x²')} + 3`, 'It matches both the derivative rule and the stated initial value.'),
      c(`f(x) = ${m(n, 'x²')} − 3`, 'It has the correct derivative but the wrong initial value.'),
      c(`f(x) = ${m(-n, 'x²')} + 3`, 'It matches the initial value but has the opposite derivative for nonzero inputs.'),
      c(`f(x) = ${m(2 * n, 'x')} + 3`, 'Its derivative is constant, unlike the given derivative.')
    ], `Look for a function with f'(x) = ${2 * n}x and f(0) = 3.`)
  ]],
  ['A3', 'Product, quotient, and chain rules', [
    n => w('Choose a rule for the expression as written', [
      c(`y = ${p('x', n + 1)} · sin(x)`, 'Its outer operation multiplies two nonconstant factors.'),
      c(`y = (x + ${n})/(x² + 1)`, 'Its outer operation divides two nonconstant functions.'),
      c(`y = (x² + ${n})³`, 'Its outer operation cubes an inner function.'),
      c(`y = ${p('x', n + 1)} + sin(x)`, 'Its outer operation adds two functions, so their derivatives can be added term by term.')
    ]),
    n => w('Keep both terms of the product rule', [
      c(`f'(x) = ${m(n, 'sin(x)')} + ${m(n, 'x')} · cos(x)`, 'It differentiates one factor at a time and adds both products.'),
      c(`f'(x) = ${m(n, 'cos(x)')}`, 'It multiplies the two derivatives together and omits both product-rule terms.'),
      c(`f'(x) = ${m(n, 'x')} · cos(x)`, 'It keeps the term from differentiating sine only.'),
      c(`f'(x) = ${m(n, 'sin(x)')}`, 'It keeps the term from differentiating the linear factor only.')
    ], `Compare proposed derivatives of f(x) = ${m(n, 'x')} · sin(x).`),
    n => w('Spot the quotient rule error', [
      c(`f'(x) = ((x² + 1) − 2x(x + ${n}))/(x² + 1)²`, 'It has the correct subtraction order and squared denominator.'),
      c(`f'(x) = (2x(x + ${n}) − (x² + 1))/(x² + 1)²`, 'It reverses the numerator subtraction, changing the sign of the correct result.'),
      c(`f'(x) = ((x² + 1) − 2x(x + ${n}))/(x² + 1)`, 'It uses the correct numerator but forgets to square the denominator.'),
      c('f\'(x) = 1/(2x)', 'It divides the derivatives of the numerator and denominator. It even excludes x = 0, where the actual derivative exists.')
    ], `Compare proposed derivatives of f(x) = (x + ${n})/(x² + 1).`),
    n => w('Read the inner derivative', [
      c(`y = sin(${n + 1}x)`, 'The inner derivative is a positive constant greater than one, and the outer derivative is cosine.'),
      c(`y = cos(${n + 1}x)`, 'The inner derivative is the same positive constant, but the outer derivative introduces a minus sign.'),
      c(`y = sin(x + ${n})`, 'The phase shift has inner derivative one.'),
      c(`y = sin(x² + ${n})`, 'Its inner derivative depends on x and vanishes at the origin.')
    ]),
    n => w('Where does the derivative exist?', [
      c(`f(x) = ${sqrt(`x − ${n}`)}`, 'Its derivative exists to the right of a finite endpoint where the right-hand secant slopes diverge.'),
      c(`f(x) = ${sqrt(`${n} − x`)}`, 'Its derivative exists to the left of a finite endpoint where the left-hand secant slopes diverge in magnitude.'),
      c(`f(x) = 1/${f(n)}`, 'Its derivative is defined on both sides of an excluded input and is negative throughout its domain.'),
      c(`f(x) = ${f(n)}²`, 'Its derivative is defined for all real inputs and equals zero at the shift.')
    ]),
    n => w('Composition and derivative values at zero', [
      c(`f(x) = (x + ${n})³`, `The outer derivative contributes ${3 * n * n} at zero and the inner derivative is one.`),
      c(`f(x) = (x² + ${n})³`, 'The inner derivative is zero at the origin and the function is even.'),
      c(`f(x) = (${n + 1}x + ${n})³`, 'It has the greatest derivative at zero because the inner linear coefficient exceeds one.'),
      c(`f(x) = x³ + ${n}`, 'It is a vertical translation of the cubic parent and has a stationary inflection at zero.')
    ]),
    n => w('Compare tangent slopes at the origin', [
      c(`f(x) = x · cos(${m(n, 'x')})`, 'The product rule gives slope one at zero because the cosine factor equals one there.'),
      c(`f(x) = x · sin(${m(n, 'x')})`, 'Both factors vanish at zero, so the product passes through the origin with a horizontal tangent.'),
      c(`f(x) = cos(${m(n, 'x')})`, 'Its tangent is horizontal at the point (0, 1).'),
      c(`f(x) = sin(${n + 1}x)`, 'Its slope at zero exceeds one because the inner derivative is greater than one.')
    ], 'Use radians.'),
    n => w('Different forms, different derivative strategies', [
      c(`f(x) = 1/(x + ${n})`, 'It has a first-power denominator and a constant numerator as written.'),
      c(`f(x) = (x + ${n})⁻¹`, 'It shows that same function as a negative power, ready for the chain rule.'),
      c(`f(x) = 1/(x + ${n})²`, 'Its derivative switches sign across the excluded input because the derivative denominator has odd power.'),
      c(`f(x) = 1/(x² + ${n})`, 'Its denominator is always positive, so the derivative has no excluded inputs.')
    ]),
    n => w('Product, chain, or both?', [
      c(`f(x) = (x² + ${n}) · eˣ`, 'Its outer product has two factors whose derivatives can each be found directly.'),
      c(`f(x) = e^(x² + ${n})`, 'The polynomial is entirely inside the exponential, with no outer product.'),
      c(`f(x) = x · e^(x² + ${n})`, 'It uses an outer product rule and a chain rule inside the exponential factor.'),
      c(`f(x) = eˣ + (x² + ${n})`, 'Its outer sum lets each term be differentiated independently.')
    ])
  ]]
];

const derivativesApps = [
  // B1 and B2 split the ministry's first expectation for this strand into two teaching topics.
  ['B1', 'Slope of tangents, increasing/decreasing, and extrema', [
    n => { const x = [-3, 3]; const y = [-7, 7]; return w('Four types of critical point', [
      c(graph(t => n * t * t, x, y, 'Upward parabola touching the horizontal axis at the origin.'), 'It has a differentiable local minimum at the origin.'),
      c(graph(t => -n * t * t, x, y, 'Downward parabola touching the horizontal axis at the origin.'), 'It has a differentiable local maximum at the origin.'),
      c(graph(t => n * t ** 3, x, y, 'Increasing cubic with a horizontal tangent at the origin.'), 'It has a horizontal tangent but no extremum at the origin.'),
      c(graph(t => -n * Math.abs(t), x, y, 'Inverted V with its tip at the origin.'), 'Its maximum is a corner where the derivative does not exist.')
    ], 'Compare the critical points at x = 0.'); },
    n => w('Sign on either side of a stationary point', [
      c(`f'(x) = ${f(n)}`, 'Its sign changes from negative to positive, giving f a local minimum.'),
      c(`f'(x) = −${f(n)}`, 'Its sign changes from positive to negative, giving f a local maximum.'),
      c(`f'(x) = ${f(n)}²`, 'It stays positive on both sides, so f increases through its stationary point.'),
      c(`f'(x) = −${f(n)}²`, 'It stays negative on both sides, so f decreases through its stationary point.')
    ]),
    n => w('Multiplicity in the first derivative', [
      c(`f'(x) = ${f(n)}${f(-n)}`, 'Its sign is negative between the roots and positive outside them. The left root is a local maximum and the right root a local minimum of f.'),
      c(`f'(x) = −${f(n)}${f(-n)}`, 'Its sign is positive between the roots, so the left root is a local minimum and the right root a local maximum of f.'),
      c(`f'(x) = ${f(n)}²${f(-n)}`, 'Its sign changes at the negative root only, giving a local minimum there.'),
      c(`f'(x) = ${f(n)}${f(-n)}²`, 'Its sign changes at the positive root only, giving a local minimum there.')
    ]),
    n => w('What happens at the marked input?', [
      c(`f(x) = ${f(n)}³`, 'It passes through the marked point with a horizontal tangent and does not turn.'),
      c(`f(x) = ${f(n)}²`, 'It has a smooth local minimum at the marked point.'),
      c(`f(x) = |${shift('x', n)}|`, 'It has a local minimum with unequal one-sided slopes.'),
      c(`f(x) = ${sqrt(`x − ${n}`)}`, 'Its minimum is a domain endpoint, so only right-hand secants are available.')
    ], `Focus on x = ${n}.`),
    n => w('Tangent, secant, or parallel line?', [
      c('y = 0', 'It is the horizontal tangent at the vertex.'),
      c('y = 1', 'It connects the two points one unit to either side of the vertex.'),
      c('y = −1', 'It lies below the entire parabola.'),
      c(`y = ${f(n)}`, 'It passes through the vertex with nonzero slope and meets the parabola again one unit to the right.')
    ], `Compare the lines with y = ${f(n)}².`),
    n => { const x = ['x', n - 1, n, n + 1]; return w('What do the sampled slopes suggest?', [
      c(table(x, ["f'(x)", -n, 0, 2 * n]), 'Its outer slopes suggest a turn from decreasing to increasing.'),
      c(table(x, ["f'(x)", 2 * n, 0, -n]), 'Its outer slopes suggest a turn from increasing to decreasing.'),
      c(table(x, ["f'(x)", n, 0, 2 * n]), 'It records a horizontal tangent between two positive slope samples.'),
      c(table(x, ["f'(x)", n, n, 2 * n]), 'None of its sampled tangents is horizontal.')
    ], 'Compare the sampled values and describe what further evidence would establish a local extremum.'); },
    n => w('Extrema on a closed interval', [
      c(`f(x) = ${f(n)}²`, 'Its absolute minimum is at the interior vertex and its absolute maximum is at the right endpoint.'),
      c(`f(x) = −${f(n)}²`, 'Its absolute maximum is at the interior vertex and its absolute minimum is at the right endpoint.'),
      c(`f(x) = ${f(n)}³`, 'It is strictly increasing even though an interior tangent is horizontal.'),
      c(`f(x) = −${f(n)}`, 'It decreases at a constant rate, so its absolute maximum is at the left endpoint.')
    ], `Compare f on [${n - 1}, ${n + 2}].`),
    n => w('From the graph of f to signs of its slope', [
      c(graph(t => n * Math.exp(t / 2), [-4, 4], [-6, 12], 'Positive exponential curve increasing through the whole window.'), 'It stays above the horizontal axis while its tangent slopes are all positive.'),
      c(graph(t => n * Math.exp(-t / 2), [-4, 4], [-6, 12], 'Positive exponential curve decreasing through the whole window.'), 'It stays above the horizontal axis while its tangent slopes are all negative.'),
      c(graph(t => -n * Math.exp(t / 2), [-4, 4], [-6, 12], 'Negative exponential curve decreasing through the whole window.'), 'It stays below the horizontal axis and its tangent slopes are all negative.'),
      c(graph(t => -n * Math.exp(-t / 2), [-4, 4], [-6, 12], 'Negative exponential curve increasing through the whole window.'), 'It stays below the horizontal axis and its tangent slopes are all positive.')
    ]),
    n => w('Tangents at four points on a cubic', [
      c(`x = ${neg(n - 2)}`, 'It is the only listed input with a positive tangent slope.'),
      c(`x = ${n - 1}`, 'It is the horizontal tangent at the local maximum.'),
      c(`x = ${n}`, 'It is the only listed input with a negative tangent slope.'),
      c(`x = ${n + 1}`, 'It is the horizontal tangent at the local minimum.')
    ], `Compare f(x) = ${f(n)}³ − 3${f(n)} at the listed inputs.`)
  ]],
  ['B2', 'Concavity, inflection points, and curve sketching', [
    n => w('Second-derivative clues', [
      c(`f''(x) = ${2 * n}`, 'The second derivative is a strictly positive constant, so the graph has no inflection point.'),
      c(`f''(x) = −${2 * n}`, 'The second derivative is a strictly negative constant, so the graph is concave down everywhere.'),
      c(`f''(x) = ${6 * n}x`, 'The second derivative changes sign at the origin, giving an inflection point.'),
      c(`f''(x) = ${m(n, 'x²')}`, 'The second derivative vanishes at zero without any change of concavity.')
    ]),
    n => { const x = [n - 3, n + 3]; const y = [-7, 7]; return w('Bending up, bending down, or neither', [
      c(graph(t => (t - n) ** 2, x, y, `An upward parabola with vertex (${n}, 0).`), 'Its tangent slopes increase throughout.'),
      c(graph(t => -((t - n) ** 2), x, y, `A downward parabola with vertex (${n}, 0).`), 'Its tangent slopes decrease throughout.'),
      c(graph(t => (t - n) ** 3, x, y, `A rising cubic flattening at (${n}, 0).`), 'Its tangent slopes first decrease, then increase, so concavity changes.'),
      c(graph(t => t - n, x, y, `A rising straight line through (${n}, 0).`), 'Its tangent slope is constant, with zero second derivative everywhere.')
    ]); },
    n => { const x = ['x', n - 1, n, n + 1]; return w('What do second-derivative samples support?', [
      c(table(x, ["f''(x)", -2 * n, 0, n]), 'Its outer samples go from negative to positive, consistent with a switch from concave down to concave up.'),
      c(table(x, ["f''(x)", n, 0, -2 * n]), 'Its outer samples go from positive to negative, consistent with a switch from concave up to concave down.'),
      c(table(x, ["f''(x)", n, 0, n]), 'It has a middle zero with positive samples on both sides, so the listed values do not show a change of concavity.'),
      c(table(x, ["f''(x)", -n, -2 * n, -n]), 'Every sampled second derivative is negative and none is zero.')
    ], 'Use the sampled inputs. A zero alone does not prove a change of concavity.'); },
    n => w('Stationary and nonstationary inflection points', [
      c(`f(x) = ${f(n)}³`, 'It changes concavity at the marked input with slope zero.'),
      c(`f(x) = ${f(n)}³ + ${f(n)}`, 'It changes concavity at the marked input with a positive slope.'),
      c(`f(x) = ${f(n)}⁴`, 'It has an isolated zero of the second derivative at the marked input without a change of sign.'),
      c(`f(x) = ${f(n)}`, 'It has the same slope at every input and is neither strictly concave up nor strictly concave down.')
    ], `Focus on x = ${n}.`),
    n => w('When is the second-derivative test conclusive?', [
      c(`f(x) = ${f(n)}²`, 'At the stationary point, the second derivative is positive and proves a local minimum.'),
      c(`f(x) = −${f(n)}²`, 'At the stationary point, the second derivative is negative and proves a local maximum.'),
      c(`f(x) = −${f(n)}⁴`, 'The test is inconclusive because the second derivative is zero there, yet comparing nearby values proves a maximum.'),
      c(`f(x) = −${f(n)}³`, 'The test is inconclusive because the second derivative is zero there, and the function decreases through a stationary inflection.')
    ], `Apply the test at x = ${n}.`),
    n => w('Concavity from the shape of f prime', [
      c(graph(t => n * t * t, [-3, 3], [-7, 7], 'Upward parabola representing the derivative.'), 'The derivative graph has a smooth minimum, so f switches from concave down to concave up.'),
      c(graph(t => -n * t * t, [-3, 3], [-7, 7], 'Downward parabola representing the derivative.'), 'The derivative graph has a smooth maximum, so f switches from concave up to concave down.'),
      c(graph(t => n * Math.abs(t), [-3, 3], [-7, 7], 'V-shaped derivative graph with a corner at the origin.'), 'The derivative switches from falling to rising at a corner, as opposed to a smooth turning point.'),
      c(graph(t => n * t, [-3, 3], [-7, 7], 'Rising straight line representing the derivative.'), 'The derivative rises at a constant rate, giving f a constant positive second derivative.')
    ], 'These are graphs of f′, not of f.'),
    n => { const x = [n - 3, n + 3]; const y = [-6, 6]; const options = { breaks: [n] }; return w('Concavity on separate branches', [
      c(graph(t => 2 / (t - n), x, y, `Reciprocal graph with negative left values and positive right values across x = ${n}, with decreasing branches.`, options), 'It is concave down on the left branch and concave up on the right branch.'),
      c(graph(t => -2 / (t - n), x, y, `Reflected reciprocal graph with positive left values and negative right values across x = ${n}.`, options), 'It is concave up on the left branch and concave down on the right branch.'),
      c(graph(t => 2 / (t - n) ** 2, x, y, `Two positive branches on either side of x = ${n}.`, options), 'Both branches are concave up.'),
      c(graph(t => -2 / (t - n) ** 2, x, y, `Two negative branches on either side of x = ${n}.`, options), 'Both branches are concave down.')
    ], `Compare concavity across x = ${n}. The graphs are undefined there, so none has an inflection point at that input.`); },
    n => w('Sketch features of four quartics', [
      c(`f(x) = x⁴ − ${2 * n}x²`, 'It has two local minima, one local maximum, and two inflection points.'),
      c(`f(x) = −x⁴ + ${2 * n}x²`, 'It has two local maxima, one local minimum, and two inflection points.'),
      c(`f(x) = x⁴ + ${2 * n}x²`, 'It is strictly concave up everywhere and has one minimum.'),
      c(`f(x) = −x⁴ − ${2 * n}x²`, 'It is strictly concave down everywhere and has one maximum.')
    ]),
    n => w('Slope and concavity are independent', [
      c(`f(x) = ${m(n, 'x')} + x²`, 'At zero the tangent is rising and the graph is concave up.'),
      c(`f(x) = ${m(n, 'x')} − x²`, 'At zero the tangent is rising and the graph is concave down.'),
      c(`f(x) = ${m(-n, 'x')} + x²`, 'At zero the tangent is falling and the graph is concave up.'),
      c(`f(x) = ${m(-n, 'x')} − x²`, 'At zero the tangent is falling and the graph is concave down.')
    ], 'Compare the slope and concavity at x = 0.')
  ]],
  ['B3', 'Optimization and related-rates applications', [
    n => w('What is changing, and what is being optimized?', [
      c(`A(x) = x(${10 * n} − x)`, 'It is a quadratic area model with a maximum for a positive width.'),
      c(`C(x) = ${m(n, 'x')} + ${100 * n}/x, x > 0`, 'It balances a linearly increasing cost against a decreasing reciprocal cost, producing a minimum.'),
      c('dV/dt = 4πr² · dr/dt', 'It connects the time rates of the volume and radius of a sphere.'),
      c(`v(t) = 3t² − ${6 * n}t`, 'It is the velocity model. Differentiating it gives acceleration.')
    ]),
    n => w('Use the available fencing', [
      c(`Fence four sides of a rectangle using ${12 * n} metres of fence.`, `Its largest area occurs for a square of side ${3 * n} m.`),
      c(`Use ${12 * n} metres of fence for three sides of a rectangle along a wall.`, `The two perpendicular sides are each ${3 * n} m at the optimum, and the fenced side parallel to the wall is twice as long.`),
      c(`Use ${12 * n} metres of fence for two adjacent sides of a rectangle in a corner between walls.`, `It maximizes area with each fenced side ${6 * n} m long.`),
      c(`Use up to ${12 * n} metres to enclose one side of a rectangular plot of fixed width.`, 'Its area increases linearly with the length of the fenced side, so the full length is best.')
    ], 'Assume the walls supply the unfenced sides.'),
    n => w('Choose a model for an open box', [
      c(`V(x) = x(${12 * n} − 2x)²`, 'It multiplies the cut height by both remaining side lengths and gives the actual volume.'),
      c(`V(x) = x(${12 * n} − x)²`, 'It shortens each original side by only one cut length instead of two.'),
      c(`V(x) = x(${12 * n} − 2x)`, 'It gives the area of one vertical side, keeping the height but dropping one base dimension.'),
      c(`V(x) = (${12 * n} − 2x)²`, 'It gives the base area and omits the height.')
    ], `Cut squares of side x from the four corners of a square sheet of side ${12 * n}, then fold up the sides.`),
    n => w('Where can a positive cost be minimized?', [
      c(`C(x) = ${m(n, 'x')} + ${16 * n}/x`, 'The marginal cost is zero at x = 4 and changes from negative to positive there.'),
      c(`C(x) = ${m(n, 'x')} + ${36 * n}/x`, 'It has an interior minimum at x = 6, with a larger reciprocal-cost coefficient.'),
      c(`C(x) = ${m(n, 'x')}`, 'It is strictly increasing and its infimum is zero as x approaches zero from above.'),
      c(`C(x) = ${16 * n}/x`, 'It is strictly decreasing and approaches zero as x grows without bound.')
    ], 'Compare the cost models on x > 0.'),
    n => { const t = ['t (s)', 0, 1, 2, 3]; return w('Position, velocity, and acceleration from a model', [
      c(table(t, ['s (m)', 0, n, 4 * n, 9 * n]), 'Its successive position changes are 1, 3 and 5 times the scale factor, matching the three average velocities over one-second intervals.'),
      c(table(t, ['v (m/s)', 0, 2 * n, 4 * n, 6 * n]), 'It gives instantaneous velocities at the four separate times.'),
      c(table(t, ['a (m/s²)', 2 * n, 2 * n, 2 * n, 2 * n]), 'It reports the constant acceleration obtained by differentiating twice.'),
      c(table(t, ['s (m)', 0, 2 * n, 4 * n, 6 * n]), 'Its listed positions fit a constant-speed model using the velocity numbers as positions.')
    ], `Compare the tables with the motion model s(t) = ${m(n, 't²')}.`); },
    n => w('Related rates for expanding circles and spheres', [
      c(`dC/dt = ${4 * n}π`, 'It measures the change in the distance around a circle, in length per unit time.'),
      c(`dA/dt = ${12 * n}π`, 'It measures the change in the area of a flat disk.'),
      c(`dS/dt = ${48 * n}π`, 'It measures the change in the surface area of a sphere, four times the disk area rate.'),
      c(`dV/dt = ${72 * n}π`, 'It measures the change in enclosed volume, in cubic units per unit time.')
    ], `Compare the rates when r = 3 and dr/dt = ${2 * n}. Let C be circumference, A disk area, S sphere surface area, and V sphere volume.`),
    n => w('A constraint can move or remove the maximum', [
      c(`[${n - 1}, ${n + 2}]`, 'The vertex is an interior point of this interval and realizes the maximum.'),
      c(`[${n}, ${n + 2}]`, 'The vertex is included as the left endpoint and realizes the maximum.'),
      c(`[${n - 2}, ${n - 1}]`, 'The function increases throughout this interval, placing its maximum at the right endpoint.'),
      c(`(${n}, ${n + 2}]`, 'It excludes the vertex, so the function has a supremum but no maximum on the interval.')
    ], `Compare the largest values of P(x) = 10 − ${f(n)}² under each constraint.`),
    n => w('A ladder slides down a wall', [
      c(`dy/dt = −${3 * n}/4`, 'It is the correct vertical rate. The differentiated constraint gives dy/dt = −(x/y) times dx/dt.'),
      c(`dy/dt = ${3 * n}/4`, 'It has the correct speed but predicts upward motion as the bottom moves away.'),
      c(`dy/dt = −${4 * n}/3`, 'It has the correct direction but swaps the horizontal and vertical distances in the multiplier.'),
      c(`dy/dt = −${n}`, 'It assumes equal horizontal and vertical speeds, which would require equal distances from the corner at this instant.')
    ], `The ladder bottom is ${3 * n} m from the wall and moves away at ${n} m/s. The top is at height ${4 * n} m.`),
    n => w('Stopping and reversing direction', [
      c(`v(t) = ${m(n, '(t − 1)')}`, 'It changes from negative to positive velocity at the stop.'),
      c(`v(t) = ${m(n, '(1 − t)')}`, 'It changes from positive to negative velocity at the stop.'),
      c(`v(t) = ${m(n, '(t − 1)²')}`, 'It is momentarily at rest and keeps the same direction on either side.'),
      c(`v(t) = ${m(n, '(t + 1)')}`, 'It keeps moving with strictly positive velocity on the whole interval.')
    ], 'Compare one-dimensional motion for 0 ≤ t ≤ 2.')
  ]]
];

const vectors = [
  ['C1', 'Geometric and Cartesian vectors in 2D and 3D', [
    n => w('Read dimension and direction from components', [
      c(`u = ${tuple(n, 0)}`, 'It is a nonzero vector on the positive x-axis in two-space.'),
      c(`v = ${tuple(n, n)}`, 'It is a two-dimensional vector pointing at 45° to the positive x-axis.'),
      c(`w = ${tuple(n, n, n)}`, 'It is a three-dimensional vector with all components nonzero.'),
      c(`z = ${tuple(0, 0, 0)}`, 'It has magnitude zero and no direction.')
    ]),
    n => w('From directed segments to components', [
      c(`Move from ${point(n, n)} to ${point(4 * n, n)}.`, 'Only the horizontal component is nonzero and it points right.'),
      c(`Move from ${point(n, n)} to ${point(n, 4 * n)}.`, 'Only the vertical component is nonzero and it points up.'),
      c(`Move from ${point(n, n)} to ${point(4 * n, 5 * n)}.`, 'Both components are positive and form a scaled 3–4–5 triangle.'),
      c(`Move from ${point(n, n)} to ${point(-2 * n, 5 * n)}.`, 'The horizontal component is negative while the vertical component is positive.')
    ]),
    n => w('Compare direction with a reference vector', [
      c(tuple(6 * n, 8 * n), 'It points in the same direction as the reference and is twice as long.'),
      c(tuple(-3 * n, -4 * n), 'It has the same length as the reference and points in exactly the opposite direction.'),
      c(tuple(4 * n, -3 * n), 'It is a quarter-turn clockwise from the reference and has the same length.'),
      c(tuple(0, 5 * n), 'It has the same length as the reference but points along the positive y-axis.')
    ], `Use u = ${tuple(3 * n, 4 * n)} as the reference.`),
    n => w('A zero component places a vector in a coordinate plane', [
      c(tuple(n, 2 * n, 0), 'Its zero z-component places it in the xy-plane when its tail is at the origin.'),
      c(tuple(n, 0, 2 * n), 'Its zero y-component places it in the xz-plane.'),
      c(tuple(0, n, 2 * n), 'Its zero x-component places it in the yz-plane.'),
      c(tuple(n, n, n), 'With its tail at the origin, it points equally along all three axes and lies in no coordinate plane.')
    ], 'Place each vector with its tail at the origin.'),
    n => w('Normalize without changing direction', [
      c('(3/5, 4/5)', 'This is the unit vector pointing in the original direction.'),
      c(tuple(3 * n, 4 * n), 'This is the original non-unit vector, with its magnitude unchanged.'),
      c(tuple(-3 * n, -4 * n), 'It preserves the original magnitude and reverses the direction by 180°.'),
      c(tuple(-4 * n, 3 * n), 'It preserves the original magnitude and turns the direction 90° counterclockwise.')
    ], `Start with the vector u = ${tuple(3 * n, 4 * n)}.`),
    n => w('Which quantities need a direction?', [
      c(`A cyclist travels ${n} km east along a level path.`, 'It gives a nonzero horizontal displacement with an explicit compass direction.'),
      c(`A cyclist takes ${n} minutes to complete a loop.`, 'It gives a duration, which is a scalar.'),
      c(`A drone moves ${n} m east while gaining ${2 * n} m of altitude.`, 'It gives a displacement with both horizontal and vertical components.'),
      c(`A runner covers ${n} km and finishes at the starting point.`, 'The distance travelled is positive, yet the net displacement is the zero vector.')
    ]),
    n => w('Equal displacements can have different starting points', [
      c(`Move from ${point(0, 0)} to ${point(n, 2 * n)}.`, 'It gives the reference displacement as a position vector because it starts at the origin.'),
      c(`Move from ${point(2 * n, n)} to ${point(3 * n, 3 * n)}.`, 'Its endpoints are both away from the origin, but their difference gives the reference displacement.'),
      c(`Move from ${point(n, 2 * n)} to ${point(0, 0)}.`, 'It follows the reference segment in reverse, giving the negative of the reference displacement.'),
      c(`Move from ${point(0, 0)} to ${point(2 * n, 4 * n)}.`, 'It points in the reference direction but doubles the displacement.')
    ], `The reference displacement is ${tuple(n, 2 * n)}.`),
    n => w('Lengths of vectors in three-space', [
      c(tuple(n, 2 * n, 2 * n), `All three components are nonzero and the length is exactly ${3 * n}.`),
      c(tuple(n, 0, 0), 'Its length is just its positive x-component.'),
      c(tuple(0, n, n), 'It has the shortest length among the vectors with two or more nonzero components, and its length is irrational.'),
      c(tuple(3 * n, 4 * n, 0), 'It has the greatest length, from the 3–4–5 relationship in the xy-plane.')
    ]),
    n => w('Displacement between two points in space', [
      c(tuple(n, -2 * n, 3 * n), 'It subtracts the starting position from the ending position in the correct order.'),
      c(tuple(-n, 2 * n, -3 * n), 'It subtracts in the reverse order and points back toward the starting point.'),
      c(tuple(3 * n, 2 * n, 9 * n), 'It adds the endpoint coordinates instead of taking their difference.'),
      c(tuple(n, 2 * n, 3 * n), 'It uses only absolute coordinate changes and loses the direction of the y-component.')
    ], `Find the displacement from A = ${tuple(n, 2 * n, 3 * n)} to B = ${tuple(2 * n, 0, 6 * n)}.`)
  ]],
  ['C2', 'Dot product, cross product, and projections', [
    n => w('Scalar and vector results', [
      c(`${tuple(n, 0)} · ${tuple(0, n)} = 0`, 'It is a dot product of perpendicular vectors, producing scalar zero.'),
      c(`${tuple(n, 0, 0)} × ${tuple(0, n, 0)} = ${tuple(0, 0, n * n)}`, 'It is a cross product, producing a nonzero vector perpendicular to both inputs.'),
      c(`${tuple(n, 0)} · ${tuple(n, 0)} = ${n * n}`, 'It is the dot product of a vector with itself and gives the square of its length.'),
      c(`Project the vector ${tuple(n, n)} onto the x-axis.`, 'It requests a projection parallel to the target axis, rather than an output perpendicular to two inputs.')
    ]),
    n => w('The dot-product sign and the angle between vectors', [
      c(tuple(n, n), 'It makes a strictly acute angle with the positive x-direction, and the dot product is positive.'),
      c(tuple(-n, n), 'It makes an obtuse angle with the positive x-direction, and the dot product is negative.'),
      c(tuple(0, n), 'It makes a right angle with the reference, giving a dot product of zero.'),
      c(tuple(2 * n, 0), 'It points exactly in the reference direction, so the angle is zero.')
    ], `Compare each vector with u = ${tuple(n, 0)}.`),
    n => w('Use the right-hand rule', [
      c(`${tuple(n, 0, 0)} × ${tuple(0, 2 * n, 0)}`, 'The order from positive x to positive y produces a vector in the positive z-direction.'),
      c(`${tuple(0, 2 * n, 0)} × ${tuple(n, 0, 0)}`, 'Reversing those two factors sends the product in the negative z-direction.'),
      c(`${tuple(n, 0, 0)} × ${tuple(2 * n, 0, 0)}`, 'The inputs are parallel, so the cross product is the zero vector.'),
      c(`${tuple(0, 0, 2 * n)} × ${tuple(n, 0, 0)}`, 'The order from positive z to positive x produces a vector in the positive y-direction.')
    ]),
    n => w('Project onto a positive coordinate axis', [
      c(tuple(n, n, 0), 'Its projection points along positive x and discards a nonzero y-component.'),
      c(tuple(-n, n, 0), 'Its projection points opposite the target vector because the x-component is negative.'),
      c(tuple(0, n, n), 'It is perpendicular to the target and has zero projection onto it.'),
      c(tuple(2 * n, 0, 0), 'It is already on the target axis, so its projection is the entire vector.')
    ], `Project each vector onto u = ${tuple(n, 0, 0)}.`),
    n => w('Work done by a constant force', [
      c(`F = ${tuple(n, 0)}`, 'The force is in the direction of travel, so its full magnitude contributes to positive work.'),
      c(`F = ${tuple(-n, 0)}`, 'The force acts against the direction of travel, so it does negative work.'),
      c(`F = ${tuple(0, n)}`, 'The force is perpendicular to the displacement and does zero work.'),
      c(`F = ${tuple(n, n)}`, 'Only one of its two nonzero components contributes to work, giving the same work as the purely forward force.')
    ], `The displacement is d = ${tuple(3 * n, 0)} m. Force components are measured in newtons.`),
    n => w('Add, subtract, scale, or reverse', [
      c(`${tuple(n, 2 * n)} + ${tuple(n, -2 * n)}`, 'The y-components cancel, leaving a vector along positive x.'),
      c(`${tuple(n, 2 * n)} − ${tuple(n, -2 * n)}`, 'The x-components cancel, leaving a vector along positive y.'),
      c(`2${tuple(n, 2 * n)}`, 'It doubles the length of u and preserves its direction in the first quadrant.'),
      c(`−${tuple(n, -2 * n)}`, 'It preserves the length of v and reverses its direction into the second quadrant.')
    ], `Use u = ${tuple(n, 2 * n)} and v = ${tuple(n, -2 * n)}.`),
    n => w('Add a current to a boat’s velocity', [
      c(`v = ${tuple(n, 2 * n)}`, 'It correctly adds both eastward drift and northward boat speed.'),
      c(`v = ${tuple(-n, 2 * n)}`, 'It subtracts the eastward current, incorrectly sending the boat west of north.'),
      c(`v = ${tuple(n, 0)}`, 'It accounts for the current alone and drops the boat’s motion through the water.'),
      c(`v = ${tuple(0, 2 * n)}`, 'It gives the boat’s velocity relative to the water, with no current included.')
    ], `Take east as positive x and north as positive y. A boat heads north at ${2 * n} m/s through water flowing east at ${n} m/s. Compare proposed ground velocities.`),
    n => w('Classify outputs of vector operations', [
      c(`${tuple(n, 0, 0)} · ${tuple(0, 2 * n, 0)}`, 'It gives the scalar zero from the perpendicular inputs.'),
      c(`${tuple(n, 0, 0)} × ${tuple(0, 2 * n, 0)}`, 'It gives a nonzero vector in the positive z-direction.'),
      c('(u + v) · (u − v)', 'It simplifies to the difference of squared lengths. The result is negative because v is longer.'),
      c('(u + v) · (u + v)', 'It gives a positive scalar, the squared length of the resultant.')
    ], `Use u = ${tuple(n, 0, 0)} and v = ${tuple(0, 2 * n, 0)}.`),
    n => w('Use the right product to find area', [
      c(`|${tuple(3 * n, 0, 0)} × ${tuple(n, 2 * n, 0)}|`, `It gives the parallelogram area, which is ${6 * n * n} square units.`),
      c('|u × v|/2', 'It gives the triangle area, half the parallelogram area.'),
      c('|u · v|', 'It uses cosine of the included angle, so it gives the magnitude of the dot product instead of the area.'),
      c('|u| · |v|', 'It multiplies side lengths without accounting for their angle, overestimating the area of this parallelogram.')
    ], `Use u = ${tuple(3 * n, 0, 0)} and v = ${tuple(n, 2 * n, 0)} as adjoining sides.`)
  ]],
  // C3 keeps the ministry's two lines-and-planes expectations together in the site's menu.
  ['C3', 'Equations of lines and planes in 2D and 3D', [
    n => w('Read the dimension and equation form', [
      c(`r = (1, 2) + t(${n}, 1)`, 'This is a vector equation for a line in two-space.'),
      c(`${m(n, 'x')} + y = 5`, 'This is a scalar equation for a line in two-space under the stated convention.'),
      c(`r = (1, 0, 2) + t(${n}, 1, −1)`, 'The ordered triples and one free parameter describe a line in three-space.'),
      c(`${m(n, 'x')} + y − z = 4`, 'This single scalar equation in three variables describes a plane.')
    ], 'Use two-space for equations with only x and y, and let t be real.'),
    n => w('How does a second line meet the first in two-space?', [
      c(`y = x + ${n + 1}`, 'It has the same slope and a different intercept, so the lines are parallel and distinct.'),
      c(`x − y = −${n}`, 'Rearranging gives exactly the reference line.'),
      c(`y = −x + ${n}`, 'It crosses the reference at right angles because the two slopes multiply to negative one.'),
      c(`y = 2x + ${n + 1}`, 'It intersects once with unequal slopes that are not negative reciprocals.')
    ], `Compare with the line y = x + ${n}.`),
    n => w('Coincident, parallel, intersecting, or skew lines', [
      c(`r = ${tuple(n, 0, n)} + s(2, 0, 0)`, 'It contains a point of the reference line and has a proportional direction vector, so the two lines coincide.'),
      c(`r = ${tuple(0, n, n)} + s(1, 0, 0)`, 'It has the same direction, but its fixed y-coordinate keeps it disjoint.'),
      c(`r = ${tuple(n, 0, n)} + s(0, 1, 0)`, `It meets the reference at ${tuple(n, 0, n)} because both lines contain that point and their directions differ.`),
      c(`r = ${tuple(0, 0, n + 1)} + s(0, 1, 0)`, 'It has a nonparallel direction yet stays at a different z-value, so the lines are skew.')
    ], `Compare with r = ${tuple(0, 0, n)} + t(1, 0, 0), with both parameters real.`),
    n => w('How can a line meet a plane?', [
      c(`r = ${tuple(n, 0, n)} + t(1, 2, 0)`, 'Its starting point is in the plane and its direction keeps every point there.'),
      c(`r = ${tuple(n, 0, n + 1)} + t(1, 2, 0)`, 'Its constant z-value differs from the plane’s, so there is no intersection.'),
      c(`r = ${tuple(n, 0, 0)} + t(0, 0, 1)`, 'Its direction is parallel to the plane normal, so it meets the plane at right angles.'),
      c(`r = ${tuple(n, 0, 0)} + t(1, 0, 1)`, 'Its z-coordinate reaches the level of the plane once, but its direction is not normal to the plane.')
    ], `Compare each line with the plane z = ${n}.`),
    n => w('Use normal vectors to compare planes', [
      c(`2x + 2y + 2z = ${2 * n}`, 'Its coefficients and constant are all doubled, so it is the same plane.'),
      c(`x + y + z = ${n + 1}`, 'Its normal is unchanged and its offset differs, making it parallel and distinct.'),
      c(`x − y = ${n}`, 'Its normal has dot product zero with the reference normal, so the two planes are perpendicular.'),
      c(`x + y = ${n}`, 'Its normal is neither parallel nor perpendicular to the reference normal, so the planes intersect along a line at an oblique angle.')
    ], `Use three-space and compare each equation with x + y + z = ${n}.`),
    n => w('Three descriptions of the same horizontal plane', [
      c(`z = ${n}`, 'It fixes the height in one scalar equation and leaves both horizontal coordinates free.'),
      c(`r = ${tuple(0, 0, n)} + s(1, 0, 0) + t(0, 1, 0)`, 'It gives the plane as a point plus two independent direction vectors.'),
      c(`x = s, y = t, z = ${n}`, 'It gives the same plane through a separate parametric equation for each coordinate.'),
      c(`z = ${n + 1}`, 'It moves the plane up by one unit while leaving its orientation unchanged.')
    ], `Compare each description with the plane at height ${n}. Both parameters are real.`),
    n => w('The same-looking system in different dimensions', [
      c(`In two-space, solve x = ${n} and y = ${2 * n}.`, 'It fixes both available coordinates and leaves exactly one point.'),
      c(`In three-space, solve x = ${n} and y = ${2 * n}.`, 'It fixes two coordinates and leaves z free, giving a line parallel to the z-axis.'),
      c(`In three-space, solve x = ${n} and x = ${n + 1}.`, 'The two fixed x-values conflict, so the solution set is empty.'),
      c(`In three-space, solve x = ${n} and 2x = ${2 * n}.`, 'The equations are equivalent and leave two coordinates free, giving an entire plane.')
    ]),
    n => w('Distance to an axis, a plane, or the origin', [
      c(`Find the distance from ${tuple(3 * n, 4 * n, 12 * n)} to the x-axis.`, 'The nearest point keeps the x-coordinate and sets the other two to zero, so both y and z contribute to the distance.'),
      c('Find the distance from P to the yz-plane.', 'It is the magnitude of the x-coordinate because the shortest segment is normal to the yz-plane.'),
      c('Find the distance from P to the xy-plane.', 'It is the magnitude of the z-coordinate because the shortest segment is vertical.'),
      c('Find the distance from P to the origin.', `All three coordinates contribute, giving a distance of ${13 * n}.`)
    ], `Use P = ${tuple(3 * n, 4 * n, 12 * n)}.`),
    n => w('Which side of the plane is the point on?', [
      c(`P = ${tuple(6 * n, 0, 0)}`, 'It is the only point on the plane because substituting gives equality.'),
      c('P = (0, 0, 0)', `It lies ${2 * n} units against the chosen normal from the plane, giving a negative signed distance.`),
      c(`P = ${tuple(9 * n, 0, 0)}`, `Its signed distance is +${n}. The change in x alone projects onto the plane normal.`),
      c(`P = ${tuple(0, 0, 6 * n)}`, `It is farthest on the positive side, with signed distance +${2 * n}.`)
    ], `Use the plane x + 2y + 2z = ${6 * n} and take the direction of ${tuple(1, 2, 2)} as positive.`)
  ]]
];

export const mcv4u = buildBank([
  ['Rate of Change', rateOfChange],
  ['Derivatives and Their Applications', derivativesApps],
  ['Geometry and Algebra of Vectors', vectors]
]);
