import { buildBank, card as c, set as w, table, graph, offset as o } from './sets.mjs';

// Skeleton bank for Ontario MCV4U (Calculus and Vectors).
// Each expectation currently has 1 starter pattern (5 sets via buildBank's [1..5] multiplier).
// Expand each expectation to 7 patterns (7 × 5 = 35 sets) to match MCR3U/MHF4U.

const rateOfChange = [
  ['A1', 'Average and instantaneous rate of change, and limits', [
    n => w('Limits as x approaches a', [
      c(`lim(x→${n}) (x² − ${n * n})/(x − ${n})`, `Only limit with a removable 0/0 discontinuity (evaluates to ${2 * n}).`),
      c(`lim(x→${n}) (x + ${n})`, `Only polynomial limit evaluated by direct substitution (also equals ${2 * n}).`),
      c(`lim(x→${n}) 1/(x − ${n})`, 'Only limit that does not exist (infinite discontinuity / vertical asymptote).'),
      c(`lim(x→0) (sin(${n}x))/x`, `Only trigonometric limit (evaluates to ${n}, approaching 0 instead of ${n}).`)
    ])
  ]],
  ['A2', 'Derivatives of polynomial, exponential, and sinusoidal functions', [
    n => w('Four derivative rules', [
      c(`d/dx (x^${n + 1}) = ${n + 1}x^${n}`, 'Only power-rule derivative.'),
      c(`d/dx (e^(${n}x)) = ${n}e^(${n}x)`, 'Only exponential derivative.'),
      c(`d/dx (sin(${n}x)) = ${n}cos(${n}x)`, 'Only trigonometric derivative.'),
      c(`d/dx (${n}x + 1) = ${n}`, 'Only constant derivative (linear original function).')
    ])
  ]],
  ['A3', 'Product, quotient, and chain rules', [
    n => w('Choose a differentiation rule', [
      c(`y = x^${n} · sin(x)`, 'Only function requiring the product rule.'),
      c(`y = (x + ${n})/(x² + 1)`, 'Only function requiring the quotient rule.'),
      c(`y = (x² + ${n})^3`, 'Only composite function requiring the chain rule.'),
      c(`y = x^${n} + sin(x)`, 'Only sum of basic terms (no product, quotient, or chain rule needed).')
    ])
  ]]
];

const derivativesApps = [
  ['B1', 'Slope of tangents, increasing/decreasing, and extrema', [
    n => w('Sign of the first derivative', [
      c(graph(x => x * x - n, [-4, 4], [-5, 6], `Parabola opening up with vertex (0, −${n}).`), 'Only graph with a local minimum at x = 0.'),
      c(graph(x => -x * x + n, [-4, 4], [-5, 6], `Parabola opening down with vertex (0, ${n}).`), 'Only graph with a local maximum at x = 0.'),
      c(graph(x => x ** 3, [-3, 3], [-8, 8], 'Cubic curve with horizontal inflection at (0, 0).'), 'Only graph where f\'(0) = 0 is neither a max nor a min.'),
      c(table(['x', -1, 0, 1], ["f'(x)", -n, 0, n]), 'Only table of derivative values rather than a graph.')
    ])
  ]],
  ['B2', 'Concavity, inflection points, and curve sketching', [
    n => w('Second derivative clues', [
      c(`f''(x) = ${2 * n}`, 'Only function with constant positive concavity (always concave up).'),
      c(`f''(x) = −${2 * n}`, 'Only function with constant negative concavity (always concave down).'),
      c(`f''(x) = ${6 * n}x`, 'Only function with an inflection point at x = 0.'),
      c(`f''(x) = ${n}x²`, 'Only function where f\'\'(0) = 0 without changing concavity.')
    ])
  ]],
  ['B3', 'Optimization and related-rates applications', [
    n => w('Compare rate models', [
      c(`A(x) = x(${10 * n} − x)`, 'Only area optimization model (quadratic with a maximum).'),
      c(`C(x) = ${n}x + ${100 * n}/x, x > 0`, 'Only cost optimization model with a rational term.'),
      c(`dV/dt = 4πr² · dr/dt`, 'Only related-rates equation connecting two rates of change.'),
      c(`v(t) = 3t²${o(-6 * n)}t`, 'Only kinematics velocity function.')
    ])
  ]]
];

const vectors = [
  ['C1', 'Geometric and Cartesian vectors in 2D and 3D', [
    n => w('Four Cartesian vectors', [
      c(`u = (${n}, 0)`, 'Only 2D vector lying on the x-axis.'),
      c(`v = (${n}, ${n})`, 'Only 2D vector on the line y = x (45° direction).'),
      c(`w = (${n}, ${n}, ${n})`, 'Only 3D vector (in ℝ³).'),
      c(`z = (0, 0, 0)`, 'Only zero vector (has zero magnitude and undefined direction).')
    ])
  ]],
  ['C2', 'Dot product, cross product, and projections', [
    n => w('Vector products and angles', [
      c(`(${n}, 0) · (0, ${n}) = 0`, 'Only orthogonal dot product (equals scalar 0).'),
      c(`(${n}, 0, 0) × (0, ${n}, 0) = (0, 0, ${n * n})`, 'Only cross product (produces a vector in ℝ³).'),
      c(`(${n}, 0) · (${n}, 0) = ${n * n}`, 'Only dot product of parallel vectors (equals |u|²).'),
      c(`proj_u(v)`, 'Only vector projection expression.')
    ])
  ]],
  ['C3', 'Equations of lines and planes in 2D and 3D', [
    n => w('Lines and planes', [
      c(`r = (1, 2) + t(${n}, 1)`, 'Only vector equation of a line in ℝ².'),
      c(`${n}x + y = 5`, 'Only scalar/Cartesian equation of a line in ℝ².'),
      c(`r = (1, 0, 2) + t(${n}, 1, −1)`, 'Only vector equation of a line in ℝ³.'),
      c(`${n}x + y − z = 4`, 'Only Cartesian equation of a plane in ℝ³.')
    ])
  ]]
];

export const mcv4u = buildBank([
  ['Rate of Change', rateOfChange],
  ['Derivatives and Their Applications', derivativesApps],
  ['Geometry and Algebra of Vectors', vectors]
]);
