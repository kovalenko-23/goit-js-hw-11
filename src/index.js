import './sass/main.scss';

const buttonStart = document.querySelector('#data-start');
const buttonStop = document.querySelector('#data-stop');
const outputDays = document.querySelector('[data-value="days"]');
const outputHours = document.querySelector('[data-value="hours"]');
const outputMins = document.querySelector('[data-value="mins"]');
const outputSecs = document.querySelector('[data-value="secs"]');
// const outputDays = document.querySelector('[data-label="days"]');
// const outputHours = document.querySelector('[data-label="hours"]');
// const outputMins = document.querySelector('[data-label="mins"]');
// const outputSecs = document.querySelector('[data-label="secs"]');




class timerCountdown {
    constructor({ onTick }) {
        this.onTick = onTick;
    };

    startCountdown() {
        const currentDate = Date.now();
        const targetDate = new Date('Jul 17, 2019');
        const targetTime = targetDate.getTime();
        const restTime = currentDate - targetTime;
        
        setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = currentTime - currentDate;
            const timeCountdown = restTime - deltaTime;
            const time = this.getTimeComponents(timeCountdown);
            this.onTick(time);
        }, 1000)
        
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return {days, hours, mins, secs}
    }
}

const newTimerCountdown = new timerCountdown({
    onTick: updateOutput,
});

newTimerCountdown.startCountdown();

function updateOutput({ days, hours, mins, secs }) {
    outputDays.textContent = `${days}`;
    outputHours.textContent = `${hours}`;
    outputMins.textContent = `${mins}`;
    outputSecs.textContent = `${secs}`;
}


       