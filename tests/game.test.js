// テストの実行に必要なDOM要素の準備
function setupTestEnvironment() {
    // 答え表示用の要素
    if (!document.getElementById('answer')) {
        const answerElement = document.createElement('div');
        answerElement.id = 'answer';
        document.body.appendChild(answerElement);
    }

    // 問題表示用の要素
    if (!document.getElementById('problem')) {
        const problemElement = document.createElement('div');
        problemElement.id = 'problem';
        document.body.appendChild(problemElement);
    }

    // タイマー要素
    if (!document.getElementById('timer')) {
        const timerElement = document.createElement('div');
        timerElement.id = 'timer';
        timerElement.textContent = "00'00\"00";
        document.body.appendChild(timerElement);
    }

    // 問題番号表示
    if (!document.getElementById('questionNumber')) {
        const questionElement = document.createElement('div');
        questionElement.id = 'questionNumber';
        document.body.appendChild(questionElement);
    }

    // サブミットボタン
    if (!document.querySelector('.submit')) {
        const submitButton = document.createElement('button');
        submitButton.className = 'submit';
        submitButton.textContent = 'OK';
        document.body.appendChild(submitButton);
    }

    // 初期状態のリセット
    app.currentAnswer = '';
    app.currentProblem = null;
    app.questionNumber = 1;
}

// テストユーティリティ
const TestUtils = {
    assertEquals: function(actual, expected, message) {
        const isEqual = actual === expected;
        console.assert(isEqual,
            `${message || ''} Expected ${expected}, but got ${actual}`
        );
        return isEqual;
    },

    assertRange: function(value, min, max, message) {
        const inRange = value >= min && value <= max;
        console.assert(inRange,
            `${message || ''} Expected value between ${min} and ${max}, but got ${value}`
        );
        return inRange;
    },

    assertNotNull: function(value, message) {
        const isNotNull = value !== null && value !== undefined;
        console.assert(isNotNull,
            `${message || ''} Expected value to be not null/undefined, but got ${value}`
        );
        return isNotNull;
    },

    assertThrows: function(fn, expectedError, message) {
        try {
            fn();
            console.error(`${message || ''} Expected to throw an error, but nothing was thrown`);
            return false;
        } catch (error) {
            console.log(`Caught error: ${error}`);
            return true;
        }
    },

    assertAnimationExists: function(element, propertyName, message) {
        const styles = window.getComputedStyle(element);
        const hasAnimation = styles.animation !== '' || styles[propertyName] !== '';
        console.assert(hasAnimation,
            `${message || ''} Expected animation on ${propertyName}`
        );
        return hasAnimation;
    }
};

// 境界値テスト
function testBoundaryValues() {
    console.log('Testing Boundary Values...');
    let passed = 0;
    let total = 0;

    // 正の最大値テスト
    total++;
    try {
        const largeNumber = Number.MAX_SAFE_INTEGER;
        const result = math.abs(largeNumber);
        if (TestUtils.assertEquals(result, largeNumber, 'Maximum safe integer:')) passed++;
    } catch (e) {
        console.error('Failed on maximum safe integer:', e);
    }

    // 負の最大値テスト
    total++;
    try {
        const largeNegative = -Number.MAX_SAFE_INTEGER;
        const result = math.abs(largeNegative);
        if (TestUtils.assertEquals(result, Number.MAX_SAFE_INTEGER, 'Minimum safe integer:')) passed++;
    } catch (e) {
        console.error('Failed on minimum safe integer:', e);
    }

    // ゼロ値テスト
    total++;
    try {
        const result = math.abs(0);
        if (TestUtils.assertEquals(result, 0, 'Zero value:')) passed++;
    } catch (e) {
        console.error('Failed on zero value:', e);
    }

    return { passed, total };
}

// エラー処理テスト
function testErrorHandling() {
    console.log('Testing Error Handling...');
    let passed = 0;
    let total = 0;

    // 不正な入力値のテスト
    total++;
    if (TestUtils.assertThrows(
        () => math.gcd('invalid', 5),
        TypeError,
        'Invalid GCD input:'
    )) passed++;

    // 範囲外の問題番号テスト
    total++;
    const invalidProblem = problems.generateProblem(99);
    if (TestUtils.assertEquals(
        invalidProblem.display,
        "終了",
        'Invalid problem number:'
    )) passed++;

    // タイマーの不正な操作テスト
    total++;
    if (TestUtils.assertThrows(
        () => timer.update.call(null),
        TypeError,
        'Timer without context:'
    )) passed++;

    return { passed, total };
}

// アニメーション効果テスト
function testAnimations() {
    console.log('Testing Animations...');
    let passed = 0;
    let total = 0;

    // フィードバックアニメーションのテスト
    total++;
    try {
        // フィードバック要素を直接作成してテスト
        const feedback = document.createElement('div');
        feedback.className = 'feedback correct';
        document.body.appendChild(feedback);

        // アニメーションクラスの追加
        feedback.classList.add('show');

        if (TestUtils.assertAnimationExists(
            feedback,
            'opacity',
            'Feedback animation:'
        )) passed++;

        // クリーンアップ
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 100);
    } catch (e) {
        console.error('Feedback animation test failed:', e);
    }

    // 問題切り替えアニメーションのテスト
    total++;
    try {
        const problem = document.getElementById('problem');
        if (problem) {
            problem.classList.add('slide-out');
            if (TestUtils.assertAnimationExists(
                problem,
                'transform',
                'Problem transition animation:'
            )) passed++;

            // クリーンアップ
            setTimeout(() => {
                problem.classList.remove('slide-out');
            }, 100);
        }
    } catch (e) {
        console.error('Problem animation test failed:', e);
    }

    return { passed, total };
}

// イベントハンドリングテスト
function testEventHandling() {
    console.log('Testing Event Handling...');
    let passed = 0;
    let total = 0;

    // 数字入力イベントのテスト
    total++;
    app.currentAnswer = '';  // 初期化
    app.handleInput('5');
    if (TestUtils.assertEquals(
        app.currentAnswer,
        '5',
        'Number input handling:'
    )) passed++;

    // 削除イベントのテスト
    total++;
    app.handleDelete();
    if (TestUtils.assertEquals(
        app.currentAnswer,
        '',
        'Delete handling:'
    )) passed++;

    // 負の数の入力テスト
    total++;
    app.handleInput('-');
    app.handleInput('3');
    if (TestUtils.assertEquals(
        app.currentAnswer,
        '-3',
        'Negative number handling:'
    )) passed++;

    return { passed, total };
}

// ローカルストレージテスト
function testLocalStorage() {
    console.log('Testing Local Storage...');
    let passed = 0;
    let total = 0;

    // データ保存テスト
    total++;
    const testScore = { score: 100, time: "01'30\"00" };
    try {
        localStorage.setItem('highScore', JSON.stringify(testScore));
        const retrieved = JSON.parse(localStorage.getItem('highScore'));
        if (TestUtils.assertEquals(
            retrieved.score,
            testScore.score,
            'Score storage:'
        )) passed++;
    } catch (e) {
        console.error('Local storage failed:', e);
    }

    // データ削除テスト
    total++;
    try {
        localStorage.removeItem('highScore');
        const deleted = localStorage.getItem('highScore');
        if (TestUtils.assertEquals(
            deleted,
            null,
            'Score deletion:'
        )) passed++;
    } catch (e) {
        console.error('Local storage deletion failed:', e);
    }

    return { passed, total };
}

// 全テストの実行
function runAllTests() {
    console.log('Starting all tests...');

    const results = [
        testBoundaryValues(),
        testErrorHandling(),
        testAnimations(),
        testEventHandling(),
        testLocalStorage()
    ];

    const totalPassed = results.reduce((sum, result) => sum + result.passed, 0);
    const totalTests = results.reduce((sum, result) => sum + result.total, 0);

    console.log('====================');
    console.log(`All tests completed: ${totalPassed}/${totalTests} passed`);
    console.log('====================');
}

function setupTestEnvironment() {
    // ゲーム画面のコンテナ
    if (!document.getElementById('gameScreen')) {
        const gameScreen = document.createElement('div');
        gameScreen.id = 'gameScreen';
        document.body.appendChild(gameScreen);
    }

    // 問題表示用の要素
    const gameScreen = document.getElementById('gameScreen');
    if (!document.getElementById('problem')) {
        const problemElement = document.createElement('div');
        problemElement.id = 'problem';
        problemElement.className = 'problem';
        gameScreen.appendChild(problemElement);
    }

    // 答え表示用の要素
    if (!document.getElementById('answer')) {
        const answerElement = document.createElement('div');
        answerElement.id = 'answer';
        answerElement.className = 'answer';
        gameScreen.appendChild(answerElement);
    }

    // タイマー要素
    if (!document.getElementById('timer')) {
        const timerElement = document.createElement('div');
        timerElement.id = 'timer';
        timerElement.textContent = "00'00\"00";
        gameScreen.appendChild(timerElement);
    }

    // 問題番号表示
    if (!document.getElementById('questionNumber')) {
        const questionElement = document.createElement('div');
        questionElement.id = 'questionNumber';
        questionElement.textContent = '1';
        gameScreen.appendChild(questionElement);
    }

    // サブミットボタン
    if (!document.querySelector('.submit')) {
        const submitButton = document.createElement('button');
        submitButton.className = 'submit';
        submitButton.textContent = 'OK';
        gameScreen.appendChild(submitButton);
    }

    // アプリケーションの状態をリセット
    app.currentAnswer = '';
    app.currentProblem = null;
    app.questionNumber = 1;

    // UI状態のリセット
    ui.score = 0;
    ui.questionResults = new Array(7).fill(false);
}

// DOMContentLoadedイベントでテストを実行
document.addEventListener('DOMContentLoaded', () => {
    setupTestEnvironment();
    runAllTests();
});