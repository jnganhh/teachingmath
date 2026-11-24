"use strict";

function item(prompt, math, correct, distractors, hint, solution, diagram) {
  return {prompt, math, correct, distractors, hint, solution, diagram};
}

const algebraTopics = [
  {
    name: "Identities",
    example: ["Expand (x − 4)²", ["Write it as (x − 4)(x − 4).", "Multiply to get x² − 4x − 4x + 16.", "Combine like terms to get x² − 8x + 16."], "A squared binomial has a middle term. Both cross products contribute."],
    levels: [
      [
        item("Collect like terms.", "7x − (2x − 6)", "5x + 6", [["5x − 6","Distribute the subtraction to both terms inside the bracket."],["9x + 6","The 2x is being subtracted."]], "Rewrite the bracket with both signs changed.", "7x − (2x − 6) = 7x − 2x + 6 = 5x + 6."),
        item("Expand.", "−3x(2x − 5)", "−6x² + 15x", [["−6x² − 15x","The second product multiplies two negatives."],["−6x + 15","Keep the x from the outside factor in each product."]], "Multiply −3x by each term.", "(−3x)(2x) = −6x² and (−3x)(−5) = 15x."),
        item("Expand.", "(x + 2)(x + 7)", "x² + 9x + 14", [["x² + 14","Include both cross products."],["x² + 14x + 9","The constant comes from multiplying 2 and 7."]], "Multiply each term in the first bracket by each term in the second.", "x² + 7x + 2x + 14 = x² + 9x + 14.")
      ],
      [
        item("Expand.", "(2x − 5)²", "4x² − 20x + 25", [["4x² + 25","The middle term is twice the product of 2x and −5."],["4x² − 10x + 25","There are two cross products, each equal to −10x."]], "Use (a − b)² = a² − 2ab + b².", "(2x)² − 2(2x)(5) + 5² = 4x² − 20x + 25."),
        item("Expand.", "(3x + 4)(3x − 4)", "9x² − 16", [["9x² + 16","The constant is 4 times −4."],["9x² − 24x + 16","The cross products have opposite signs and cancel."]], "Use (a + b)(a − b) = a² − b².", "The cross products are −12x and +12x, leaving (3x)² − 4² = 9x² − 16."),
        item("Which expression equals the given expression for every x?", "4(x − 3) + 2x", "6x − 12", [["6x − 3","Apply the factor 4 to −3 as well as x."],["4x − 10","Combine the two x-terms."]], "Distribute 4 before collecting terms.", "4(x − 3) + 2x = 4x − 12 + 2x = 6x − 12, for every x.")
      ],
      [
        item("Find k so the equation is an identity.", "(x − 6)² = x² + kx + 36", "−12", [["−6","Count both cross products."],["12","Each cross product contains a negative factor."]], "Compare the coefficient of x after expanding.", "(x − 6)² = x² − 6x − 6x + 36, so k = −12."),
        item("Simplify using a difference of squares.", "(x + 5)² − (x − 5)²", "20x", [["10x","The sum of the brackets is 2x, not x."],["100","The sum of the brackets is 2x."]], "Set A = x + 5 and B = x − 5, then use (A − B)(A + B).", "(A − B)(A + B) = 10(2x) = 20x."),
        item("Which statement is true for all real x?", "(x + 3)²", "It equals x² + 6x + 9.", [["It equals x² + 9.","Try x = 1, then expand to explain the difference."],["It equals x² + 3x + 9.","The two cross products each contribute 3x."]], "Test a small value, then use expansion to prove the identity.", "(x + 3)(x + 3) = x² + 3x + 3x + 9 = x² + 6x + 9.")
      ]
    ]
  },
  {
    name: "Factoring",
    example: ["Factor x² + 7x + 12", ["Find two numbers whose product is 12 and whose sum is 7.", "Use 3 and 4 to write (x + 3)(x + 4).", "Expand to verify that the middle term is 7x."], "Look for a greatest common factor before trying a trinomial pattern."],
    levels: [
      [
        item("Factor completely.", "12x² − 18x", "6x(2x − 3)", [["6(2x² − 3x)","This is equivalent, but the terms in the bracket still share x."],["6x(2x + 3)","The original second term is negative."]], "Find the greatest common factor of both terms.", "Both terms share 6x. Dividing them by 6x gives 2x and −3."),
        item("Factor completely.", "x² − 64", "(x − 8)(x + 8)", [["(x − 8)²","Expanding a square produces a middle term."],["(x − 4)(x + 4)","The product of −4 and 4 is −16."]], "Write both terms as squares.", "x² − 64 = x² − 8² = (x − 8)(x + 8)."),
        item("Factor completely.", "x² + 11x + 24", "(x + 3)(x + 8)", [["(x + 4)(x + 6)","These constants multiply to 24 but add to 10."],["(x − 3)(x − 8)","Their sum is negative."]], "Find a factor pair of 24 with sum 11.", "3 × 8 = 24 and 3 + 8 = 11, so (x + 3)(x + 8) is correct.")
      ],
      [
        item("Factor completely.", "x² − 3x − 28", "(x − 7)(x + 4)", [["(x + 7)(x − 4)","These constants add to +3."],["(x − 7)(x − 4)","The constants must multiply to −28."]], "Look for opposite signs and a sum of −3.", "−7 × 4 = −28 and −7 + 4 = −3."),
        item("Factor completely.", "4x² − 12x + 9", "(2x − 3)²", [["(2x + 3)²","The middle term must be negative."],["(4x − 3)²","The first term would be 16x²."]], "Check whether this is a perfect-square trinomial.", "The end terms are (2x)² and 3², and −2(2x)(3) = −12x."),
        item("Factor completely.", "3x² + 11x + 6", "(3x + 2)(x + 3)", [["(3x + 3)(x + 2)","The cross products add to 9x."],["(3x + 1)(x + 6)","The cross products add to 19x."]], "Find two numbers with product 18 and sum 11.", "Split 11x into 9x + 2x. Group to get 3x(x + 3) + 2(x + 3).")
      ],
      [
        item("Factor completely.", "2x³ − 50x", "2x(x − 5)(x + 5)", [["2x(x² − 25)","The remaining bracket is a difference of squares."],["2x(x − 25)(x + 25)","The square root of 25 is 5."]], "Take out the common factor, then look for a special pattern.", "2x³ − 50x = 2x(x² − 25) = 2x(x − 5)(x + 5)."),
        item("Factor completely.", "6x² − 7x − 3", "(3x + 1)(2x − 3)", [["(3x − 1)(2x + 3)","The cross products add to +7x."],["(6x − 1)(x + 3)","The cross products add to 17x."]], "Split −7x into two terms whose coefficients multiply to −18.", "Use −9x + 2x, then group: 3x(2x − 3) + (2x − 3)."),
        item("Factor completely.", "2x² − 18x + 40", "2(x − 4)(x − 5)", [["2(x − 2)(x − 10)","These constants add to −12 instead of −9."],["(x − 4)(x − 5)","The factor 2 from the original expression is missing."]], "Take out 2, then factor the trinomial in brackets.", "2(x² − 9x + 20) = 2(x − 4)(x − 5).")
      ]
    ]
  },
  {
    name: "Linear systems",
    example: ["y = 2x + 1\nx + y = 10", ["Replace y in the second equation with 2x + 1.", "Solve x + 2x + 1 = 10 to get x = 3.", "Substitute back to get y = 7. The solution is (3, 7)."], "A solution must make both equations true. Check by substituting the ordered pair in each one."],
    levels: [
      [
        item("Which point lies on this line?", "2x + y = 9", "(3, 3)", [["(2, 4)","Substitution gives 2(2) + 4 = 8."],["(1, 5)","Substitution gives 2(1) + 5 = 7."]], "Substitute each point as (x, y).", "For (3, 3), 2(3) + 3 = 9."),
        item("Isolate y.", "3x + 2y = 12", "y = 6 − 3x/2", [["y = 6 − 3x","Divide both terms on the right by 2."],["y = 6 + 3x/2","Subtract 3x before dividing."]], "Subtract 3x from both sides, then divide by 2.", "2y = 12 − 3x, so y = (12 − 3x)/2 = 6 − 3x/2."),
        item("Find the point where the two lines intersect.", "y = x + 1\ny = 5 − x", "(2, 3)", [["(3, 2)","Check the coordinate order and substitute into both equations."],["(1, 2)","This point lies on the first line only."]], "At the intersection both expressions for y are equal.", "x + 1 = 5 − x gives 2x = 4. Then x = 2 and y = 3.")
      ],
      [
        item("Solve by substitution.", "y = 3x − 2\n2x + y = 13", "(3, 7)", [["(7, 3)","An ordered pair lists x before y."],["(2, 4)","Substitute into both equations. The second one gives 8."]], "Replace y in the second equation with 3x − 2.", "2x + 3x − 2 = 13, so x = 3. Then y = 3(3) − 2 = 7."),
        item("Solve by elimination.", "2x + 3y = 16\n2x − y = 8", "(5, 2)", [["(4, 2)","After finding y, substitute it into the second equation."],["(2, 5)","Subtract the second equation from the first to find y first."]], "Subtract the second equation from the first to cancel x.", "The difference is 4y = 8, so y = 2. Then 2x − 2 = 8, giving x = 5."),
        item("Solve the system.", "3x + 2y = 17\nx − 2y = −5", "(3, 4)", [["(4, 3)","Adding the equations isolates x, the first coordinate."],["(3, −4)","Substitute x = 3 into x − 2y = −5 and watch the signs."]], "Add the equations to cancel y.", "4x = 12 gives x = 3. Then 3 − 2y = −5, so y = 4.")
      ],
      [
        item("How many solutions does this system have?", "2x − 3y = 4\n4x − 6y = 11", "No solution", [["Exactly one","Compare the coefficients after doubling the first equation."],["Infinitely many","Compare the constants too. Doubling 4 gives 8, not 11."]], "Double the first equation and compare.", "The equations require the same expression, 4x − 6y, to equal both 8 and 11. This is impossible."),
        item("Solve the system.", "2x + 3y = 4\n5x − 2y = 29", "(5, −2)", [["(5, 2)","Check the sign of y in the first equation."],["(−2, 5)","Find x by eliminating y, then substitute back."]], "Multiply the first equation by 2 and the second by 3, then add.", "Adding 4x + 6y = 8 and 15x − 6y = 87 gives 19x = 95. Then x = 5 and y = −2."),
        item("A club sold 18 tickets. Student tickets cost $4 each and adult tickets $7 each. Total revenue was $99. How many of each sold?", "s + a = 18\n4s + 7a = 99", "9 student, 9 adult", [["7 student, 11 adult","These counts total 18, but the revenue would be $105."],["12 student, 6 adult","These counts total 18, but the revenue would be $90."]], "Multiply the ticket-count equation by 4 and subtract it from the revenue equation.", "4s + 4a = 72. Subtract from 4s + 7a = 99 to get 3a = 27, so a = 9 and s = 9.")
      ]
    ]
  }
];

algebraTopics.push(
  {
    name: "Trigonometry",
    example: ["Right triangle: opposite = 6, hypotenuse = 10", ["Use sine because the known sides are opposite and hypotenuse.", "Write sin θ = 6/10.", "In degree mode, θ = sin⁻¹(0.6) ≈ 36.9°."], "Label opposite and adjacent from the angle you are using. The hypotenuse stays the same."],
    levels: [
      [
        item("Find sin θ in this right triangle.", "Opposite = 8, adjacent = 15, hypotenuse = 17", "8/17", [["15/17","That uses the adjacent side, which gives cosine."],["8/15","Opposite divided by adjacent gives tangent."]], "SOH: sine is opposite over hypotenuse.", "sin θ = opposite ÷ hypotenuse = 8/17."),
        item("A similar right triangle is enlarged by a scale factor of 3. What happens to the sine of a corresponding angle?", "Original opposite = 5 and hypotenuse = 13", "It stays 5/13.", [["It becomes 15/13.","The hypotenuse is scaled too."],["It becomes 5/39.","The opposite side is scaled too."]], "Multiply both sides in the ratio by 3.", "The new sine ratio is 15/39 = 5/13.")
      ],
      [
        item("Find the side opposite θ to the nearest tenth.", "θ = 38°, hypotenuse = 12 m", "7.4 m", [["9.5 m","That is the adjacent side, found using cosine."],["19.5 m","The opposite side must be shorter than the hypotenuse."]], "Use sin 38° = opposite/12 with a calculator in degree mode.", "Opposite = 12 sin 38° ≈ 7.4 m."),
        item("Find θ to the nearest degree.", "Opposite = 9 cm, adjacent = 14 cm", "33°", [["57°","That is the complementary acute angle."],["40°","Use tangent with the two legs."]], "Use the inverse of the ratio that compares opposite and adjacent.", "tan θ = 9/14, so θ = tan⁻¹(9/14) ≈ 33°.")
      ],
      [
        item("A ramp rises 0.8 m over a horizontal run of 5 m. Find its angle with the ground.", "Round to the nearest tenth of a degree.", "9.1°", [["80.9°","The angle with the vertical is complementary to the one with the ground."],["9.2°","The 5 m measurement is the horizontal leg, not the hypotenuse."]], "Draw the rise opposite the angle and the horizontal run adjacent to it.", "tan θ = 0.8/5 = 0.16. In degree mode, θ = tan⁻¹(0.16) ≈ 9.1°."),
        item("A ladder is 6 m long and makes a 62° angle with the ground. How far is its base from the wall?", "Round to the nearest tenth of a metre.", "2.8 m", [["5.3 m","That is the height the ladder reaches."],["3.2 m","Use the ladder length as the hypotenuse, with cosine."]], "The horizontal gap is adjacent to the ground angle.", "The gap is 6 cos 62° ≈ 2.8 m.")
      ]
    ]
  },
  {
    name: "Analytic geometry",
    example: ["Find the midpoint and distance between A(−2, 1) and B(4, 9).", ["Average the x-coordinates and y-coordinates separately to get (1, 5).", "The horizontal change is 6 and the vertical change is 8.", "The distance is √(6² + 8²) = 10."], "Slope uses a ratio of coordinate differences. Midpoint uses averages. Distance uses the Pythagorean theorem."],
    levels: [
      [
        item("Find the slope of AB.", "A(−1, 2), B(3, 10)", "2", [["1/2","Slope is rise divided by run."],["3","Subtract the starting coordinate before taking the ratio."]], "Find the vertical change and divide by the horizontal change.", "Slope = (10 − 2)/(3 − (−1)) = 8/4 = 2."),
        item("Find the midpoint of AB.", "A(−4, 9), B(6, −3)", "(1, 3)", [["(2, 6)","Divide each coordinate sum by 2."],["(5, −6)","Use averages, not half the differences."]], "Average the x-values and y-values separately.", "The midpoint is ((−4 + 6)/2, (9 − 3)/2) = (1, 3).")
      ],
      [
        item("Find the distance between A and B.", "A(−3, 2), B(2, 14)", "13", [["17","The coordinate changes are perpendicular legs, so use the Pythagorean theorem."],["169","Take the square root after adding the squares."]], "The legs of a right triangle have lengths 5 and 12.", "Distance = √(5² + 12²) = √169 = 13."),
        item("Find the line through (2, −1) parallel to y = 3x + 4.", "Use slope-intercept form.", "y = 3x − 7", [["y = 3x + 4","Use the same slope, then find the intercept of the line through the new point."],["y = −3x + 5","Parallel nonvertical lines have equal slopes."]], "Use m = 3 and substitute the point into y = mx + b.", "−1 = 3(2) + b, so b = −7 and the line is y = 3x − 7.")
      ],
      [
        item("Find the equation of the perpendicular bisector of AB.", "A(0, 0), B(6, 4)", "y = −3x/2 + 13/2", [["y = 2x/3","That is the original segment’s slope."],["y = −3x/2 + 2","Check that the line passes through the midpoint (3, 2)."]], "Use the midpoint and the negative reciprocal of the segment’s slope.", "The midpoint is (3, 2), and AB has slope 2/3. Use 2 = (−3/2)(3) + b to get b = 13/2."),
        item("Classify triangle ABC by its side lengths and angles.", "A(0, 0), B(4, 0), C(0, 4)", "Isosceles right", [["Equilateral","The diagonal BC is longer than either leg."],["Isosceles acute","AB is horizontal and AC is vertical."]], "Look for equal side lengths and perpendicular sides.", "AB and AC both measure 4 and meet at 90°. BC measures 4√2.")
      ]
    ]
  },
  {
    name: "Exponent laws",
    example: ["Simplify (x³)²/x⁴, where x ≠ 0.", ["Use the power-of-a-power rule: (x³)² = x⁶.", "Divide like bases by subtracting exponents: x⁶/x⁴ = x²."], "Add exponents for a product of like bases. Multiply exponents for a power raised to another power."],
    levels: [
      [
        item("Simplify.", "x⁴ · x³", "x⁷", [["x¹²","Multiply exponents only for a power raised to a power."],["x","Subtract exponents for division of like bases."]], "Count how many factors of x are multiplied.", "x⁴ · x³ = x⁴⁺³ = x⁷."),
        item("Evaluate.", "5⁰", "1", [["0","A nonzero base to the zero power equals 1."],["5","That would be 5 to the first power."]], "Compare 5³/5³ with 5³⁻³.", "5³/5³ = 1. Subtracting the exponents gives 5⁰, so 5⁰ = 1.")
      ],
      [
        item("Simplify using positive exponents.", "x³/x⁷, x ≠ 0", "1/x⁴", [["x⁴","Subtract the denominator exponent from the numerator exponent."],["1/x¹⁰","Add the exponents for multiplication, not division."]], "First write the quotient as x³⁻⁷.", "x³/x⁷ = x⁻⁴ = 1/x⁴."),
        item("Simplify.", "(−2x³)²", "4x⁶", [["−4x⁶","Squaring the negative coefficient gives a positive result."],["4x⁵","Multiply the two exponents on the x."]], "Square both the coefficient and the variable factor.", "(−2x³)² = (−2)²x⁶ = 4x⁶.")
      ],
      [
        item("Simplify using positive exponents.", "(6a⁻²b³)/(3ab⁻¹), a ≠ 0, b ≠ 0", "2b⁴/a³", [["2b²/a³","Subtracting −1 from 3 gives 4."],["2a³b⁴","The exponent on a is −3, which puts a³ in the denominator."]], "Divide the coefficients and subtract exponents separately for a and b.", "6/3 = 2, a⁻²/a = a⁻³, and b³/b⁻¹ = b⁴. The result is 2b⁴/a³."),
        item("Write the product in scientific notation.", "(3 × 10⁴)(8 × 10⁻⁶)", "2.4 × 10⁻¹", [["2.4 × 10⁻²","Rewriting 24 as 2.4 × 10 raises the exponent by 1."],["2.4 × 10¹¹","Add 4 and −6 before normalizing the coefficient."]], "Multiply 3 and 8, and add the powers of 10.", "The product is 24 × 10⁻² = 2.4 × 10⁻¹.")
      ]
    ]
  },
  {
    name: "Linear equations",
    example: ["Solve 4(x − 2) = 2x + 6.", ["Expand to get 4x − 8 = 2x + 6.", "Subtract 2x and add 8 on both sides to get 2x = 14.", "Divide by 2 to get x = 7. Substituting gives 20 on each side."], "Keep the equation balanced by doing the same operation to both sides."],
    levels: [
      [
        item("Solve for x.", "3x − 8 = 13", "x = 7", [["x = 5/3","Undo subtraction by adding 8 to both sides."],["x = 21","After adding 8, divide by the coefficient of x."]], "Isolate the 3x term first.", "Add 8 to get 3x = 21, then divide by 3."),
        item("Solve for x.", "x/4 + 5 = 2", "x = −12", [["x = −3","That is the value of x/4."],["x = 12","Subtracting 5 from 2 gives a negative number."]], "Subtract 5, then multiply by 4.", "x/4 = −3, so x = −12.")
      ],
      [
        item("Solve for x.", "5x − 4 = 2x + 11", "x = 5", [["x = 7/3","Add 4 to the right side when moving the constant."],["x = 15","Divide by 3 after collecting the x-terms."]], "Subtract 2x from both sides first.", "3x − 4 = 11, so 3x = 15 and x = 5."),
        item("Solve for x.", "3(2x − 1) = 4x + 9", "x = 6", [["x = 5","Multiply −1 by 3 when expanding."],["x = 3","After subtracting 4x, add 3 to both sides."]], "Distribute 3 across both terms in the bracket.", "6x − 3 = 4x + 9 gives 2x = 12, so x = 6.")
      ],
      [
        item("Solve for x.", "(x − 2)/3 + (x + 1)/2 = 4", "x = 5", [["x = 24/5","Be careful with the constants when expanding 2(x − 2) + 3(x + 1)."],["x = 23/5","The combined constant on the left is −1, so add 1 to the right."]], "Multiply every term by 6 to clear denominators.", "2(x − 2) + 3(x + 1) = 24. Simplify to 5x − 1 = 24, so x = 5."),
        item("How many solutions does this equation have?", "4(x + 2) = 4x + 5", "No solution", [["One solution","The x-terms cancel when you subtract 4x."],["Infinitely many","The constants would need to match for this to hold for every x."]], "Expand the left side and subtract 4x from both sides.", "The result is 8 = 5, which is false for every value of x.")
      ]
    ]
  }
);

const systemsLevels = algebraTopics.find(({name}) => name === "Linear systems").levels;
systemsLevels[0].push(item("Which point satisfies both equations?", "x + y = 7\n2x − y = 2", "(3, 4)", [["(4, 3)","That satisfies the first equation only."],["(2, 5)","Check the second equation as well as the first."]], "Substitute each ordered pair into both equations.", "3 + 4 = 7 and 2(3) − 4 = 2, so (3, 4) satisfies both."));
systemsLevels[1].push(item("How many solutions does this system have?", "y = 2x − 3\n4x − 2y = 6", "Infinitely many", [["No solution","Rearrange the second equation and compare intercepts."],["Exactly one","Check whether the equations describe different lines."]], "Isolate y in the second equation.", "The second equation rearranges to y = 2x − 3. Both equations describe the same line."));
systemsLevels[2].push(item("Plan A charges $18 plus $3 per visit. Plan B charges $6 plus $5 per visit. When do they cost the same?", "A = 18 + 3v\nB = 6 + 5v", "6 visits, $36", [["6 visits, $30","Substitute 6 into the full cost of either plan."],["12 visits, $54","The costs differ by $2 per visit."]], "Set the two cost expressions equal.", "18 + 3v = 6 + 5v gives 12 = 2v, so v = 6. Both plans cost $36."));

const signed = (n) => String(n).replace("-", "−");
const term = (n, variable = "") => `${n < 0 ? " − " : " + "}${Math.abs(n)}${variable}`;
const bracket = (n) => `(x${term(n)})`;
const degrees = (radians) => Math.round(radians * 180 / Math.PI);
const tenth = (n) => n.toFixed(1);

function identityPractice(level, i) {
  const n = i + 6;
  if (level === 0) {
    return item("Simplify.", `x${term(n)} + ${n}x`, `${n + 1}x${term(n)}`,
      [[`${n}x${term(n)}`,"The first x contributes a coefficient of 1."],[`${n + 1}x`,"The constant stays separate from the x-terms."]],
      "Combine the x-terms and keep the constant.", `x + ${n}x = ${n + 1}x, and the constant is ${n}.`);
  }
  if (level === 1) {
    return item("Expand.", `${bracket(n)}²`, `x²${term(2*n, "x")}${term(n*n)}`,
      [[`x²${term(n*n)}`,"Include the middle term from the two cross products."],[`x²${term(n, "x")}${term(n*n)}`,"Both cross products contribute to the x-term."]],
      "Use (a + b)² = a² + 2ab + b².", `Each cross product is ${n}x. The constant is ${n}² = ${n*n}.`);
  }
  return item("Simplify the difference of squares.", `${bracket(n)}² − ${bracket(-n)}²`, `${4*n}x`,
    [[`${2*n}x`,"The sum of the two brackets is 2x."],[`${4*n*n}`,"The sum of the two brackets still contains x."]],
    "Use A² − B² = (A − B)(A + B).", `The difference is ${2*n} and the sum is 2x, so their product is ${4*n}x.`);
}

function factoringPractice(level, i) {
  const n = i + 6;
  if (level === 0) {
    return item("Factor completely.", `${2*n}x²${term(3*n, "x")}`, `${n}x(2x + 3)`,
      [[`${n}(2x² + 3x)`,"Both terms inside the bracket still share x."],[`${n}x(2x − 3)`,"The original linear term is positive."]],
      "Look for the greatest common factor of the coefficients and variables.", `The greatest common factor is ${n}x. The two quotients are 2x and 3.`);
  }
  const b = n + 2;
  if (level === 1) {
    return item("Factor completely.", `x²${term(n-b, "x")}${term(-n*b)}`, `${bracket(n)}${bracket(-b)}`,
      [[`${bracket(-n)}${bracket(b)}`,"These constants add to a positive number."],[`${bracket(-n)}${bracket(-b)}`,"The constants must multiply to a negative number."]],
      "Find two numbers with negative product and sum −2.", `${n} and ${signed(-b)} multiply to ${signed(-n*b)} and add to −2.`);
  }
  return item("Factor completely.", `${n}x³${term(-n*b*b, "x")}`, `${n}x${bracket(-b)}${bracket(b)}`,
    [[`${n}x(x²${term(-b*b)})`,"The bracket can still be factored as a difference of squares."],[`${n}x${bracket(-b)}²`,"A square creates a middle term in the bracket."]],
    "Take out the greatest common factor and check the resulting binomial.", `Taking out ${n}x leaves x² − ${b*b}, which factors as ${bracket(-b)}${bracket(b)}.`);
}

function systemPractice(level, i) {
  const x = i + 2;
  const y = -(i + 1);
  const pair = (a, b) => `(${signed(a)}, ${signed(b)})`;
  const correct = pair(x, y);
  if (level === 0) {
    return item("Which ordered pair satisfies both equations?", `x + y = ${x+y}\n2x − y = ${2*x-y}`, correct,
      [[pair(x+1,y-1),"This satisfies the first equation. Check the second one too."],[pair(y,x),"The order is (x, y). Check both equations with these coordinates."]],
      "Substitute each candidate into both equations.", `Substitute x = ${x} and y = ${signed(y)}. The two left sides equal ${x+y} and ${2*x-y}.`);
  }
  if (level === 1) {
    const intercept = y - 2*x;
    return item("Solve by substitution.", `y = 2x${term(intercept)}\nx − y = ${x-y}`, correct,
      [[pair(y,x),"The ordered pair lists x before y."],[pair(x,-y),"Substitute into the first equation and check the sign of y."]],
      "Replace y in the second equation with the expression from the first.", `Substitution gives x − (2x${term(intercept)}) = ${x-y}. Solving gives x = ${x}, then y = ${signed(y)}.`);
  }
  const a = 2*x + 3*y;
  const b = 3*x - 2*y;
  return item("Solve by elimination.", `2x + 3y = ${signed(a)}\n3x − 2y = ${b}`, correct,
    [[pair(y,x),"Keep x and y in coordinate order."],[pair(x,-y),"Substitute x back into either equation to check the sign of y."]],
    "Double the first equation and triple the second, then add.", `Adding the scaled equations gives 13x = ${13*x}. Then x = ${x} and y = ${signed(y)}.`);
}

function trigPractice(level, i) {
  const n = i + 2;
  if (level === 0) {
    const ratios = ["sin", "cos", "tan"];
    const sides = ["opposite over hypotenuse", "adjacent over hypotenuse", "opposite over adjacent"];
    const values = ["3/5", "4/5", "3/4"];
    const chosen = i % ratios.length;
    const wrong = values.flatMap((value, index) => index === chosen ? [] : [[value, `That ratio uses ${sides[index]}.`]]);
    return item(`Find ${ratios[chosen]} θ.`, `Opposite = ${3*n}, adjacent = ${4*n}, hypotenuse = ${5*n}`, values[chosen],
      wrong, `Use ${sides[chosen]}.`, `${ratios[chosen]} θ is ${sides[chosen]}, which reduces to ${values[chosen]}.`,
      {opposite:String(3*n), adjacent:String(4*n), hypotenuse:String(5*n)});
  }
  if (level === 1) {
    const theta = 24 + 4*i;
    const h = 10 + i;
    const angle = theta * Math.PI / 180;
    return item("Find the adjacent leg to the nearest tenth.", `θ = ${theta}°, hypotenuse = ${h} cm`, `${tenth(h*Math.cos(angle))} cm`,
      [[`${tenth(h*Math.sin(angle))} cm`,"Sine gives the opposite leg."],[`${tenth(h/Math.cos(angle))} cm`,"The hypotenuse must be longer than either leg."]],
      "Cosine relates the adjacent side and hypotenuse.", `Adjacent = ${h} cos ${theta}° ≈ ${tenth(h*Math.cos(angle))} cm.`,
      {adjacent:"?", hypotenuse:`${h} cm`, angle:`${theta}°`});
  }
  const rise = n;
  const run = n + 7;
  const angle = degrees(Math.atan(rise/run));
  return item("Find the angle of elevation to the nearest degree.", `Vertical rise = ${rise} m, horizontal run = ${run} m`, `${angle}°`,
    [[`${90-angle}°`,"That comes from reversing opposite and adjacent."],[`${angle + 5}°`,"Use the inverse tangent on the calculator in degree mode."]],
    "Use inverse tangent of rise divided by run.", `θ = tan⁻¹(${rise}/${run}) ≈ ${angle}°.`,
    {opposite:`${rise} m`, adjacent:`${run} m`});
}

function geometryPractice(level, i) {
  const x = i - 3;
  const y = i + 2;
  if (level === 0) {
    const m = i % 2 ? -i-2 : i+2;
    return item("Find the slope of the line through these points.", `A(${signed(x)}, ${y}), B(${x+4}, ${signed(y+4*m)})`, signed(m),
      [[`${signed(Math.sign(m))}/${Math.abs(m)}`,"The rise goes on top."],[signed(4*m),"Divide the vertical change by the horizontal change."]],
      "Find the changes in y and x in the same direction.", `The slope is (${signed(4*m)})/4 = ${signed(m)}.`);
  }
  if (level === 1) {
    const k = i + 2;
    return item("Find the distance between A and B.", `A(${signed(x)}, ${y}), B(${x+3*k}, ${y+4*k})`, String(5*k),
      [[String(7*k),"The two coordinate changes are perpendicular. Use the Pythagorean theorem."],[String(25*k*k),"Take the square root of the sum of the squares."]],
      "Square the horizontal and vertical changes, add, then take the square root.", `Distance = √(${3*k}² + ${4*k}²) = ${5*k}.`);
  }
  const m = i + 2;
  const b = y + m*x;
  return item("Find the line through the point perpendicular to the given line.", `Point (${signed(x)}, ${y}), given line y = x/${m} + 5`, `y = −${m}x${term(b)}`,
    [[`y = ${m}x${term(y-m*x)}`,"A perpendicular slope is the negative reciprocal."],[`y = −${m}x${term(b+1)}`,"Substitute the point to determine the intercept."]],
    "The perpendicular slope is the negative reciprocal of the given slope.", `Use m = −${m}. Substituting the point gives an intercept of ${signed(b)}.`);
}

function exponentPractice(level, i) {
  const n = i + 2;
  if (level === 0) {
    return item("Simplify using exponent notation.", `x^${n} · x^3`, `x^${n+3}`,
      [[`x^${3*n}`,"Multiply exponents for a power of a power."],[`x^${n+1}`,"Add both exponents in the product."]],
      "Add exponents when multiplying powers with the same base.", `The new exponent is ${n} + 3 = ${n+3}.`);
  }
  if (level === 1) {
    return item("Simplify using positive exponents.", `x^${n} ÷ x^${2*n}, x ≠ 0`, `1/x^${n}`,
      [[`x^${n}`,"Subtract the denominator exponent from the numerator exponent."],[`1/x^${3*n}`,"A quotient uses subtraction of exponents."]],
      "Subtract exponents first. Rewrite any negative power as a reciprocal.", `${n} − ${2*n} = ${signed(-n)}, so the result is 1/x^${n}.`);
  }
  return item("Simplify using positive exponents.", `(2x^${n}y^(−2))² ÷ (xy), x ≠ 0, y ≠ 0`, `4x^${2*n-1}/y^5`,
    [[`2x^${2*n-1}/y^5`,"Square the coefficient 2 too."],[`4x^${2*n-1}/y^3`,"After squaring, subtract the denominator's exponent on y."]],
    "Square each factor, then subtract exponents for each quotient.", `The numerator is 4x^${2*n}y^(−4). Dividing by xy gives 4x^${2*n-1}y^(−5).`);
}

function equationPractice(level, i) {
  const x = i + 3;
  const answer = (value) => `x = ${signed(value)}`;
  const distractors = [[answer(x+1),"Check by substituting this value into the original equation."],[answer(-x),"Check the signs while isolating the variable."]];
  if (level === 0) return item("Solve for x.", `4x − 5 = ${4*x-5}`, answer(x), distractors,
    "Add 5 to both sides, then divide by 4.", `Adding 5 gives 4x = ${4*x}. Divide by 4 to get x = ${x}.`);
  if (level === 1) return item("Solve for x.", `5(x − 2) = 2x${term(3*x-10)}`, answer(x), distractors,
    "Distribute 5 on the left, then collect the x-terms.", `Expanding gives 5x − 10 = 2x${term(3*x-10)}. Rearrange to get 3x = ${3*x}.`);
  return item("Solve for x.", `(x + 1)/2 + (x − 1)/3 = ${5*x+1}/6`, answer(x), distractors,
    "Multiply every term by 6 to clear denominators.", `The equation becomes 3(x + 1) + 2(x − 1) = ${5*x+1}. Simplify to 5x + 1 = ${5*x+1}, so x = ${x}.`);
}

const trigTopic = algebraTopics.find(({name}) => name === "Trigonometry");
trigTopic.exampleDiagram = {opposite:"6", hypotenuse:"10"};
const initialTriangles = [
  [{opposite:"8", adjacent:"15", hypotenuse:"17"}, {opposite:"5", hypotenuse:"13"}],
  [{opposite:"?", hypotenuse:"12 m", angle:"38°"}, {opposite:"9 cm", adjacent:"14 cm"}],
  [{opposite:"0.8 m", adjacent:"5 m"}, {adjacent:"?", hypotenuse:"6 m", angle:"62°"}]
];
for (const [level, questions] of trigTopic.levels.entries()) {
  for (const [index, question] of questions.entries()) question.diagram = initialTriangles[level][index];
}

const practiceBuilders = new Map([
  ["Identities", identityPractice], ["Factoring", factoringPractice], ["Linear systems", systemPractice],
  ["Trigonometry", trigPractice], ["Analytic geometry", geometryPractice], ["Exponent laws", exponentPractice],
  ["Linear equations", equationPractice]
]);

for (const {name, levels} of algebraTopics) {
  for (const [level, questions] of levels.entries()) {
    const remaining = 8 - questions.length;
    const build = practiceBuilders.get(name);
    for (let i = 0; i < remaining; i++) questions.push(build(level, i));
  }
}

algebraTopics.push({
  name: "Quadratic equations",
  example: [
    "Solve 2x² + 3x = 5.",
    [
      "Set one side to zero: 2x² + 3x − 5 = 0.",
      "Factor: (2x + 5)(x − 1) = 0.",
      "Set each factor to zero. The roots are x = −5/2 and x = 1.",
      "On the graph of y = 2x² + 3x − 5, those roots are the x-coordinates of the intercepts."
    ],
    "When factoring is impractical, use x = (−b ± √(b² − 4ac))/(2a) for ax² + bx + c = 0."
  ],
  levels: [
    [
      item("Use the zero-product property.", "(x − 4)(x + 3) = 0", "x = 4 or x = −3",
        [["x = −4 or x = 3","Check what value makes each factor equal zero."],["x = 4 only","Either factor can be zero."]],
        "Set each bracket equal to zero.", "x − 4 = 0 gives x = 4. x + 3 = 0 gives x = −3."),
      item("Solve by factoring.", "x² − 7x + 12 = 0", "x = 3 or x = 4",
        [["x = −3 or x = −4","The factors are x − 3 and x − 4. Check their signs when solving."],["x = 2 or x = 6","These numbers multiply to 12 but add to 8, not 7."]],
        "Find two numbers that multiply to 12 and add to −7.", "−3 and −4 give (x − 3)(x − 4) = 0, so x = 3 or x = 4."),
      item("Find all real solutions.", "x² − 49 = 0", "x = 7 or x = −7",
        [["x = 7 only","Both a positive and a negative number square to 49."],["x = 49 or x = −49","Take the square root of 49."]],
        "Recognize a difference of squares.", "x² − 7² = (x − 7)(x + 7). The roots are 7 and −7."),
      item("Solve by taking out a common factor.", "3x² − 15x = 0", "x = 0 or x = 5",
        [["x = 5 only","Dividing both sides by x would lose the root x = 0."],["x = 0 or x = −5","Check the sign in x − 5."]],
        "Factor out 3x before solving.", "3x(x − 5) = 0. Either 3x = 0 or x − 5 = 0."),
      item("How many distinct real roots does the equation have?", "(x − 6)² = 0", "One distinct root",
        [["Two distinct roots","Both identical factors give the same root."],["No real roots","A square can equal zero."]],
        "Ask when the expression inside the square equals zero.", "x − 6 = 0 gives x = 6. It is a repeated root, so there is one distinct real root."),
      item("Read the roots from the graph.", "y = (x + 2)(x − 3)", "x = −2 or x = 3",
        [["x = 0 or x = −6","Look at where the curve crosses the horizontal axis."],["x = 2 or x = −3","Read the x-coordinate at each crossing, including its sign."]],
        "The roots occur where the graph crosses the x-axis.", "The graph crosses at (−2, 0) and (3, 0). Therefore x = −2 or x = 3.",
        {a:1,b:-1,c:-6,xMin:-4,xMax:5,yMin:-8,yMax:8}),
      item("A square garden has an area of 81 m². What is its side length?", "Let s be the side length in metres.", "9 m",
        [["−9 m","A negative root satisfies the equation, but a length must be positive."],["20.25 m","Area is side length squared. Dividing by 4 would be used for perimeter."]],
        "Model the area with s² = 81.", "The roots of s² = 81 are 9 and −9. The garden’s side length is 9 m."),
      item("A rectangular mural is 2 m longer than it is wide and has area 48 m². Find its width.", "Let w be the width in metres.", "6 m",
        [["8 m","That is the length. The width is 2 m shorter."],["−8 m","This is an algebraic root, but a width cannot be negative."]],
        "Write w(w + 2) = 48, then move 48 to the left.", "w² + 2w − 48 = (w + 8)(w − 6) = 0. Only w = 6 gives a positive width.")
    ],
    [
      item("Solve by factoring after rearranging.", "2x² − x = 6", "x = 2 or x = −3/2",
        [["x = −2 or x = 3/2","Expand your factors and check that the middle coefficient is −1."],["x = 2 or x = 3/2","The constant term in standard form is −6, so the roots here have opposite signs."]],
        "Rewrite as 2x² − x − 6 = 0. Split the middle term into 3x − 4x.", "2x² + 3x − 4x − 6 = (2x + 3)(x − 2) = 0."),
      item("Use the quadratic formula. Give the roots to the nearest hundredth.", "x² − 2x − 5 = 0", "x ≈ −1.45 or x ≈ 3.45",
        [["x ≈ −3.45 or x ≈ 1.45","The numerator starts with −b, which is 2 here."],["x ≈ −2.90 or x ≈ 6.90","Divide the entire numerator by 2a."]],
        "Use a = 1, b = −2, and c = −5. Calculate b² − 4ac first.", "The discriminant is 24. The roots are (2 − √24)/2 and (2 + √24)/2, about −1.45 and 3.45."),
      item("Which equation has the roots shown by the graph?", "Use the shape and the x-intercepts.", "y = −x² + 2x + 3",
        [["y = x² − 2x − 3","It has the correct roots but opens upward."],["y = −x² − 2x + 3","Its zeros are −3 and 1. Compare the intercepts on the graph."]],
        "Read both x-intercepts and check whether the parabola opens up or down.", "The roots are −1 and 3 and the graph opens down. The equation y = −(x + 1)(x − 3) fits.",
        {a:-1,b:2,c:3,xMin:-3,xMax:5,yMin:-5,yMax:6}),
      item("A ball’s height is given in metres. When does the ball land?", "h(t) = −5t² + 20t + 25", "5 s",
        [["−1 s","This root falls before the model starts at t = 0."],["2 s","That is the time of the maximum height. Landing means the height is zero."]],
        "Set h(t) = 0. Divide the equation by −5 before factoring.", "t² − 4t − 5 = (t − 5)(t + 1) = 0. The positive root is t = 5."),
      item("A garden is 4 m longer than it is wide. Its diagonal is 20 m. Find the width.", "Let w be the width in metres.", "12 m",
        [["16 m","That is the length. The question asks for the width."],["−16 m","The width must be positive."]],
        "Use the Pythagorean theorem: w² + (w + 4)² = 20².", "The equation simplifies to w² + 4w − 192 = 0. Factoring gives (w + 16)(w − 12) = 0. The width is 12 m."),
      item("Two consecutive positive integers have a product of 156. What are they?", "Let n be the smaller integer.", "12 and 13",
        [["11 and 12","They are consecutive, but their product is 132."],["−13 and −12","They give the right product, but the problem asks for positive integers."]],
        "Write n(n + 1) = 156 and solve for n.", "(n − 12)(n + 13) = 0. Choose n = 12, so the next integer is 13."),
      item("An arch curves above a level walkway. Its height h is in metres, with x measured horizontally in metres. How wide is the arch at walkway level?", "h = −x² + 8x", "8 m",
        [["4 m","That is the location of the vertex. Find both walkway-level intercepts."],["16 m","That is the maximum height, not the width."]],
        "Set h = 0, then find the horizontal distance between the two roots.", "x(8 − x) = 0, so the intercepts occur at x = 0 and x = 8. The arch is 8 m wide."),
      item("A club sells x tickets at a price of 30 − x dollars each. What two ticket quantities give revenue of $200?", "R = x(30 − x)", "10 or 20 tickets",
        [["15 tickets only","That maximizes revenue but does not give exactly $200."],["−10 or −20 tickets","Check the signs when solving the factored equation."]],
        "Set R = 200 and move all terms to one side.", "x² − 30x + 200 = (x − 10)(x − 20) = 0. Both ticket counts are possible.")
    ],
    [
      item("A ball’s height h is measured in metres, t seconds after launch. When does it reach 6 m?", "h = −5t² + 15t + 1", "About 0.38 s and 2.62 s",
        [["About 0.07 s and 2.93 s","Those times use the wrong target height. Start by setting h = 6."],["About 2.62 s only","It can pass through the same height while rising and falling."]],
        "Set h = 6. Divide by −5 and solve the resulting quadratic.", "t² − 3t + 1 = 0. The formula gives (3 − √5)/2 and (3 + √5)/2. Both are positive times."),
      item("A pool measures 10 m by 6 m. A path of uniform width surrounds it on all four sides. The path alone covers 80 m². Find its width.", "Let x be the width of the path in metres.", "About 2.00 m",
        [["About 1.00 m","Test the area when the length and width each increase by twice the path width."],["About 4.00 m","The increase in each outside dimension is twice the path width."]],
        "Add 2x to each pool dimension and subtract the pool’s area.", "(10 + 2x)(6 + 2x) − 60 = 80 gives x² + 8x − 20 = 0. The roots are 2 and −10. The width is 2 m."),
      item("A rectangular pen uses 40 m of fencing on three sides. A wall forms the fourth side. If the pen must enclose 192 m², what are the possible lengths of each side perpendicular to the wall?", "Let x be one side perpendicular to the wall.", "8 m or 12 m",
        [["16 m or 24 m","Those are possible lengths parallel to the wall."],["10 m only","That gives the maximum area, which is 200 m²."]],
        "The side parallel to the wall is 40 − 2x. Set x(40 − 2x) = 192.", "Rearrange to x² − 20x + 96 = 0, then factor: (x − 8)(x − 12) = 0. Both dimensions are possible."),
      item("A sensor measures a parabola’s height y above a reference line. At which horizontal positions is the height 3?", "y = x² − 4x", "x ≈ −0.65 or x ≈ 4.65",
        [["x = 0 or x = 4","Those are the intercepts at y = 0. The target height is 3."],["x ≈ 0.65 or x ≈ 4.65","The left intersection lies to the left of the y-axis."]],
        "Find where the parabola crosses the horizontal line y = 3.", "The graph gives estimates. To confirm, solve x² − 4x − 3 = 0. The exact solutions are 2 − √7 and 2 + √7.",
        {a:1,b:-4,c:0,xMin:-2,xMax:6,yMin:-5,yMax:8,target:3}),
      item("A ball is launched from a 2 m platform. How long until it hits the ground? Round to the nearest hundredth.", "h(t) = −4.9t² + 7t + 2", "1.67 s",
        [["1.43 s","That comes from ignoring the 2 m starting height."],["−0.24 s","That algebraic root is before the launch."]],
        "Set h(t) = 0 and use the quadratic formula. Choose the positive time.", "The discriminant is 88.2. The positive time is (7 + √88.2)/9.8 ≈ 1.67 s. The other root is negative."),
      item("A square courtyard gets a strip 3 m wide added along one side. The new rectangular area is 110 m². What was the original side length?", "Let s be the original side length.", "About 9.09 m",
        [["About 10.49 m","That is the side length of a square with area 110 m². The new shape is a rectangle."],["About 12.09 m","That is the longer side of the new rectangle."]],
        "Use s(s + 3) = 110 and take the positive root.", "s² + 3s − 110 = 0. The positive root is (−3 + √449)/2 ≈ 9.09 m."),
      item("A store models daily profit in dollars as P(x), where x is the number of items sold. What sales quantities break even?", "P(x) = −2x² + 40x − 128", "4 or 16 items",
        [["8 or 32 items","Divide the equation by −2 before factoring."],["10 items only","That is the vertex and gives the highest profit. Break-even means zero profit."]],
        "Set P(x) = 0. Divide by −2.", "x² − 20x + 64 = (x − 4)(x − 16) = 0. Profit is zero at 4 and 16 items."),
      item("A rectangular display has area 70 m². Its length is 3 m more than twice its width. Find the width to the nearest hundredth.", "Let w be the width in metres.", "5.21 m",
        [["6.71 m","The length is 2w + 3. Make sure you set up that expression first."],["13.42 m","That is the length, not the width."]],
        "Write w(2w + 3) = 70. Keep the positive root of the resulting quadratic.", "2w² + 3w − 70 = 0, so w = (−3 + √569)/4 ≈ 5.21 m.")
    ]
  ]
});

function commonDivisor(a, b) {
  while (b) [a,b] = [b,a % b];
  return a;
}

const rightTriangles = [];
for (let m = 2; m <= 13; m++) {
  for (let n = 1; n < m; n++) {
    if ((m-n) % 2 && commonDivisor(m,n) === 1) {
      rightTriangles.push([4*m*n, 2*(m*m-n*n), 2*(m*m+n*n)]);
    }
  }
}

function freshTrigPractice(level, i) {
  if (level === 0) {
    const [opposite, adjacent, hypotenuse] = rightTriangles[i-8];
    const ratios = ["sin", "cos", "tan"];
    const sides = ["opposite over hypotenuse", "adjacent over hypotenuse", "opposite over adjacent"];
    const values = [`${opposite}/${hypotenuse}`, `${adjacent}/${hypotenuse}`, `${opposite}/${adjacent}`];
    const chosen = i % ratios.length;
    return item(`Find ${ratios[chosen]} θ.`, `Opposite = ${opposite}, adjacent = ${adjacent}, hypotenuse = ${hypotenuse}`, values[chosen],
      values.flatMap((value, index) => index === chosen ? [] : [[value, `That uses ${sides[index]}.`]]),
      `Use ${sides[chosen]}.`, `The ratio is ${sides[chosen]}, giving ${values[chosen]}.`,
      {opposite:String(opposite), adjacent:String(adjacent), hypotenuse:String(hypotenuse)});
  }
  if (level === 1) {
    const theta = 21 + i % 40;
    const angleDegrees = theta === 45 ? 46 : theta;
    const h = 12 + i;
    const radians = angleDegrees * Math.PI / 180;
    const adjacent = tenth(h*Math.cos(radians));
    return item("Find the adjacent side to the nearest tenth.", `θ = ${angleDegrees}°, hypotenuse = ${h} cm`, `${adjacent} cm`,
      [[`${tenth(h*Math.sin(radians))} cm`,"Sine gives the opposite side."],[`${tenth(h/Math.cos(radians))} cm`,"A leg cannot be longer than the hypotenuse."]],
      "Use cosine to relate the adjacent side to the hypotenuse.", `Adjacent = ${h} cos ${angleDegrees}° ≈ ${adjacent} cm.`,
      {adjacent:"?", hypotenuse:`${h} cm`, angle:`${angleDegrees}°`});
  }
  const rise = 2 + i % 12;
  const run = rise + 12 + i;
  const angle = degrees(Math.atan(rise/run));
  return item("Find the incline’s angle with the horizontal. Round to the nearest degree.", `Rise = ${rise} m and horizontal run = ${run} m`, `${angle}°`,
    [[`${90-angle}°`,"That is the complementary angle."],[`${angle+6}°`,"Check your inverse tangent calculation in degree mode."]],
    "Use the rise divided by the horizontal run.", `θ = tan⁻¹(${rise}/${run}) ≈ ${angle}°.`,
    {opposite:`${rise} m`, adjacent:`${run} m`});
}

function quadraticVariant(level, i) {
  const family = i % 5;
  const d = 2 + Math.floor(i/5);
  const base = 3 + i % 13;
  const n = base >= d ? base + 1 : base;
  const other = n + d;
  const roots = (a,b) => `x = ${signed(a)} or x = ${signed(b)}`;

  if (level === 0) {
    if (family === 0) {
      return item("Find both roots from the graph.", "Read the x-intercepts.", roots(-d,n),
        [[roots(d,-n),"Check the signs of the x-coordinates."],[roots(-d,0),"The origin is not an x-intercept of this parabola."]],
        "Find the two points where the parabola crosses the x-axis.", `The crossings have x-coordinates ${signed(-d)} and ${n}.`,
        {a:1,b:d-n,c:-d*n,xMin:-d-2,xMax:n+2,yMin:-Math.max(12,Math.ceil((n+d)**2/4)+2),yMax:10});
    }
    if (family === 1 || family === 2) {
      return item("Set each factor to zero.", `${bracket(-n)}${bracket(d)} = 0`, roots(n,-d),
        [[roots(-n,d),"These values give the opposite signs. Substitute one into a factor."],[`x = ${n} only`,"The second factor also has a zero."]],
        "Either factor can be zero.", `Solving x − ${n} = 0 gives x = ${n}. Solving x + ${d} = 0 gives x = ${signed(-d)}.`);
    }
    if (family === 3) {
      return item("Solve by factoring out a common factor.", `${d}x² − ${d*n}x = 0`, roots(0,n),
        [[`x = ${n} only`,"Factoring keeps the root x = 0."],[roots(0,-n),"Check which value makes the second factor zero."]],
        `Take out ${d}x.`, `${d}x(x − ${n}) = 0, so x = 0 or x = ${n}.`);
    }
    return item("A square garden has the area shown. Find the side length.", `Area = ${n*n} m²`, `${n} m`,
      [[`${signed(-n)} m`,"A length is positive."],[`${n*n} m`,"The area equals the square of the side length."]],
      "Solve for the positive square root.", `If s is the side length, s² = ${n*n}. The positive root is ${n} m.`);
  }

  if (level === 1) {
    if (family === 0) {
      const b = n-2*d;
      return item("Rearrange, then solve by factoring.", `2x²${term(b,"x")} = ${n*d}`, roots(d,-n/2),
        [[roots(-d,n/2),"Check the signs by substituting into the original equation."],[`x = ${d} only`,"There are two distinct factors."]],
        "Move everything to the left, then factor.", `The factored equation is (2x + ${n})(x − ${d}) = 0.`);
    }
    if (family === 1) {
      const r = n*n + 2, root = Math.sqrt(r);
      return item("Use the quadratic formula. Round to the nearest hundredth.", `x² − ${2*d}x${term(d*d-r)} = 0`,
        `x ≈ ${signed((d-root).toFixed(2))} or x ≈ ${(d+root).toFixed(2)}`,
        [[`x ≈ ${root.toFixed(2)} or x ≈ ${signed((-root).toFixed(2))}`,"Include the −b term in the numerator."],[`x ≈ ${(d+root).toFixed(2)} only`,"The plus-or-minus sign produces both roots."]],
        "The discriminant is positive, so calculate both roots.", `The quadratic formula simplifies to x = ${d} ± √${r}.`);
    }
    if (family === 2) {
      const area = n*other;
      return item(`A rectangle is ${d} m longer than it is wide and has area ${area} m². Find its width.`, "Let w be the width.",
        `${n} m`, [[`${other} m`,"That is the length."],[`${signed(-other)} m`,"The negative root is not a possible width."]],
        `Use w(w + ${d}) = ${area}.`, `The factored equation is (w − ${n})(w + ${other}) = 0. Only ${n} m is positive.`);
    }
    if (family === 3) {
      const landing = 3 + i % 6;
      return item("A ball’s height h is in metres, t seconds after launch. When does it land?", `h(t) = −5t² + ${5*(landing-1)}t + ${5*landing}`,
        `${landing} s`, [["−1 s","This time is before the launch."],[`${(landing-1)/2} s`,"This is the time of the maximum height."]],
        "Set the height equal to zero and factor.", `Divide by −5 and factor to get (t + 1)(t − ${landing}) = 0. Keep the positive time.`);
    }
    return item("Which equation could describe the graph shown?", "Use the intercepts and opening direction.",
      `y = −${bracket(d)}${bracket(-n)}`,
      [[`y = ${bracket(d)}${bracket(-n)}`,"This opens upward."],[`y = −${bracket(-d)}${bracket(n)}`,"This has different intercepts."]],
      "The graph opens downward, so its leading coefficient is negative.",
      `The zeros are ${signed(-d)} and ${n}. A model that opens down is y = −${bracket(d)}${bracket(-n)}.`,
      {a:-1,b:n-d,c:d*n,xMin:-d-2,xMax:n+2,yMin:-10,yMax:Math.max(12,Math.ceil((n+d)**2/4)+2)});
  }

  if (family === 0) {
    const r = n*n + 2;
    const width = (-d+Math.sqrt(d*d+4*r))/2;
    return item(`A display is ${d} m longer than it is wide. Its area is ${r} m². Find its width to the nearest hundredth.`,
      "Let w be the width.", `${width.toFixed(2)} m`,
      [[`${(width+d).toFixed(2)} m`,"That is the length."],[`${Math.sqrt(r).toFixed(2)} m`,"The display is a rectangle with unequal sides."]],
      "Write an area equation, then keep the positive solution.", `Solve w² + ${d}w − ${r} = 0. The positive root is approximately ${width.toFixed(2)} m.`);
  }
  if (family === 1) {
    const fence = 2*(n+other);
    const area = 2*n*other;
    return item(`A pen uses ${fence} m of fencing on three sides. A wall forms the fourth side. For an area of ${area} m², how long can each side perpendicular to the wall be?`,
      "Let x be one perpendicular side.", `${n} m or ${other} m`,
      [[`${2*n} m or ${2*other} m`,"These are lengths for the side parallel to the wall."],[`${(n+other)/2} m only`,"That is the dimension for maximum area."]],
      `Use x(${fence} − 2x) = ${area}.`, `Rearrange and factor to obtain ${bracket(-n)}${bracket(-other)} = 0. Both roots give valid pen dimensions.`);
  }
  if (family === 2) {
    const r = 2 + i % 5;
    const s = r + 3 + d;
    const peak = (r+s)/2;
    return item("A ball’s height h is in metres, t seconds after launch. When is it at its starting height again?",
      `h(t) = −5t² + ${10*peak}t + ${n}`, `${2*peak} s`,
      [[`${peak} s`,"That is when the ball is highest."],["0 s","This is the launch. The question asks when it returns."]],
      `Set h(t) = ${n} and factor out t.`, `The equation becomes −5t(t − ${2*peak}) = 0. After launch, the ball returns to that height at ${2*peak} s.`);
  }
  if (family === 3) {
    return item("A store models daily profit in dollars, where x is the number of items sold. What quantities break even?",
      `P(x) = −2x² + ${2*(n+other)}x − ${2*n*other}`, `${n} or ${other} items`,
      [[`${2*n} or ${2*other} items`,"Divide the entire equation by −2 before factoring."],[`${(n+other)/2} items only`,"That value gives maximum profit."]],
      "Set profit equal to zero, then factor.", `After dividing by −2, the equation becomes ${bracket(-n)}${bracket(-other)} = 0.`);
  }
  const x = 1 + i % 5;
  const length = n + 4, width = n + 1;
  const area = (length+2*x)*(width+2*x)-length*width;
  return item(`A path of uniform width goes around a ${length} m by ${width} m garden. The path alone has area ${area} m². How wide is it?`,
    "Let x be the path width.", `${x} m`, [[`${2*x} m`,"There is a path on both sides of each dimension."],[`${x/2} m`,"Check how much the dimensions increase when the path is added."]],
    "Add 2x to each dimension, then subtract the area of the original garden.",
    `Set (${length} + 2x)(${width} + 2x) − ${length*width} = ${area}. The positive root is x = ${x}.`);
}

const variationCount = 30;

function nextPracticeVariant(previous) {
  return {
    bankStart: previous ? (previous.bankStart + 3) % 8 : Math.floor(Math.random()*8),
    variationStart: previous ? (previous.variationStart + 5) % variationCount : Math.floor(Math.random()*variationCount),
    order: Math.floor(Math.random()*4294967296)
  };
}

function isPracticeVariant(variant) {
  return Number.isInteger(variant?.bankStart) && variant.bankStart >= 0 && variant.bankStart < 8 &&
    Number.isInteger(variant.variationStart) && variant.variationStart >= 0 && variant.variationStart < variationCount &&
    Number.isInteger(variant.order) && variant.order >= 0 && variant.order < 4294967296;
}

function buildPracticeSet(topic, level, variant) {
  const bank = topic.levels[level];
  if (!isPracticeVariant(variant)) return bank;
  const build = topic.name === "Trigonometry" ? freshTrigPractice
    : topic.name === "Quadratic equations" ? quadraticVariant : practiceBuilders.get(topic.name);
  const questions = [
    ...Array.from({length:3}, (_, i) => bank[(variant.bankStart+i) % bank.length]),
    ...Array.from({length:5}, (_, i) => build(level, 8 + (variant.variationStart+i) % variationCount))
  ];
  let state = variant.order;
  for (let i = questions.length - 1; i > 0; i--) {
    state = (Math.imul(state,1664525) + 1013904223) >>> 0;
    const j = Math.floor(state/4294967296*(i+1));
    [questions[i],questions[j]] = [questions[j],questions[i]];
  }
  return questions;
}
