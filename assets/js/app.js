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
        this.currentProblem = problems.generateProblem(this.questionNumber);
        const problemElement = document.getElementById('problem');

        problemElement.innerHTML = this.currentProblem.display;
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, problemElement]);

        if (this.currentProblem.subDisplay) {
            const subDisplay = document.createElement('div');
            subDisplay.className = 'sub-display';
            subDisplay.textContent = this.currentProblem.subDisplay;
            problemElement.appendChild(subDisplay);
        }
    },

    handleInput: function(value) {
        if (value === '-' && this.currentAnswer === '') {
            this.currentAnswer = '-';
        } else if (value !== '-') {
            this.currentAnswer += value;
        }
        document.getElementById('answer').textContent = this.currentAnswer;
    },

    handleDelete: function() {
        this.currentAnswer = this.currentAnswer.slice(0, -1);
        document.getElementById('answer').textContent = this.currentAnswer;
    },

    handleSubmit: function() {
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
