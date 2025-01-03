const timer = {
    startTime: null,
    timerInterval: null,

    start: function() {
        if (!this || this !== timer) {
            throw new TypeError('Timer context is invalid');
        }
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => this.update(), 10);
    },

    stop: function() {
        if (!this || this !== timer) {
            throw new TypeError('Timer context is invalid');
        }
        clearInterval(this.timerInterval);
        return document.getElementById('timer').textContent;
    },

    update: function() {
        if (!this || this !== timer) {
            throw new TypeError('Timer context is invalid');
        }
        const currentTime = Date.now();
        const elapsedTime = currentTime - this.startTime;
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        const milliseconds = Math.floor((elapsedTime % 1000) / 10);

        const timerElement = document.getElementById('timer');
        if (!timerElement) {
            throw new Error('Timer element not found');
        }

        timerElement.textContent =
            `${String(minutes).padStart(2, '0')}'${String(seconds).padStart(2, '0')}"${String(milliseconds).padStart(2, '0')}`;
    }
};