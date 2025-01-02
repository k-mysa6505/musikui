const problems = {
    generateProblem: function(qNumber) {
        switch (qNumber) {
            case 1: return this.generateAdditionProblem();
            case 2: return this.generateDivisionProblem();
            case 3: return this.generateLinearProblem();
            case 4: return this.generateQuadraticProblem();
            case 5: return this.generateTrigonometryProblem();
            case 6: return this.generateIntegralProblem();
            case 7: return this.generateMatrixProblem();
            default: return { display: "終了", correctAnswer: null };
        }
    },

    generateAdditionProblem: function() {
        const num1 = Math.floor(Math.random() * 9) + 1;
        const num2 = Math.floor(Math.random() * 9) + 1;
        const result = num1 + num2;
        const blankPosition = Math.floor(Math.random() * 3);

        let display = '\\[';
        let correctAns = null;

        switch (blankPosition) {
            case 0:
                display += `\\text{?} + ${num2} = ${result}`;
                correctAns = num1;
                break;
            case 1:
                display += `${num1} + \\text{?} = ${result}`;
                correctAns = num2;
                break;
            case 2:
                display += `${num1} + ${num2} = \\text{?}`;
                correctAns = result;
                break;
        }
        display += '\\]';

        return { display, correctAnswer: correctAns };
    },

    generateDivisionProblem: function() {
        const divisor = Math.floor(Math.random() * 8) + 2;
        const quotient = Math.floor(Math.random() * 5) + 1;
        const remainder = Math.floor(Math.random() * (divisor - 1)) + 1;
        const dividend = divisor * quotient + remainder;

        return {
            display: `\\[${dividend} ÷ ${divisor} = ${quotient} \\text{ あまり ? }\\]`,
            correctAnswer: remainder
        };
    },

    generateLinearProblem: function() {
        let a, b, c, x;
        do {
            a = Math.floor(Math.random() * 4) + 2;  // a > 1
            x = Math.floor(Math.random() * 9) + 1;  // 1-9
            b = Math.floor(Math.random() * 9) + 1;  // 1-9
            c = a * x + b;
        } while (math.gcd(math.gcd(a, b), c) !== 1);

        const blankPosition = Math.floor(Math.random() * 3);
        let display = '\\[';
        let correctAns = null;

        switch (blankPosition) {
            case 0:
                display += `\\text{?}x ${b > 0 ? '+' : '-'} ${Math.abs(b)} = ${c}`;
                correctAns = a;
                break;
            case 1:
                display += `${a}x ${b > 0 ? '+' : '-'} \\text{?} = ${c}`;
                correctAns = Math.abs(b);
                break;
            default:
                display += `${a}x ${b > 0 ? '+' : '-'} ${Math.abs(b)} = ${c}`;
                correctAns = x;
                break;
        }
        display += '\\]';

        return {
            display,
            correctAnswer: correctAns,
            subDisplay: blankPosition === 2 ? 'x = ?' : `x = ${x}`
        };
    },

    generateQuadraticProblem: function() {
        let a, b, c, x1, x2;
        do {
            x1 = Math.floor(Math.random() * 9) + 1;   // 1-9
            x2 = -(Math.floor(Math.random() * 9) + 1); // -9--1
            a = Math.floor(Math.random() * 9) + 2;    // 2-9
            b = -a * (x1 + x2);
            c = a * x1 * x2;
        } while (b === 0 || c === 0);

        const blankPosition = Math.floor(Math.random() * 3);
        let display = '\\[';
        let correctAns = null;

        switch (blankPosition) {
            case 0:
                display += `\\text{?}x^2 ${b > 0 ? '+' : '-'} ${Math.abs(b)}x ${c > 0 ? '+' : '-'} ${Math.abs(c)} = 0`;
                correctAns = a;
                break;
            case 1:
                display += `${a}x^2 ${b > 0 ? '+' : '-'} \\text{?}x ${c > 0 ? '+' : '-'} ${Math.abs(c)} = 0`;
                correctAns = Math.abs(b);
                break;
            case 2:
                display += `${a}x^2 ${b > 0 ? '+' : '-'} ${Math.abs(b)}x ${c > 0 ? '+' : '-'} \\text{?} = 0`;
                correctAns = Math.abs(c);
                break;
        }
        display += '\\]';

        return {
            display,
            correctAnswer: correctAns,
            subDisplay: `x = ${x1}, ${x2}`
        };
    },

    generateTrigonometryProblem: function() {
        const trigPatterns = [
            { func: '\\sin', angle: 0,  value: 0 },
            { func: '\\sin', angle: 30, value: 0.5 },
            { func: '\\sin', angle: 90, value: 1 },
            { func: '\\cos', angle: 0,  value: 1 },
            { func: '\\cos', angle: 60, value: 0.5 },
            { func: '\\cos', angle: 90, value: 0 },
            { func: '\\tan', angle: 0,  value: 0 },
            { func: '\\tan', angle: 45, value: 1 }
        ];

        const pattern = trigPatterns[Math.floor(Math.random() * trigPatterns.length)];
        const blankPosition = Math.floor(Math.random() * 2);
        let display = '\\[';
        let correctAns = null;

        if (blankPosition === 0) {
            display += `${pattern.func} \\text{?}° = `;
            if (pattern.value === 0.5) {
                display += '\\frac{1}{2}';
            } else {
                display += pattern.value;
            }
            correctAns = pattern.angle;
        } else {
            display += `${pattern.func} ${pattern.angle}° = `;
            if (pattern.value === 0.5) {
                display += '\\frac{1}{\\text{?}}';
                correctAns = 2;
            } else {
                display += '\\text{?}';
                correctAns = pattern.value;
            }
        }
        display += '\\]';

        return {
            display: display,
            correctAnswer: correctAns
        };
    },

    generateIntegralProblem: function() {
        let p, q, a, b, result;
        do {
            p = Math.floor(Math.random() * 3) + 1;  // 1-3
            q = Math.floor(Math.random() * 5) + 1;  // 1-5
            a = Math.floor(Math.random() * 3);      // 0-2
            b = a + Math.floor(Math.random() * 2) + 1; // a+1 or a+2
            result = (p * (b * b - a * a) / 2 + q * (b - a));
        } while (math.gcd(p, q) !== 1);

        const blankPosition = Math.floor(Math.random() * 4);
        let correctAns = null;

        switch (blankPosition) {
            case 0: correctAns = b; break; // 上限
            case 1: correctAns = a; break; // 下限
            case 2: correctAns = p; break; // 係数p
            case 3: correctAns = q; break; // 係数q
        }

        return {
            display: math.createIntegral(b, a, p, q, result, blankPosition),
            correctAnswer: correctAns
        };
    },

    generateMatrixProblem: function() {
        const matrix = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

        let zeros;
        do {
            zeros = 0;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    matrix[i][j] = Math.floor(Math.random() * 5) - 2;
                    if (matrix[i][j] === 0) zeros++;
                }
            }
        } while (zeros >= 3);

        const blankRow = Math.floor(Math.random() * 3);
        const blankCol = Math.floor(Math.random() * 3);
        const correctAnswer = matrix[blankRow][blankCol];

        const determinant = (
            matrix[0][0] * matrix[1][1] * matrix[2][2] +
            matrix[0][1] * matrix[1][2] * matrix[2][0] +
            matrix[0][2] * matrix[1][0] * matrix[2][1] -
            matrix[0][2] * matrix[1][1] * matrix[2][0] -
            matrix[0][0] * matrix[1][2] * matrix[2][1] -
            matrix[0][1] * matrix[1][0] * matrix[2][2]
        );

        const matrixDisplay = matrix.map((row, i) =>
            row.map((val, j) =>
                i === blankRow && j === blankCol ? '\\text{?}' : val
            )
        );

        return {
            display: math.createMatrix(matrixDisplay, determinant),
            correctAnswer: correctAnswer
        };
    }
};
