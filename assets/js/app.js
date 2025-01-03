const app = {
    currentProblem: null,
    currentAnswer: '',
    questionNumber: 1,

    init: function() {
        this.attachEventListeners();
    },

    attachEventListeners: function() {
        // グローバルスコープの関数をアプリケーションにバインド
        window.handleInput = this.handleInput.bind(this);
        window.handleDelete = this.handleDelete.bind(this);
        window.handleSubmit = this.handleSubmit.bind(this);
        window.showTutorial = ui.showTutorial.bind(ui);
        window.startCountdown = ui.startCountdown.bind(ui);
    },

    startGame: function() {
        document.getElementById('countdownScreen').classList.add('hidden');
        document.getElementById('gameScreen').classList.remove('hidden');
        timer.start();
        this.displayProblem();
    },

    displayProblem: function() {
        const problemElement = document.getElementById('problem');
        const answerElement = document.getElementById('answer');
        const submitButton = document.querySelector('.submit');

        submitButton.disabled = true;

        // 最初の問題表示の場合はアニメーションなし
        if (!this.currentProblem) {
            this.currentProblem = problems.generateProblem(this.questionNumber);
            problemElement.innerHTML = this.currentProblem.display;
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, problemElement]);
            if (this.currentProblem.subDisplay) {
                const subDisplay = document.createElement('div');
                subDisplay.className = 'sub-display';
                subDisplay.innerHTML = this.currentProblem.subDisplay;
                problemElement.appendChild(subDisplay);
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, subDisplay]);
            }
            // プレースホルダーを設定
            this.currentAnswer = '';
            answerElement.textContent = '□に入る数字は？';
            answerElement.classList.add('empty');
            return;
        }

        // 問題切り替え時のアニメーション
        problemElement.classList.add('slide-out');

        setTimeout(() => {
            this.currentProblem = problems.generateProblem(this.questionNumber);
            problemElement.innerHTML = this.currentProblem.display;

            if (this.currentProblem.subDisplay) {
                const subDisplay = document.createElement('div');
                subDisplay.className = 'sub-display';
                subDisplay.innerHTML = this.currentProblem.subDisplay;
                problemElement.appendChild(subDisplay);
            }

            MathJax.Hub.Queue(["Typeset", MathJax.Hub, problemElement]);

            // 新しい問題のプレースホルダーを設定
            this.currentAnswer = '';
            answerElement.textContent = '□に入る数字は？';
            answerElement.classList.add('empty');

            problemElement.classList.remove('slide-out');
            problemElement.classList.add('slide-in');

            setTimeout(() => {
                problemElement.classList.remove('slide-in');
            }, 300);
        }, 300);
    },

    handleInput: function(value) {
        const answerElement = document.getElementById('answer');
        const submitButton = document.querySelector('.submit');

        if (value === '-' && this.currentAnswer === '') {
            this.currentAnswer = '-';
        } else if (value !== '-') {
            this.currentAnswer += value;
        }

        answerElement.textContent = this.currentAnswer;
        answerElement.classList.remove('empty');

        // 入力があればボタンを有効化
        submitButton.disabled = (this.currentAnswer === '' || this.currentAnswer === '-');
    },

    handleDelete: function() {
        const answerElement = document.getElementById('answer');
        const submitButton = document.querySelector('.submit');

        this.currentAnswer = this.currentAnswer.slice(0, -1);

        if (this.currentAnswer === '') {
            answerElement.textContent = '□に入る数字は？';
            answerElement.classList.add('empty');
            submitButton.disabled = true;  // 入力が空になったらボタンを無効化
        } else {
            answerElement.textContent = this.currentAnswer;
            submitButton.disabled = (this.currentAnswer === '-');  // '-'のみの場合も無効
        }
    },

    handleSubmit: function() {
        if (this.currentAnswer === '') {
            return;
        }

        const userAnswer = Number(this.currentAnswer);
        const isCorrect = userAnswer === this.currentProblem.correctAnswer;

        if (isCorrect) {
            ui.score++;
            ui.questionResults[this.questionNumber - 1] = true;
        }

        ui.showFeedback(isCorrect);

        setTimeout(() => {
            this.currentAnswer = '';
            document.getElementById('answer').textContent = '';

            if (this.questionNumber < 7) {
                this.questionNumber++;
                document.getElementById('questionNumber').textContent = this.questionNumber;
                this.displayProblem();
            } else {
                ui.showResults();
            }
        }, 1000);
    }
};

// アプリケーションの初期化
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
