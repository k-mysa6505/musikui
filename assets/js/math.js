const math = {
    gcd: function(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new TypeError('GCD inputs must be numbers');
        }
        a = Math.abs(a);
        b = Math.abs(b);
        while (b) {
            const t = b;
            b = a % b;
            a = t;
        }
        return a;
    },

    abs: function(a) {
        return a < 0 ? -a : a;
    },

    // 少数を分数に変換
    decimalToFraction: function(decimal) {
        const EPSILON = 1.0E-10;  // 許容誤差
        let numerator = 1;
        let denominator = 1;
        let x = decimal;
        let truncated = Math.floor(x);
        let fraction = x - truncated;

        // 整数の場合
        if (Math.abs(fraction) < EPSILON) {
            return {
                numerator: Math.floor(decimal),
                denominator: 1
            };
        }

        // 分母の候補を探索
        for (denominator = 1; denominator <= 1000; denominator++) {
            numerator = Math.round(decimal * denominator);
            if (Math.abs(decimal - numerator / denominator) < EPSILON) {
                // 既約分数にする
                const gcd = this.gcd(Math.abs(numerator), denominator);
                return {
                    numerator: numerator / gcd,
                    denominator: denominator / gcd
                };
            }
        }

        // 適切な分数が見つからない場合
        return {
            numerator: 0,
            denominator: 0
        };
    },

    createIntegral: function(upper, lower, coefP, coefQ, result, blankPosition) {
        let display = '\\[';
        switch (blankPosition) {
            case 0: display += `\\int_{${lower}}^{\\text{□}}`; break;
            case 1: display += `\\int_{\\text{□}}^{${upper}}`; break;
            case 2: display += `\\int_{${lower}}^{${upper}}`; break;
            case 3: display += `\\int_{${lower}}^{${upper}}`; break;
        }
        display += ' (';
        display += blankPosition === 2 ? `\\text{□}x` : `${coefP === 1 ? '' : coefP}x`;
        display += blankPosition === 3
            ? ` ${coefQ > 0 ? '+' : '-'} \\text{□}`
            : ` ${coefQ > 0 ? '+' : '-'} ${Math.abs(coefQ)}`;
        display += `) dx = ${result} \\]`;
        return display;
    },

    createMatrix: function(matrix, determinant) {
        let display = '\\[\\det \\begin{pmatrix}';
        for (let i = 0; i < 3; i++) {
            display += matrix[i].join(' & ');
            if (i < 2) display += ' \\\\';
        }
        display += `\\end{pmatrix} = ${determinant} \\]`;
        return display;
    }
};
