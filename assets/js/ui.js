const ui = {
    currentScreen: 'title',
    questionResults: new Array(7).fill(false),
    score: 0,

    showFeedback: function(isCorrect) {
        const existingFeedback = document.querySelector('.feedback');
        if (existingFeedback) existingFeedback.remove();

        const feedback = document.createElement('div');
        feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        
        // シンボル要素（円または×印）
        const symbol = document.createElement('div');
        symbol.className = 'feedback-symbol';
        
        // テキスト要素
        const text = document.createElement('div');
        text.className = 'feedback-text';
        text.textContent = isCorrect ? '正解！' : '不正解...';
        
        feedback.appendChild(symbol);
        feedback.appendChild(text);
        document.body.appendChild(feedback);

        setTimeout(() => feedback.classList.add('show'), 10);
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => feedback.remove(), 300);
        }, 1000);
    },

    showTutorial: function() {
        document.getElementById('titleScreen').classList.add('hidden');
        document.getElementById('tutorialScreen').classList.remove('hidden');
        this.currentScreen = 'tutorial';
    },

    startCountdown: function() {
        document.getElementById('tutorialScreen').classList.add('hidden');
        document.getElementById('countdownScreen').classList.remove('hidden');
        this.currentScreen = 'countdown';

        const countdownElement = document.querySelector('.countdown-number');
        let count = 3;

        const countdown = setInterval(() => {
            if (count > 0) {
                countdownElement.textContent = count;
                count--;
            } else if (count === 0) {
                countdownElement.textContent = 'スタート！';
                count--;
            } else {
                clearInterval(countdown);
                app.startGame();
            }
        }, 1000);
    },

    showResults: function() {
        const finalTime = timer.stop();
        const problemElement = document.getElementById('problem');
        document.querySelector('.header').classList.add('hidden');
        document.querySelector('.card:nth-child(3)').style.display = 'none';

        // レベルごとの結果を生成
        const results = this.questionResults.map((result, index) =>
            `<div class="level-results">
                <div>LEVEL${index + 1}</div>
                <div class="level-status ${result ? 'correct' : 'incorrect'}">
                    ${result ? '正解！' : '不正解'}
                </div>
            </div>`
        ).join('');

        // ランクを計算
        const rank = this.calculateRank(this.score, finalTime);

        // 結果画面のHTML構築
        const resultsHTML = document.createElement('div');
        resultsHTML.className = 'results';

        // タイトル
        const title = document.createElement('div');
        title.className = 'results-title';
        title.textContent = 'RESULTS';
        resultsHTML.appendChild(title);

        // レベル結果
        const levelsDiv = document.createElement('div');
        levelsDiv.innerHTML = results;
        resultsHTML.appendChild(levelsDiv);

        // 区切り線
        const divider = document.createElement('div');
        divider.className = 'divider';
        resultsHTML.appendChild(divider);

        // タイム表示
        const timeDisplay = document.createElement('div');
        timeDisplay.className = 'time-display';
        timeDisplay.textContent = `TIME ${finalTime}`;
        resultsHTML.appendChild(timeDisplay);

        // ランク表示
        const rankDisplay = document.createElement('div');
        rankDisplay.className = 'rank-display';

        const rankText = document.createElement('span');
        rankText.className = 'rank-text';
        rankText.textContent = 'rank ';

        const rankGrade = document.createElement('span');
        rankGrade.className = `rank-grade rank-${rank.toLowerCase()}`;
        rankGrade.textContent = rank;

        rankDisplay.appendChild(rankText);
        rankDisplay.appendChild(rankGrade);
        resultsHTML.appendChild(rankDisplay);

        // リプレイボタン
        const replayButton = document.createElement('button');
        replayButton.className = 'replay-button';
        replayButton.textContent = 'もう一度プレイ';
        replayButton.onclick = () => location.reload();
        resultsHTML.appendChild(replayButton);

        // 問題表示エリアを結果表示に置き換え
        problemElement.innerHTML = '';
        problemElement.appendChild(resultsHTML);

        // キーパッドと送信ボタンを非表示
        document.querySelector('.keypad').style.display = 'none';
        document.querySelector('.submit').style.display = 'none';
    },

    calculateRank: function(correctAnswers, timeString) {
        const totalQuestions = 7;
        const correctRate = correctAnswers / totalQuestions;
        const timeParts = timeString.match(/(\d+)'(\d+)"(\d+)/);
        const totalSeconds = parseInt(timeParts[1]) * 60 + parseInt(timeParts[2]) + parseInt(timeParts[3]) / 100;

        if (correctRate === 1 && totalSeconds < 40) return 'S';
        if (correctRate >= 0.85 && totalSeconds < 60) return 'A';
        if (correctRate >= 0.7 && totalSeconds < 80) return 'B';
        if (correctRate >= 0.5) return 'C';
        return 'D';
    }
};
