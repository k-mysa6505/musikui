const problems = {
    generateProblem: function(qNumber) {
        switch (qNumber) {
            case 1: return this.generateAdditionProblem();
            case 2: return this.generateDivisionProblem();
            case 3: return this.generateLinearProblem();
            case 4: return this.generateQuadraticProblem();
            case 5: return this.generateTrigonometryProblem();
            case 6: return this.generateIntegralProblem();
            case 7: return this.generateSequenceProblem();
            default: return { display: "終了", correctAnswer: null };
        }
    },

    generateAdditionProblem: function() {
        const num1 = Math.floor(Math.random() * 9) + 1;
        const num2 = Math.floor(Math.random() * 9) + 1;
        const result = num1 + num2;
        const blankPosition = Math.floor(Math.random() * 2);

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
        }
        display += '\\]';

        return { display, correctAnswer: correctAns };
    },

    generateDivisionProblem: function() {
        const divisor = Math.floor(Math.random() * 8) + 2;
        const quotient = Math.floor(Math.random() * 5) + 1;
        const remainder = Math.floor(Math.random() * (divisor - 1)) + 1;
        const dividend = divisor * quotient + remainder;

        const blankPosition = Math.floor(Math.random() * 4);
        let display = '\\[';
        let correctAns = null;

        switch (blankPosition) {
            case 0:
                display += `\\text{?} ÷ ${divisor} = ${quotient} \\text{ あまり } ${remainder}`;
                correctAns = dividend;
                break;
            case 1:
                display += `${dividend} ÷ \\text{?} = ${quotient} \\text{ あまり } ${remainder}`;
                correctAns = divisor;
                break;
            case 2:
                display += `${dividend} ÷ ${divisor} = \\text{?} \\text{ あまり } ${remainder}`;
                correctAns = quotient;
                break;
            case 3:
                display += `${dividend} ÷ ${divisor} = ${quotient} \\text{ あまり ? }`;
                correctAns = remainder;
                break;
        }

        display += '\\]';

        return {
            display: display,
            correctAnswer: correctAns
        };
    },

    generateLinearProblem: function() {
        let a, b, c, x;
        do {
            a = Math.floor(Math.random() * 4) + 2;  // a > 1
            x = Math.floor(Math.random() * 9) + 1;  // 2-9
            b = Math.floor(Math.random() * 9) + 1;  // 2-9
            c = a * x + b;
        } while (math.gcd(math.gcd(a, b), c) !== 1);

        const blankPosition = Math.floor(Math.random() * 4);
        let display = '\\[';
        let subDisplay = '\\[';
        let correctAns = null;

        switch (blankPosition) {
            case 0:
                display += `\\text{?}x ${b > 0 ? '+' : '-'} ${Math.abs(b)} = ${c}`;
                subDisplay += `x = ${x}`;
                correctAns = a;
                break;
            case 1:
                display += `${a}x ${b > 0 ? '+' : '-'} \\text{?} = ${c}`;
                subDisplay += `x = ${x}`;
                correctAns = Math.abs(b);
                break;
            case 2:
                display += `${a}x ${b > 0 ? '+' : '-'} ${Math.abs(b)} = \\text{?}`;
                subDisplay += `x = ${x}`;
                correctAns = c;
                break;
            case 3:
                display += `${a}x ${b > 0 ? '+' : '-'} ${Math.abs(b)} = ${c}`;
                subDisplay += `x = ?`;
                correctAns = x;
                break;
            default:
                break;
        }
        display += '\\]';
        subDisplay += '\\]';

        return {
            display,
            correctAnswer: correctAns,
            subDisplay: subDisplay
        };
    },

    generateQuadraticProblem: function() {
        let a, b, c, x1, x2;
        do {
            x1 = Math.floor(Math.random() * 9) + 1;   // 1-9
            x2 = -(Math.floor(Math.random() * 9) + 1); // -9--1
            a = 1;      //  ランダムにするとちょっとやっかい
            b = -a * (x1 + x2);
            c = a * x1 * x2;
        } while (b === 0 || Math.abs(b) === 1 || c === 0);

        const blankPosition = Math.floor(Math.random() * 4);
        let display = '\\[';
        let subDisplay = '\\[';
        let correctAns = null;

        switch (blankPosition) {
            case 0:
                display += `x^2 ${b > 0 ? '+' : '-'} \\text{?}x ${c > 0 ? '+' : '-'} ${Math.abs(c)} = 0`;
                subDisplay += `x = ${x1}, ${x2}`;
                correctAns = Math.abs(b);
                break;
            case 1:
                display += `x^2 ${b > 0 ? '+' : '-'} ${Math.abs(b)}x ${c > 0 ? '+' : '-'} \\text{?} = 0`;
                subDisplay += `x = ${x1}, ${x2}`;
                correctAns = Math.abs(c);
                break;
            case 2:
                display += `x^2 ${b > 0 ? '+' : '-'} ${Math.abs(b)}x ${c > 0 ? '+' : '-'} ${Math.abs(c)} = 0`;
                subDisplay += `x = \\text{?}, ${x2}`;
                correctAns = x1;
                break;
            case 3:
                display += `x^2 ${b > 0 ? '+' : '-'} ${Math.abs(b)}x ${c > 0 ? '+' : '-'} ${Math.abs(c)} = 0`;
                subDisplay += `x = ${x1}, \\text{?}`;
                correctAns = x2;
                break;
        }
        display += '\\]';
        subDisplay += '\\]';

        return {
            display,
            correctAnswer: correctAns,
            subDisplay: subDisplay
        };
    },

    generateTrigonometryProblem: function() {
        const trigPatterns = [
            { func: '\\sin', angle: 0,  value: 0 },
            { func: '\\sin', angle: 30, value: 1 / 2 },
            { func: '\\sin', angle: 45, value: 1 / Math.sqrt(2)},
            { func: '\\sin', angle: 60, value: Math.sqrt(3) / 2 },
            { func: '\\sin', angle: 90, value: 1 },
            { func: '\\cos', angle: 0,  value: 1 },
            { func: '\\cos', angle: 30, value: Math.sqrt(3) / 2 },
            { func: '\\cos', angle: 45, value: 1 / Math.sqrt(2) },
            { func: '\\cos', angle: 60, value: 1 / 2 },
            { func: '\\cos', angle: 90, value: 0 },
            { func: '\\tan', angle: 0,  value: 0 },
            { func: '\\tan', angle: 30, value: 1 / Math.sqrt(3) },
            { func: '\\tan', angle: 45, value: 1 },
            { func: '\\tan', angle: 60, value: Math.sqrt(3) },
        ];

        const trigPatternsIndex = Math.floor(Math.random() * trigPatterns.length);
        const pattern = trigPatterns[trigPatternsIndex];
        const blankPosition = Math.floor(Math.random() * 2);
        let correctAns = null;

        let angleSentence, valueSentence;
        if (pattern.value == 1 / 2) {
            angleSentence = blankPosition == 0 ? `\\text{?}` : pattern.angle;
            valueSentence = blankPosition == 0 ? `\\frac{1}{2}` : `\\frac{1}{\\text{?}}`;
            correctAns    = blankPosition == 0 ? pattern.angle : 2;
        } else if (pattern.value == 1 / Math.sqrt(2)) {
            angleSentence = blankPosition == 0 ? `\\text{?}` : pattern.angle;
            valueSentence = blankPosition == 0 ? `\\frac{1}{\\sqrt{2}}` : `\\frac{1}{\\sqrt{\\text{?}}}`;
            correctAns    = blankPosition == 0 ? pattern.angle : 2;
        } else if (pattern.value == 1 / Math.sqrt(3)) {
            angleSentence = blankPosition == 0 ? `\\text{?}` : pattern.angle;
            valueSentence = blankPosition == 0 ? `\\frac{1}{\\sqrt{3}}` : `\\frac{1}{\\sqrt{\\text{?}}}`;
            correctAns    = blankPosition == 0 ? pattern.angle : 3;
        } else if (pattern.value == Math.sqrt(3) / 2) {
            angleSentence = blankPosition == 0 ? `\\text{?}` : pattern.angle;
            valueSentence = blankPosition == 0 ? `\\frac{\\sqrt{3}}{2}` : `\\frac{\\sqrt{\\text{?}}}{2}`;
            correctAns    = blankPosition == 0 ? pattern.angle : 3;
        } else if (pattern.value == Math.sqrt(3)) {
            angleSentence = blankPosition == 0 ? `\\text{?}` : pattern.angle;
            valueSentence = blankPosition == 0 ? `\\sqrt{3}` : `\\sqrt{\\text{?}}`;
            correctAns    = blankPosition == 0 ? pattern.angle : 3;
        } else {
            angleSentence = blankPosition == 0 ? `\\text{?}` : pattern.angle;
            valueSentence = blankPosition == 0 ? pattern.value : `\\text{?}`;
            correctAns    = blankPosition == 0 ? pattern.angle : pattern.value;
        }

        let display = `\\[${pattern.func} ${angleSentence}° = ${valueSentence}\\]`;

        return {
            display: display,
            subDisplay: blankPosition == 0 ? `\\[\\text{（0°~90°の間で答えてね）}\\]` : null,
            correctAnswer: correctAns
        };
    },

    generateIntegralProblem: function() {
        let p, q, a, b, result;
        do {
            p = Math.floor(Math.random() * 2) + 2;  // 2-3
            q = Math.floor(Math.random() * 5) + 1;  // 1-5
            a = Math.floor(Math.random() * 3);      // 0-2
            b = a + Math.floor(Math.random() * 2) + 1; // a+1 or a+2
            result = (p * (b * b - a * a) / 2 + q * (b - a));
        } while (math.gcd(p, q) !== 1);

        let resultSentence;;
        if (result != Math.floor(result)) {
            let fraction = math.decimalToFraction(result);
            resultSentence = `\\frac{${fraction.numerator}}{${fraction.denominator}}`;
        } else {
            resultSentence = result;
        }

        const blankPosition = Math.floor(Math.random() * 4);
        let correctAns = null;

        switch (blankPosition) {
            case 0: correctAns = b; break; // 上限
            case 1: correctAns = a; break; // 下限
            case 2: correctAns = p; break; // 係数p
            case 3: correctAns = q; break; // 係数q
        }

        return {
            display: math.createIntegral(b, a, p, q, resultSentence, blankPosition),
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
    },

    generateSequenceProblem: function() {
        let p, q, r, s, t, u;
        let correctAnswer;
        let blankPosition;

        do {
            // パラメータ生成
            p = Math.floor(Math.random() * 3) + 2;  // 2-4
            t = p;  // tはpと同じ値（一般項の底）

            // sがtの倍数にならないように設定
            do {
                s = Math.floor(Math.random() * 5) + 2;  // 2-5
            } while (s % t === 0);

            do {
                u = Math.floor(Math.random() * 7) - 3;  // -3-3
            } while (u === 0);

            q = u * (1 - p);  // q = u(1-p)
            r = s + u;    // a₁の値

            // どのパラメータを隠すかをランダムに選択
            blankPosition = Math.floor(Math.random() * 6);  // 0-5: p,q,r,s,t,u

            // 隠すパラメータに応じて正解を設定
            switch(blankPosition) {
                case 0: correctAnswer = p; break;  // p
                case 1: correctAnswer = q; break;  // q
                case 2: correctAnswer = r; break;  // a₁
                case 3: correctAnswer = s; break;  // 係数
                case 4: correctAnswer = t; break;  // 底
                case 5: correctAnswer = Math.abs(u); break;  // 定数項
            }

        } while (
            Math.abs(correctAnswer) > 9 ||  // 答えが大きすぎる
            correctAnswer === 0           // 答えが0
        );

        // 漸化式の表示
        let display = '\\[';
        display += 'a_{n+1} = ';
        display += blankPosition === 0 ? '\\text{?}' : p;
        display += 'a_n';
        display += (blankPosition === 1 ? ' + \\text{?}' : (q >= 0 ? ` + ${q}` : ` ${q}`));
        display += ', \\;\\; a_1 = ';
        display += blankPosition === 2 ? '\\text{?}' : r;
        display += '\\]';

        // 一般項の表示
        let subDisplay = '\\[\\Longrightarrow a_n = ';
        subDisplay += blankPosition === 3 ? '\\text{?}' : s;
        subDisplay += ' \\cdot ';
        subDisplay += blankPosition === 4 ? '\\text{?}' : t;
        subDisplay += '^{n-1}';
        subDisplay += blankPosition === 5 ? ' + \\text{?}' : (u > 0 ? ` + ${u}` : ` - ${Math.abs(u)}`);
        subDisplay += '\\]';

        return {
            display: display,
            correctAnswer: correctAnswer,
            subDisplay: subDisplay
        };
    }
};
