import { buildBank, card as c, set as w, table, graph, factor as f, shift as s,
  offset as o, signed as m, power as p, log, num, point, interval } from './sets.mjs';

const expLog = [
  ['A1', 'Logarithm meaning, evaluation and laws', [
    n => { const b = n + 1; return w('Four logarithms, one base', [
      c(log(b, b ** 2), 'It is the only logarithm whose value is a positive integer.'),
      c(log(b, 1), 'It is zero because any positive base raised to zero gives 1.'),
      c(log(b, `1/${b}`), 'It is negative because its argument is between 0 and 1.'),
      c(log(b, `√${b}`), 'It has value 1/2 because its argument is a square root of the base.')
    ]); },
    n => { const b = n + 1; const l = argument => log(b, argument); return w('Combine logarithms', [
      c(`${l(b ** 2)} + ${l(b ** 2)}`, 'Combining the terms multiplies the arguments and gives 4.'),
      c(`${l(b ** 2)} − ${l(b)}`, 'Combining the terms divides the arguments and gives 1.'),
      c(`3${l(b ** 2)}`, 'The outside multiplier becomes an exponent on the argument. The value is 6.'),
      c(`${l(b)} / ${l(b ** 2)}`, 'It divides two logarithm values, giving 1/2.')
    ]); },
    n => { const b = n + 1; return w('Equivalent equations in exponential and logarithmic form', [
      c(`${b}³ = ${b ** 3}`, 'It states the relationship in exponential form.'),
      c(`${log(b, b ** 3)} = 3`, 'Its logarithm asks for the exponent on the original base.'),
      c(`${log(b ** 3, b)} = 1/3`, 'Its base and argument swap roles, so the logarithm is the reciprocal.'),
      c(`${log(b, b ** 3)} = 1/3`, 'It is the only false equation.')
    ]); },
    n => { const b = n + 1; return w('Test the argument of each logarithm', [
      c(log(b, b - 1), 'It is defined and has value at least 0 and less than 1.'),
      c(log(b, 0), 'Its argument is zero, which is outside the real logarithm domain.'),
      c(log(b, -b), 'Its negative argument is outside the real logarithm domain.'),
      c(log(b, b + 1), 'It is defined and greater than 1 because its argument exceeds the base.')
    ]); },
    n => { const b = n + 1; return w('Re-express an exact logarithm', [
      c(log(b, b ** 4), 'It is the only single logarithm and evaluates to 4.'),
      c(`2${log(b, b ** 2)}`, 'It obtains 4 by multiplying the value of a logarithm by 2.'),
      c(`${log(b, b ** 3)} + ${log(b, b)}`, 'It obtains 4 by adding logarithm values.'),
      c(`${log(b, b ** 3)} − ${log(b, b)}`, 'It is the only expression whose value is 2.')
    ]); },
    n => { const b = n + 1; return w('When a log law applies', [
      c(`${log(b, 'uv')} = ${log(b, 'u')} + ${log(b, 'v')}`, 'It is the product law when each argument is positive.'),
      c(`${log(b, 'u/v')} = ${log(b, 'u')} − ${log(b, 'v')}`, 'It is the quotient law.'),
      c(`${log(b, 'u²')} = 2${log(b, 'u')}`, 'It is the power law.'),
      c(`${log(b, 'u + v')} = ${log(b, 'u')} + ${log(b, 'v')}`, 'It fails in general. Taking u = v = 1 gives a nonzero value on the left and zero on the right.')
    ], 'Assume u and v are positive.'); },
    n => { const b = n + 1; return w('Compare arguments above and below 1', [
      c(log(b, `1/${b ** 2}`), 'It is the only logarithm equal to −2.'),
      c(log(b, `1/√${b}`), 'It is the only logarithm equal to −1/2.'),
      c(log(b, b ** 2), 'It is the only logarithm equal to 2.'),
      c(log(b, `√${b}`), 'It is the only logarithm equal to 1/2.')
    ]); }
  ]],
  ['A2', 'Logarithmic graphs, equations and representations', [
    n => w('Transformations of the logarithm graph', [
      c(`y = ${log(2, s('x', n))}`, 'Its vertical asymptote is on the positive side of the y-axis.'),
      c(`y = ${log(2, s('x', -n))}`, 'Its vertical asymptote is on the negative side of the y-axis.'),
      c(`y = ${log(2, 'x')}${o(n)}`, 'Its transformation is a vertical translation.'),
      c(`y = ${log(2, '−x')}`, 'It is defined only for negative x.')
    ]),
    n => { const y = x => Math.log2(x); return w('Read four logarithmic graphs', [
      c(graph(y, [-5, 9], [-6, 6], 'Increasing only for x > 0; asymptote x = 0 and x-intercept 1.'), 'It increases to the right of x = 0 and crosses at x = 1.'),
      c(graph(x => -y(x), [-5, 9], [-6, 6], 'Decreasing only for x > 0; asymptote x = 0 and x-intercept 1.'), 'It is the only decreasing curve on x > 0.'),
      c(graph(x => y(x - n), [-5, 9], [-6, 6], `Increasing for x > ${n}; asymptote x = ${n}.`, { breaks: [n] }), 'Its vertical asymptote lies to the right of the y-axis.'),
      c(graph(x => y(-x), [-5, 9], [-6, 6], 'Decreasing only for x < 0; asymptote x = 0 and x-intercept −1.'), 'It lies entirely to the left of the y-axis.')
    ]); },
    n => { const b = n + 1; return w('An exponential and its logarithmic inverse', [
      c(`y = ${b}ˣ`, 'It is the only exponential equation and has horizontal asymptote y = 0.'),
      c(`y = ${log(b, 'x')}`, 'It reflects the exponential graph across y = x.'),
      c(`y = −${log(b, 'x')}`, 'It is the only decreasing rule.'),
      c(table(['x', 1, b, b ** 2], ['y', 0, 1, 2]), 'It is the only table. Its columns give the original logarithmic graph at three inputs.')
    ]); },
    n => w('Match a logarithmic table', [
      c(table(['x', 1, 2, 4], ['y', n, n + 1, n + 2]), 'It shows a unit increase in output whenever the input doubles.'),
      c(`y = ${log(2, 'x')}${o(n)}`, 'It is the only equation that fits every column.'),
      c(`y = ${log(2, 'x')}${o(-n)}`, 'It is the only rule with its x-intercept to the right of x = 1.'),
      c(`y = ${log(2, s('x', -n))}`, 'It is the only rule with a negative vertical asymptote location.')
    ]),
    n => { const b = n + 1; return w('Logarithmic intercepts', [
      c(`y = ${log(b, 'x')}`, 'Its zero is exactly x = 1 and its domain is x > 0.'),
      c(`y = ${log(b, 'x')} + 1`, 'It has the only positive x-intercept strictly less than 1.'),
      c(`y = ${log(b, 'x')} − 1`, 'Its x-intercept is the base of the logarithm.'),
      c(`y = ${log(b, 'x + 1')}`, 'It is the only one that crosses both coordinate axes.')
    ]); },
    n => w('Same asymptote, different direction or pace', [
      c(`y = ${log(2, 'x')}${o(n)}`, 'Its positive coefficient is 1 and its output rises by 1 when x doubles.'),
      c(`y = 2${log(2, 'x')}${o(n)}`, 'Its rise when x doubles is the largest.'),
      c(`y = −${log(2, 'x')}${o(n)}`, 'It is the only curve decreasing across its domain.'),
      c(`y = ${log(4, 'x')}${o(n)}`, 'It is the only equation with base 4 and rises by 1/2 when x doubles.')
    ]),
    n => w('Where do a line and a logarithm meet?', [
      c(`y = ${n}`, 'The intersection occurs at x = 1.'),
      c(`y = ${n + 1}`, 'The intersection is one unit higher and occurs at x = 2.'),
      c(`y = ${n - 1}`, 'The intersection has an x-coordinate between 0 and 1.'),
      c('x = 0', 'It is the vertical asymptote, so it never meets the curve.')
    ], `Compare each line with y = ${log(2, 'x')}${o(n)}.`)
  ]],
  ['A3', 'Exponential and logarithmic equations and applications', [
    n => { const b = n + 1; return w('Isolate the exponential', [
      c(`${b}ˣ = ${b ** 2}`, 'Its solution is x = 2 by rewriting both sides with the same base.'),
      c(`${b}ˣ = ${b ** 3}`, 'Its solution is x = 3.'),
      c(`${b}ˣ = 1/${b}`, 'It has the only negative solution.'),
      c(`${b}ˣ = −${b}`, 'It has no real solution because the exponential is positive.')
    ]); },
    n => w('Solve and check the logarithm domain', [
      c(`${log(2, s('x', n))} = 0`, `Its argument must be 1, so x = ${n + 1}.`),
      c(`${log(2, s('x', n))} = 1`, `Its argument must be 2, so x = ${n + 2}.`),
      c(`${log(2, s('x', n))} = −1`, 'Its solution is strictly between the vertical asymptote and x-intercept.'),
      c(`${log(2, s('x', n))} = ${log(2, s('x', n + 1))}`, 'It has no solution because the two arguments differ by 1 throughout the common domain.')
    ]),
    n => w('Time to reach a target population', [
      c(`${100 * n} · 2ᵗ = ${300 * n}`, 'It asks when the population triples and gives t = log₂(3).'),
      c(`${100 * n} · 2ᵗ = ${400 * n}`, 'It asks when the population quadruples and has an integer solution.'),
      c(`${100 * n} · 2ᵗ = ${50 * n}`, 'The algebra gives t = −1, so the target is impossible after measurements start.'),
      c(`${100 * n} · 2^(t/2) = ${300 * n}`, 'It has the same target as the tripling equation but takes twice as long.')
    ], 'Time t ≥ 0 is measured in hours.'),
    n => w('Exponential equations with a shared side', [
      c(`2ˣ = 2^(x + ${n})`, 'It has no solution because the right side is a larger constant multiple of the left.'),
      c(`2ˣ = 2^(${2 * n} − x)`, `It has the unique solution x = ${n} after equating exponents.`),
      c(`2ˣ = 2ˣ + ${n}`, 'It has no solution because the two graphs differ by a constant vertical translation.'),
      c(`2ˣ = 4^(x/${2 * n + 2})`, 'It has the unique solution x = 0 after rewriting the right side with base 2.')
    ]),
    n => w('Logarithmic equations that become quadratics', [
      c(`${log(2, s('x', n))} + ${log(2, s('x', n))} = 2`, `The product law squares the argument. The original logarithms require x > ${n}, so just x = ${n + 2} works.`),
      c(`${log(2, p(f(n), 2))} = 2`, 'The argument is a square, so both x-values at distance 2 from the shift are allowed.'),
      c(`${log(2, s('x', n))} − ${log(2, s('x', n + 1))} = 1`, 'The quotient law leads to a linear equation. Its solution is in the common domain.'),
      c(`${log(2, s('x', n))} + ${log(2, `${n} − x`)} = 2`, 'Its two logarithms have no common domain.')
    ]),
    n => w('Read pH changes', [
      c(`[H⁺] = 10⁻${p('', n)}, find pH`, 'It takes a logarithm to obtain pH directly.'),
      c(`pH = ${n + 1}, find [H⁺]`, 'It converts from a logarithmic value to a concentration.'),
      c(`pH changes from ${n} to ${n + 2}`, 'It corresponds to a hundredfold decrease in hydrogen ion concentration.'),
      c(`pH changes from ${n + 1} to ${n}`, 'It is the only change that increases hydrogen ion concentration.')
    ], 'Use pH = −log₁₀([H⁺]).'),
    n => w('Balance equations with monthly interest', [
      c(`${1000 * n}(1.01)ᵗ = ${1300 * n}`, 'It gives t = log(1.30)/log(1.01).'),
      c(`${1000 * n}(1.01)ᵗ = ${1500 * n}`, 'It has a higher target and takes longer than a 30% increase at the same rate.'),
      c(`${1000 * n}(1.02)ᵗ = ${1300 * n}`, 'It reaches the same 30% increase sooner due to the higher monthly rate.'),
      c(`${1000 * n}(0.99)ᵗ = ${1300 * n}`, 'Its balance declines at t ≥ 0, so the target is impossible after the initial deposit.')
    ], 'Here t represents elapsed months. Compare continuous solutions before rounding to a whole month.')
  ]]
];

const trig = [
  ['B1', 'Radian measure, arc length and angular speed', [
    n => w('Recognize equivalent angle measures', [
      c(`${15 * n}°`, 'It is the only angle expressed in degrees.'),
      c(`${n}π/12 rad`, 'It is the direct conversion of the degree angle to radians.'),
      c(`${n}π/6 rad`, 'Its radian measure is twice the smaller positive measure.'),
      c(`−${n}π/12 rad`, 'Its angle is measured in the negative direction.')
    ]),
    n => w('Arc lengths from radius and angle', [
      c(`r = ${n} cm, θ = π/2 rad`, 'It sweeps a quarter-circle with the smaller radius.'),
      c(`r = ${n} cm, θ = π rad`, 'It sweeps a semicircle and has the same arc length as the quarter-circle with twice its radius.'),
      c(`r = ${2 * n} cm, θ = π/2 rad`, 'It generates the same arc length as the semicircle with half its radius.'),
      c(`r = ${n} cm, θ = 2π rad`, 'It is an entire circumference and has the greatest arc length.')
    ]),
    n => w('Angular and linear speed', [
      c(`r = ${n} m, ω = π rad/s`, 'It travels half a turn in one second with the smaller radius.'),
      c(`r = ${n} m, ω = 2π rad/s`, 'It is the only model that completes a turn in exactly one second.'),
      c(`r = ${2 * n} m, ω = π rad/s`, 'It has the same linear speed as the one-turn-per-second model, but half the angular speed.'),
      c(`r = ${2 * n} m, ω = π/4 rad/s`, 'It has the smallest angular speed and linear speed.')
    ], 'Compare points rotating on circles; their linear speed is rω.'),
    n => w('Positive, negative and coterminal', [
      c(`π/${n + 2}`, 'It is the only angle in the interval from 0 to π/2.'),
      c(`2π + π/${n + 2}`, 'It makes an extra positive turn to reach the same terminal ray as the smallest positive angle.'),
      c(`π/${n + 2} − 2π`, 'It is the only negative angle and still reaches the same terminal ray.'),
      c(`π − π/${n + 2}`, 'It is the only angle whose terminal ray is in quadrant II.')
    ], 'All angles are in radians.'),
    n => w('Compare lengths with angle measures', [
      c(`Arc length ${n} cm on a circle of radius ${n} cm`, 'The arc and radius have equal length, defining one radian.'),
      c(`Arc length ${2 * n} cm on a circle of radius ${n} cm`, 'It has a central angle of two radians.'),
      c(`Arc length ${n} cm on a circle of radius ${2 * n} cm`, 'The arc is half as long as the radius, giving half a radian.'),
      c(`Arc length ${2 * n}π cm on a circle of radius ${n} cm`, 'The entire circumference gives a full turn.')
    ]),
    n => w('Find the angle a wheel turns', [
      c(`${n} m of travel, radius ${n} m`, 'The ratio of distance to radius is exactly one radian.'),
      c(`${n}π m of travel, radius ${n} m`, 'The wheel turns through π radians.'),
      c(`${2 * n}π m of travel, radius ${n} m`, 'The wheel makes exactly one full turn.'),
      c(`${n} m of travel, radius ${2 * n} m`, 'It gives the smallest positive angle.')
    ], 'Assume each wheel rolls without slipping.'),
    n => w('Compare sectors of circles', [
      c(`Radius ${n} cm, angle π/2 rad`, 'It is exactly one quarter of its circle.'),
      c(`Radius ${n} cm, angle π rad`, 'It is a semicircle.'),
      c(`Radius ${2 * n} cm, angle π/4 rad`, 'It has the smallest angle but the same area as the semicircle.'),
      c(`Radius ${n} cm, angle 2π rad`, 'It is the only full disk.')
    ])
  ]],
  ['B2', 'Trigonometric functions, graphs and reciprocals', [
    n => w('Periods and vertical asymptotes', [
      c(`y = sin(${n}x)`, 'It is bounded and equals zero at x = 0.'),
      c(`y = cos(${n}x)`, 'It is bounded and has value 1 at x = 0.'),
      c(`y = tan(${n}x)`, 'It is unbounded and its period is half that of sine and cosine here.'),
      c(`y = csc(${n}x)`, 'Its reciprocal relationship with sine gives vertical asymptotes at the zeros of sine, including x = 0.')
    ], 'Use radians.'),
    n => { const bounds = { xStep: Math.PI / 2, xLabels: ['−π', '−π/2', '0', 'π/2', 'π'], yStep: 2 }; return w('Sine, cosine and reciprocals on one scale', [
      c(graph(x => n * Math.sin(x), [-Math.PI, Math.PI], [-8, 8], `Sine wave of amplitude ${n} through the origin.`, bounds), 'It is the only bounded graph that passes through the origin.'),
      c(graph(x => n * Math.cos(x), [-Math.PI, Math.PI], [-8, 8], `Cosine wave of amplitude ${n} with maximum at x = 0.`, bounds), 'It is bounded and attains its maximum at x = 0.'),
      c(graph(x => n / Math.cos(x), [-Math.PI, Math.PI], [-8, 8], 'Secant-shaped branches with asymptotes at ±π/2.', { ...bounds, breaks: [-Math.PI / 2, Math.PI / 2] }), 'It has vertical asymptotes where cosine is zero.'),
      c(graph(x => n / Math.sin(x), [-Math.PI, Math.PI], [-8, 8], 'Cosecant-shaped branches with asymptotes at −π, 0 and π.', { ...bounds, breaks: [-Math.PI, 0, Math.PI] }), 'It has a vertical asymptote at x = 0.')
    ], 'The horizontal axis measures radians.'); },
    n => w('Exact values on the unit circle', [
      c(`sin(π/6 + ${2 * n}π)`, 'Its value is 1/2.'),
      c(`cos(π/6 + ${2 * n}π)`, 'Its value is √3/2.'),
      c(`csc(π/6 + ${2 * n}π)`, 'Its value is exactly 2.'),
      c(`tan(π/6 + ${2 * n}π)`, 'It is the only quotient of sine and cosine here.')
    ]),
    n => w('Symmetry of trig functions', [
      c(`y = sin(${n}x)`, 'It is odd, continuous everywhere, and bounded.'),
      c(`y = cos(${n}x)`, 'It is even and defined for every real x.'),
      c(`y = sec(${n}x)`, 'It is even but has excluded inputs.'),
      c(`y = tan(${n}x)`, 'It is odd and unbounded.')
    ]),
    n => w('Frequency, phase and reflection in radians', [
      c(`y = ${m(n, 'sin')}(2x)`, 'It completes two cycles in 2π and passes upward through the origin.'),
      c(`y = ${m(n, 'sin')}(x)`, 'It is the only rule with period 2π.'),
      c(`y = ${m(n, 'sin')}(2x − π/2)`, 'Its value at x = 0 is its minimum.'),
      c(`y = ${m(-n, 'sin')}(2x)`, 'It passes downward through the origin.')
    ]),
    n => w('Compare outputs at a quarter-turn', [
      c(`sin(π/2 + ${2 * n}π)`, 'Its value is 1 because sine reaches its maximum.'),
      c(`cos(π/2 + ${2 * n}π)`, 'Its value is zero.'),
      c(`tan(π/2 + ${2 * n}π)`, 'It is undefined because sine is divided by zero cosine.'),
      c(`sec(π/2 + ${2 * n}π)`, 'Its reciprocal formula has numerator 1 and denominator zero.')
    ]),
    n => w('What changes in the range?', [
      c(`y = ${m(n, 'sin')}(x)`, `Its full range runs from −${n} to ${n}.`),
      c(`y = ${m(n, 'sin')}(x) + ${n}`, 'It stays nonnegative and includes zero.'),
      c(`y = ${m(n, 'csc')}(x)`, 'It has two unbounded range intervals separated by a gap around zero.'),
      c(`y = ${m(n, 'tan')}(x)`, 'Its range is all real numbers and it has vertical asymptotes.')
    ])
  ]],
  ['B3', 'Trigonometric equations and identities', [
    n => w('How many sine solutions?', [
      c(`sin x = ${n}/${n + 1}`, 'It has two solutions in the upper half of the unit circle.'),
      c(`sin x = −${n}/${n + 1}`, 'It has two solutions in the lower half of the unit circle.'),
      c(`sin x = 1`, 'It has exactly one solution, at the maximum of sine.'),
      c(`sin x = ${n + 1}/${n}`, 'It has no solution because its right side exceeds 1.')
    ], 'Use 0 ≤ x < 2π.'),
    n => w('Use identities or find a counterexample', [
      c('sin(2x) = 2sin x cos x', 'It is the sine double-angle identity.'),
      c(`cos(2x) = 1 − 2sin² x`, 'It rewrites the cosine double-angle identity using sine alone.'),
      c(`cos(2x) = 2cos² x − 1`, 'It rewrites the cosine double-angle identity using cosine alone.'),
      c(`sin(2x) = ${2 * n + 2}sin x cos x`, 'It fails, for example at x = π/4.')
    ], 'Which of these proposed double-angle rules hold for every real x?'),
    n => w('Compound-angle statements', [
      c(`sin(x + π/${n + 2}) = sin x cos(π/${n + 2}) + cos x sin(π/${n + 2})`, 'It correctly expands sine of a sum.'),
      c(`sin(x − π/${n + 2}) = sin x cos(π/${n + 2}) − cos x sin(π/${n + 2})`, 'It correctly expands sine of a difference.'),
      c(`cos(x + π/${n + 2}) = cos x cos(π/${n + 2}) − sin x sin(π/${n + 2})`, 'It correctly expands cosine of a sum.'),
      c(`cos(x + π/${n + 2}) = cos x + cos(π/${n + 2})`, 'It is false already at x = 0.')
    ]),
    n => w('Quadratics in a trigonometric ratio', [
      c(`${n}(2sin x − 1)(2sin x + 1) = 0`, 'Both factors give attainable, opposite nonzero values of sine; four solutions result.'),
      c(`${n}(sin x − 1)(sin x + 1) = 0`, 'Both solutions occur at sine extrema.'),
      c(`${n}(sin x − 2)(sin x + 2) = 0`, 'Neither factor can be zero for a real x.'),
      c(`${n}sin² x = 0`, 'Its repeated factor gives only the zeros of sine.')
    ], 'Use 0 ≤ x < 2π.'),
    n => w('Check domain before dividing', [
      c(`tan(${n}x) = sin(${n}x)/cos(${n}x)`, 'It is the quotient identity and excludes zeros of cosine.'),
      c(`cot(${n}x) = cos(${n}x)/sin(${n}x)`, 'It excludes zeros of sine instead.'),
      c(`sin²(${n}x) + cos²(${n}x) = 1`, 'It is valid for every real x.'),
      c(`tan(${n}x) = cos(${n}x)/sin(${n}x)`, 'It is false in general even where both sides are defined.')
    ]),
    n => w('Sine and cosine at the same input', [
      c(`sin(${n}x) = cos(${n}x)`, 'The two values match in sign, so the solutions lie in quadrants I and III for the angle nx.'),
      c(`sin(${n}x) = −cos(${n}x)`, 'The two values have opposite signs; the solutions lie in quadrants II and IV for nx.'),
      c(`sin(${n}x) = cos(${n}x) + 2`, 'There is no real solution because the largest possible difference is √2.'),
      c(`sin²(${n}x) = cos²(${n}x)`, 'It includes both same-sign and opposite-sign solutions.')
    ]),
    n => w('Solve with the fundamental identity', [
      c(`sin² x + cos² x = ${n}/${n}`, 'It is true for every x.'),
      c(`sin² x + cos² x = ${n + 1}/${n}`, 'It is never true.'),
      c(`${n}sin² x = 0`, 'On the stated interval its solutions include x = 0.'),
      c(`${n}cos² x = 0`, 'On the stated interval its solutions are π/2 and 3π/2.')
    ], 'Use 0 ≤ x < 2π.')
  ]]
];

const polyRat = [
  ['C1', 'Polynomial features and representations', [
    n => w('End behaviour from the leading term', [
      c(`y = ${n}x³ + x`, 'It has odd degree and a positive leading coefficient: left down, right up.'),
      c(`y = −${n}x³ + x`, 'It has odd degree and a negative leading coefficient: left up, right down.'),
      c(`y = ${n}x⁴ + x`, 'It has even degree and both ends point up.'),
      c(`y = −${n}x⁴ + x`, 'It has even degree and both ends point down.')
    ]),
    n => w('Read multiplicity in factored form', [
      c(`y = ${p(f(n), 2)}${f(-n)}`, 'It touches at the positive root and crosses at the negative root.'),
      c(`y = ${f(n)}${p(f(-n), 2)}`, 'It crosses at the positive root and touches at the negative root.'),
      c(`y = ${p(f(n), 3)}${f(-n)}`, 'It has a flattened crossing at its positive root.'),
      c(`y = ${p(f(n), 2)}${p(f(-n), 2)}`, 'It touches rather than crosses at both roots.')
    ]),
    n => w('Finite differences', [
      c(table(['x', 0, 1, 2, 3, 4], ['y', 0, n, 2 * n, 3 * n, 4 * n]), 'Its first differences are constant and nonzero.'),
      c(table(['x', 0, 1, 2, 3, 4], ['y', 0, n, 4 * n, 9 * n, 16 * n]), 'Its second differences are constant and nonzero.'),
      c(table(['x', 0, 1, 2, 3, 4], ['y', 0, n, 8 * n, 27 * n, 64 * n]), 'Its third differences are constant and nonzero.'),
      c(table(['x', 0, 1, 2, 3, 4], ['y', n, 2 * n, 4 * n, 8 * n, 16 * n]), 'Its consecutive outputs have a constant ratio of 2.')
    ]),
    n => w('Polynomial graphs near the origin', [
      c(graph(x => x ** 3 / n, [-4, 4], [-5, 5], 'Cubic crossing with horizontal tangent at the origin.'), 'Its graph crosses the origin with a horizontal tangent.'),
      c(graph(x => x ** 2 / n, [-4, 4], [-5, 5], 'Upward parabola touching the origin.'), 'Its graph touches the x-axis from above.'),
      c(graph(x => -(x ** 2) / n, [-4, 4], [-5, 5], 'Downward parabola touching the origin.'), 'Its graph touches the x-axis from below.'),
      c(graph(x => x / n, [-4, 4], [-5, 5], 'Straight rising line through the origin.'), 'Its graph crosses the origin at constant nonzero slope.')
    ]),
    n => w('Count the distinct real zeros', [
      c(`y = (x² + ${n * n})²`, 'It has no real zero.'),
      c(`y = ${p(f(n), 4)}`, 'It has one distinct real zero of multiplicity four.'),
      c(`y = (x² − ${n * n})²`, 'It has two distinct real zeros, both of even multiplicity.'),
      c(`y = x${f(n)}${f(-n)}`, 'It has three distinct real zeros, all of odd multiplicity.')
    ]),
    n => w('Polynomial symmetry', [
      c(`y = ${n}x⁴ + x² + 1`, 'It is even and symmetric about the y-axis.'),
      c(`y = ${n}x³ + x`, 'It is odd and symmetric about the origin.'),
      c(`y = ${n}x³ + 1`, 'It is a vertical translation of an odd function.'),
      c(`y = ${n}x² + x`, 'Its quadratic symmetry axis lies to the left of the y-axis.')
    ]),
    n => w('Which rule could be a polynomial?', [
      c(`y = ${n}x⁴ − x² + 1`, 'It is the only polynomial rule; every power of x is a nonnegative integer.'),
      c(`y = ${n}/x² + 1`, 'It has a negative exponent when rewritten and is rational.'),
      c(`y = ${n} · 2ˣ + 1`, 'Its variable appears in an exponent.'),
      c(`y = ${n}sin x + 1`, 'It is periodic and sinusoidal.')
    ])
  ]],
  ['C2', 'Rational graphs, asymptotes, holes and intercepts', [
    n => w('Holes and vertical asymptotes', [
      c(`y = 1/${f(n)}`, 'It has a vertical asymptote and no zeros.'),
      c(`y = ${f(n)}²/${f(n)}`, 'It has a hole on the x-axis, since cancelling leaves a line whose zero is excluded.'),
      c(`y = ${f(n + 1)}/${f(n)}`, 'It has both a vertical asymptote and a zero.'),
      c(`y = ${f(n)} / ${f(n)}`, 'Its graph is a constant with one point removed.')
    ]),
    n => w('What happens far from the origin?', [
      c(`y = 1/${f(n)}`, 'Its horizontal asymptote is the x-axis.'),
      c(`y = 2 + 1/${f(n)}`, 'Its horizontal asymptote lies above the x-axis.'),
      c(`y = −2 + 1/${f(n)}`, 'Its horizontal asymptote lies below the x-axis.'),
      c(`y = x + 1/${f(n)}`, 'Its asymptote is slanted.')
    ]),
    n => w('Approach an asymptote from both sides', [
      c(`y = 1/${f(n)}²`, 'Both branches tend to positive infinity near the excluded input.'),
      c(`y = −1/${f(n)}²`, 'Both branches tend to negative infinity near the excluded input.'),
      c(`y = 1/${f(n)}`, 'The right branch tends to positive infinity and the left to negative infinity.'),
      c(`y = −1/${f(n)}`, 'The left branch tends to positive infinity and the right to negative infinity.')
    ]),
    n => w('Read reciprocal graphs', [
      c(graph(x => n / x, [-6, 6], [-6, 6], 'Reciprocal in quadrants I and III, asymptotes on both axes.', { breaks: [0] }), 'It has branches in quadrants I and III and is symmetric about the origin.'),
      c(graph(x => -n / x, [-6, 6], [-6, 6], 'Reciprocal in quadrants II and IV, asymptotes on both axes.', { breaks: [0] }), 'Its branches lie in quadrants II and IV.'),
      c(graph(x => n / (x - 2), [-6, 6], [-6, 6], 'Reciprocal with vertical asymptote x = 2 and horizontal asymptote y = 0.', { breaks: [2] }), 'Its vertical asymptote has shifted to the right.'),
      c(graph(x => n / (x * x), [-6, 6], [-6, 6], 'Two positive reciprocal branches, symmetric about the y-axis.', { breaks: [0] }), 'Both branches lie strictly above the x-axis.')
    ]),
    n => w('What does the graph exclude?', [
      c(`y = 1/${f(n)}`, `It excludes both x = ${n} and y = 0.`),
      c(`y = 1/${f(n)} + ${n}`, `It excludes x = ${n} and y = ${n}.`),
      c(`y = 1/${f(-n)} + ${n}`, 'It has a vertical asymptote at a negative x-value.'),
      c(`y = (x² + ${n * n})/(x² + 1)`, 'It is defined for every real x.')
    ]),
    n => w('Can the rational graph cross y = 0?', [
      c(`y = ${f(2 * n)}/${f(n)}`, 'It has one allowed x-intercept at a positive x-value.'),
      c(`y = ${f(-n)}/${f(n)}`, 'It has one allowed x-intercept at a negative x-value.'),
      c(`y = ${f(n)} / ${f(n)}`, 'Its apparent zero is removed from the domain by cancellation.'),
      c(`y = (x² + ${n * n})/${f(n)}`, 'Its numerator is never zero for real x.')
    ]),
    n => w('Rational functions with two critical inputs', [
      c(`y = 1/(${f(n)}${f(-n)})`, 'Both excluded values generate vertical asymptotes.'),
      c(`y = ${f(n)}/(${f(n)}${f(-n)})`, 'The positive excluded input is a hole.'),
      c(`y = ${f(-n)}/(${f(n)}${f(-n)})`, 'The negative excluded input is a hole.'),
      c(`y = (x² − ${n * n})/(x² − ${n * n})`, 'Both excluded inputs are holes on a horizontal line.')
    ])
  ]],
  ['C3', 'Polynomial and rational equations', [
    n => w('Factor and count the solutions', [
      c(`x${f(n)}${f(-n)} = 0`, 'It has three distinct real solutions including zero.'),
      c(`${f(n)}²${f(-n)} = 0`, 'It has two distinct real solutions with one repeated root.'),
      c(`(x² + ${n * n})${f(n)} = 0`, 'It has exactly one real solution; the quadratic factor is always positive.'),
      c(`(x² + ${n * n})² = 0`, 'It has no real solution.')
    ]),
    n => w('The factor theorem from a test value', [
      c(`P(x) = x³ − ${n * n}x`, 'It has remainder zero because its positive root is the test value.'),
      c(`P(x) = x³ − ${n * n}x + 1`, 'It has remainder 1.'),
      c(`P(x) = x³ − ${n * n}x − 1`, 'It has negative remainder.'),
      c(`P(x) = x³ − ${n * n}x + 2`, 'It has remainder 2.')
    ], `Compare the remainders when each polynomial is divided by ${f(n)}.`),
    n => w('Clear denominators and check restrictions', [
      c(`1/${f(n)} = 1`, `It has solution x = ${n + 1}.`),
      c(`1/${f(n)} = −1`, `It has solution x = ${n - 1}, to the left of the excluded input.`),
      c(`1/${f(n)} = 0`, 'It cannot equal zero because its numerator is nonzero and constant.'),
      c(`${f(n)}/${f(n)} = 1`, 'It is true for every allowed x.')
    ]),
    n => w('When cancellation changes the answer', [
      c(`${f(n)}${f(2 * n)} = 0`, 'It allows both the smaller and larger positive solutions.'),
      c(`${f(n)}${f(2 * n)} / ${f(n)} = 0`, 'Only the larger root remains allowed.'),
      c(`${f(n)}${f(2 * n)} / ${f(2 * n)} = 0`, 'Only the smaller root remains allowed.'),
      c(`${f(n)}${f(2 * n)} / (${f(n)}${f(2 * n)}) = 0`, 'Both candidate roots are excluded.')
    ]),
    n => w('A substitution turns a quartic into a quadratic', [
      c(`x⁴ − ${5 * n * n}x² + ${4 * n ** 4} = 0`, 'It gives two distinct positive values of x² and four real roots.'),
      c(`x⁴ + ${5 * n * n}x² + ${4 * n ** 4} = 0`, 'It gives two negative candidate values of x² and no real roots.'),
      c(`x⁴ − ${n ** 4} = 0`, 'It gives one positive and one negative candidate for x², hence two real roots.'),
      c(`x⁴ − ${2 * n * n}x² + ${n ** 4} = 0`, 'It gives one repeated positive candidate for x² and two repeated real roots.')
    ]),
    n => w('Equations drawn as intersections', [
      c('y = 0', 'The horizontal line at zero never meets the reciprocal curve.'),
      c('y = 1', 'It has one intersection to the right of the vertical asymptote.'),
      c('y = −1', 'It has one intersection to the left of the vertical asymptote.'),
      c(`y = ${s('x', n)}`, 'The sloping line intersects both branches.')
    ], `Compare where each line meets y = 1/${f(n)}.`),
    n => w('Box volume equations', [
      c(`x(${6 * n} − 2x)² = 0`, 'It gives only the two endpoints, which produce no usable box.'),
      c(`x(${6 * n} − 2x)² = x`, 'After division by the positive x, the remaining side length must be 1.'),
      c(`x(${6 * n} − 2x)² = 4x`, 'After division by the positive x, the remaining side length must be 2.'),
      c(`x(${6 * n} − 2x)² = (${6 * n} − 2x)²`, 'After division by the positive square of the side length, the cut size is 1.')
    ], `An open box is made from a square sheet of side ${6 * n} by cutting out squares of side x. Use 0 < x < ${3 * n}.`)
  ]],
  ['C4', 'Polynomial and rational inequalities', [
    n => w('Intervals for a product', [
      c(`${f(n)}${f(-n)} > 0`, 'It gives the two exterior intervals without their endpoints.'),
      c(`${f(n)}${f(-n)} ≥ 0`, 'It gives the two exterior intervals and includes both roots.'),
      c(`${f(n)}${f(-n)} < 0`, 'It gives the open interval between the roots.'),
      c(`${f(n)}${f(-n)} ≤ 0`, 'It gives the closed interval between the roots.')
    ]),
    n => w('A repeated root in an inequality', [
      c(`${f(n)}² > 0`, 'Every real number except the repeated root is a solution.'),
      c(`${f(n)}² ≥ 0`, 'Every real number is a solution.'),
      c(`${f(n)}² < 0`, 'No real solution exists.'),
      c(`${f(n)}² ≤ 0`, 'The repeated root is the only solution.')
    ]),
    n => w('Critical values of a quotient', [
      c(`${f(n)}/${f(-n)} > 0`, 'The solution is outside the two critical inputs and excludes both endpoints.'),
      c(`${f(n)}/${f(-n)} ≥ 0`, 'The solution is outside the two critical inputs and includes only the positive endpoint.'),
      c(`${f(n)}/${f(-n)} < 0`, 'The solution is the open interval between the two critical inputs.'),
      c(`${f(n)}/${f(-n)} ≤ 0`, 'The solution is between the two critical inputs and includes only the positive endpoint.')
    ]),
    n => w('The excluded value after cancelling', [
      c(`${f(n)}²/${f(n)} ≥ 0`, 'The solution is the open ray to the right of the cancelled root.'),
      c(`${f(n)} ≥ 0`, 'The solution is the closed ray to the right, with the root included.'),
      c(`${f(n)}²/${f(n)} ≤ 0`, 'The solution is the open ray to the left of the excluded value.'),
      c(`${f(n)} ≤ 0`, 'The solution is the closed ray to the left, with the root included.')
    ]),
    n => w('Compare sign changes at polynomial zeros', [
      c(`${f(n)}${f(-n)} > 0`, 'The sign changes at both roots. Both exterior intervals satisfy the inequality.'),
      c(`${f(n)}²${f(-n)} > 0`, 'The sign does not change at the positive root; that root interrupts the otherwise positive ray.'),
      c(`${f(n)}${f(-n)}² > 0`, 'Only the sign on either side of the positive root determines the solution ray.'),
      c(`${f(n)}²${f(-n)}² > 0`, 'Every input except both repeated roots is a solution.')
    ]),
    n => w('Interpret proposed solution intervals', [
      c(`${interval(-n, n)}`, 'It contains only points where both factors have opposite signs and excludes both endpoints.'),
      c(`${interval(-n, n, false, true)}`, 'It is the exact solution; the zero is allowed, but the vertical asymptote is excluded.'),
      c(`${interval(-n, n, true, false)}`, 'It includes the excluded x-value while omitting the zero.'),
      c(`${interval('-∞', -n)} ∪ ${interval(n, '∞')}`, 'This describes where the quotient is positive instead.')
    ], `Which critical values belong to the solution of ${f(n)}/${f(-n)} ≤ 0?`),
    n => w('Compare solution sets against y = 1', [
      c(`1/${f(n)} > 1`, 'It gives a bounded open interval immediately to the right of the asymptote.'),
      c(`1/${f(n)} ≥ 1`, 'It gives a bounded interval whose right endpoint is included.'),
      c(`1/${f(n)} < 1`, 'It gives two open rays and omits the equality point.'),
      c(`1/${f(n)} ≤ 1`, 'It gives two rays and includes the equality point on the right.')
    ])
  ]]
];

const features = [
  ['D1', 'Average and instantaneous rates of change', [
    n => w('Secant slopes and the tangent at a point', [
      c(`Secant on [${n - 1}, ${n}]`, 'It approaches the target from the left and has a slope below the tangent slope.'),
      c(`Secant on [${n}, ${n + 1}]`, 'It approaches from the right and has a slope above the tangent slope.'),
      c(`Secant on [${n - 1}, ${n + 1}]`, 'Its endpoints straddle the target; its slope equals the tangent slope for this parabola.'),
      c(`Tangent at x = ${n}`, 'It represents an instantaneous rate of change at one point.')
    ], `Compare slopes for y = x² near x = ${n}.`),
    n => w('Position and average velocity', [
      c(table(['t (s)', 0, 1, 2], ['s (m)', n, n + 2, n + 4]), 'It shows constant positive average velocity: 2 m/s in both intervals.'),
      c(table(['t (s)', 0, 1, 2], ['s (m)', n, n + 1, n + 4]), 'It shows a positive average velocity that increases from 1 m/s to 3 m/s.'),
      c(table(['t (s)', 0, 1, 2], ['s (m)', n + 4, n + 2, n]), 'It shows negative average velocity in both intervals.'),
      c(table(['t (s)', 0, 1, 2], ['s (m)', n, n + 4, n]), 'Its average velocity over the whole two seconds is 0 despite movement.')
    ]),
    n => w('Within one second of the target', [
      c(`[${n}, ${num(n + 0.1)}]`, 'Its right-hand estimate is closest to the tangent slope of the two right-hand intervals shown.'),
      c(`[${n}, ${n + 1}]`, 'Its slope exceeds the tangent slope by 1.'),
      c(`[${num(n - 0.1)}, ${n}]`, 'Its left-hand estimate lies below the tangent slope.'),
      c(`[${num(n - 0.1)}, ${num(n + 0.1)}]`, 'Its secant slope equals the tangent slope because the interval is symmetric about the target.')
    ], `For s(t) = t², compare estimates of the instantaneous rate at t = ${n}.`),
    n => w('Read the local slope from a graph', [
      c(graph(x => n * x / 2, [-4, 4], [-6, 6], 'Straight line rising through the origin.'), 'Its instantaneous rate is positive and constant.'),
      c(graph(x => -n * x / 2, [-4, 4], [-6, 6], 'Straight line falling through the origin.'), 'Its instantaneous rate is negative and constant.'),
      c(graph(x => n * x * x / 2, [-4, 4], [-6, 6], 'Upward parabola with vertex at the origin.'), 'At the origin its instantaneous rate is zero and changes from negative to positive.'),
      c(graph(x => n * x ** 3 / 4, [-4, 4], [-6, 6], 'Increasing cubic flattening momentarily at the origin.'), 'At the origin its tangent is horizontal, yet it is increasing on both sides.')
    ], 'Compare the rate of change at the origin and on either side of it.'),
    n => w('Same change in height?', [
      c(`Rises ${6 * n} m in 3 s`, `Its average rate is ${2 * n} m/s.`),
      c(`Rises ${6 * n} m in 6 s`, 'The same rise takes twice as long, giving half the rate of the three-second rise.'),
      c(`Falls ${6 * n} m in 3 s`, 'It has a negative average rate.'),
      c(`Rises ${12 * n} m in 3 s`, 'It has the largest positive average rate.')
    ]),
    n => w('What does the rate measure?', [
      c(`Distance along a route grows by ${n} km in 1 h`, 'It has units of distance per hour.'),
      c(`Water volume grows by ${n} L in 1 h`, 'It measures volume per hour.'),
      c(`Temperature rises by ${n} °C in 1 h`, 'It measures temperature change per hour.'),
      c(`Bank balance grows by ${n} dollars in 1 h`, 'It measures change in money per hour.')
    ], 'The numerical rates match. Compare what each rate means.'),
    n => w('Average slopes over the same interval', [
      c(`y = ${n}x`, 'Its secant and tangent slopes agree everywhere.'),
      c(`y = ${n}x²`, 'It has the same secant slope as the linear model but starts with a horizontal tangent and has a higher slope at x = 1.'),
      c(`y = ${n}(2ˣ − 1)`, 'It has the same average slope as the line and parabola but grows by a constant factor after adding back the initial shift.'),
      c(`y = ${n}sin(2πx)`, 'It completes a full cycle and its average rate over the interval is zero.')
    ], 'Use the interval [0, 1] and radians.')
  ]],
  ['D2', 'Operations and composition of functions', [
    n => w('Sum, difference, product or quotient?', [
      c('(f + g)(x)', 'It increases the input function by a positive constant.'),
      c('(f − g)(x)', 'It decreases the input function by a positive constant.'),
      c('(fg)(x)', 'It multiplies each output of f by a factor greater than 1.'),
      c('(f/g)(x)', 'It divides each output of f by a factor greater than 1 without introducing a restriction.')
    ], `Use f(x) = x² and g(x) = ${n + 1}.`),
    n => w('Composition depends on order', [
      c('f(g(x))', `Its square is applied after translation; its zero is x = −${n}.`),
      c('g(f(x))', 'It translates after squaring and has no real zero.'),
      c('f(f(x))', 'It is the only quartic rule.'),
      c('g(g(x))', 'It is the only linear rule; the translation doubles.')
    ], `Use f(x) = x² and g(x) = x + ${n}.`),
    n => w('How operations change domain', [
      c('(f + g)(x)', 'It adds a square root to a falling line. Its maximum occurs at x = 1/4.'),
      c('(f/g)(x)', 'It excludes the positive x-value where g is zero.'),
      c('f(g(x))', 'Its square-root argument is nonnegative only when x does not exceed the shift.'),
      c('g(f(x))', 'Its domain is all nonnegative inputs, and its zero occurs where the square root equals the shift.')
    ], `Use f(x) = √x and g(x) = ${n} − x.`),
    n => w('Even, odd or neither after combining', [
      c('(f + g)(x)', 'It combines nonzero even and odd terms and is neither even nor odd.'),
      c('(fg)(x)', 'Its rule is odd and defined for all real inputs.'),
      c('(f/g)(x)', 'Its rule is odd but excludes zero.'),
      c('f(g(x))', 'The square of the odd inner function gives an even rule.')
    ], `Use f(x) = x² and g(x) = ${n}x.`),
    n => w('Compose a table with a formula', [
      c('f(g(0))', 'The intermediate output is g(0) = 1, so the final output is the second f-value in the table.'),
      c('g(f(0))', 'The intermediate output is f(0); the final result is the first f-value plus 1.'),
      c('f(f(0))', 'The inner table output is outside the table’s domain, so the composition is undefined.'),
      c('g(g(0))', 'It uses only the formula twice and produces 2.')
    ], `Use g(x) = x + 1 and the discrete function f with f(0) = ${n + 3}, f(1) = ${n + 5}, f(2) = ${n + 7}.`),
    n => w('A signal with an envelope', [
      c(`y = ${n}(1/2)ᵗ sin t`, 'Its oscillation amplitude decays with time because the exponential multiplies the sine.'),
      c(`y = ${n} sin t + (1/2)ᵗ`, 'Its vertical offset decays, but the separation of the upper and lower envelopes stays fixed.'),
      c(`y = (${n} + 1)sin t`, 'It is a sinusoid with constant amplitude and no decaying term.'),
      c(`y = ${n}(1/2)ᵗ`, 'It is positive and decreasing without oscillation.')
    ], 'Use t ≥ 0 in radians for the sine input.'),
    n => w('Compose rates and unit conversions', [
      c('C(d(t))', 'It converts hours to distance and then finds the cost in dollars.'),
      c('d(s(t))', 'It converts minutes to hours, then hours to distance.'),
      c('C(d(s(t)))', 'It performs all three steps, mapping minutes directly to dollars.'),
      c('d(t) + t', 'Adding distance and elapsed time is not meaningful because the terms have incompatible units.')
    ], `A cyclist travels d(t) = ${10 + n}t km in t hours. C(x) = 2x dollars for x km, and s(t) = t/60 converts minutes to hours.`)
  ]],
  ['D3', 'Comparing functions and modelling with technology', [
    n => w('Choose a model from repeated measurements', [
      c(table(['x', 0, 1, 2, 3, 4], ['y', n, 2 * n, 3 * n, 4 * n, 5 * n]), 'The first differences are constant, suggesting a linear model.'),
      c(table(['x', 0, 1, 2, 3, 4], ['y', n, 2 * n, 4 * n, 8 * n, 16 * n]), 'The ratios are constant, suggesting exponential growth.'),
      c(table(['x', 0, 1, 2, 3, 4], ['y', n, 2 * n, 5 * n, 10 * n, 17 * n]), 'The second differences are nonzero and constant, suggesting a quadratic model.'),
      c(table(['x', 0, 1, 2, 3, 4], ['y', n, 2 * n, n, 0, n]), 'A periodic model can fit the values with a cycle of four steps.')
    ]),
    n => w('Which models keep growing?', [
      c(`y = ${n}(1 + x)`, 'It grows at a constant positive rate.'),
      c(`y = ${n} · 2ˣ`, 'It eventually outgrows the other models because it doubles per step.'),
      c(`y = ${n}x² + ${n}`, 'It starts flat, then grows at an increasing rate without a fixed multiplicative factor.'),
      c(`y = ${n} + ${n}log₂(x + 1)`, 'It increases without bound but the increase per unit becomes smaller and smaller.')
    ], 'Restrict the comparison to x ≥ 0.'),
    n => w('A numerical crossing for exponential and linear models', [
      c(`y = ${n}(x + 3)`, 'It begins above the exponential curve and crosses it once between x = 2 and x = 3.'),
      c(`y = ${n}(x − 2)`, 'It starts below the exponential and stays below it for x ≥ 0.'),
      c(`y = ${n} + ${n}x/2`, 'It ties the exponential at x = 0 and is below it thereafter.'),
      c(`y = ${4 * n}`, 'It is constant, so its intersection occurs exactly at x = 2 by inspection.')
    ], `Graph the rules against y = ${n} · 2ˣ on x ≥ 0. Do they meet and can you locate where?`),
    n => w('Long-run models for a nonnegative quantity', [
      c(`y = ${n} + ${n}(1/2)ˣ`, 'It decreases and approaches a positive horizontal limit.'),
      c(`y = ${n}(1/2)ˣ`, 'It decreases and approaches zero without reaching it.'),
      c(`y = ${n} + ${n}sin x`, 'It keeps returning to its extrema and has no long-run limit.'),
      c(`y = ${n}(1 + x)`, 'It increases without bound at a constant rate.')
    ], 'Restrict to x ≥ 0.'),
    n => w('Use a model to estimate a threshold', [
      c(`f(t) = ${n}(t² + 1)`, 'It reaches the threshold at the exact positive time √2.'),
      c(`f(t) = ${n} · 2ᵗ`, 'Its threshold time is between 1 and 2 and is exactly log₂(3).'),
      c(`f(t) = ${n}(t + 1 + sin t)`, 'The first crossing is between 1 and 2 and can be estimated graphically because t appears both inside and outside sine.'),
      c(`f(t) = ${n}(2 − (1/2)ᵗ)`, 'It cannot reach the threshold. Its horizontal limit is below the target.')
    ], `When does each model first reach ${3 * n} for t ≥ 0? Use radians.`),
    n => w('A short record fits several models', [
      c(`y = ${n}(x + 1)`, 'It fits both observations and extrapolates by a constant amount.'),
      c(`y = ${n} · 2ˣ`, 'It fits both observations and extrapolates by a constant factor.'),
      c(`y = ${n}(x² + 1)`, 'It also fits both observations but has a horizontal tangent at x = 0.'),
      c(`y = ${n}cos(πx)`, 'It matches the initial value but predicts a negative second value.')
    ], `Observed points are ${point(0, n)} and ${point(1, 2 * n)}. Compare plausible models and predictions at x = 2.`),
    n => w('Forecasts with a ceiling', [
      c(`y = ${n}(1 − (1/2)ᵗ)`, `It approaches ${n} from below and its remaining gap halves each step.`),
      c(`y = ${n}t/(t + 1)`, 'It approaches the same ceiling from below, with a gap proportional to the reciprocal of t + 1.'),
      c(`y = ${n}(1 + (1/2)ᵗ)`, 'It approaches the same ceiling from above.'),
      c(`y = ${n}log₂(t + 1)`, 'It starts at zero and increases without a ceiling.')
    ], 'Compare long-term forecasts for t ≥ 0.')
  ]]
];

export const mhf4u = buildBank([
  ['Exponential and Logarithmic Functions', expLog],
  ['Trigonometric Functions', trig],
  ['Polynomial and Rational Functions', polyRat],
  ['Characteristics of Functions', features]
]);
