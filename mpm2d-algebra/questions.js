"use strict";

function item(prompt, math, correct, distractors, hint, solution) {
  return {prompt, math, correct, distractors, hint, solution};
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
