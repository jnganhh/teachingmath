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
