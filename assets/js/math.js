const math = {
    gcd: function(a, b) {
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

    createIntegral: function(upper, lower, coefP, coefQ, result, blankPosition) {
        let display = '\\[';
        switch (blankPosition) {
            case 0: display += `\\int_{${lower}}^{\\text{?}}`; break;
            case 1: display += `\\int_{\\text{?}}^{${upper}}`; break;
            case 2: display += `\\int_{${lower}}^{${upper}}`; break;
            case 3: display += `\\int_{${lower}}^{${upper}}`; break;
        }
        display += ' (';
        display += blankPosition === 2 ? `\\text{?}x` : `${coefP === 1 ? '' : coefP}x`;
        display += blankPosition === 3
            ? ` ${coefQ > 0 ? '+' : '-'} \\text{?}`
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
