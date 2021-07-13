import './sass/main.scss';
import Swal from 'sweetalert2';

const dateSelector = document.querySelector('#date-selector');
const startButton = document.querySelector('[data-start]');

const outputDays = document.querySelector('[data-days]');
const outputHours = document.querySelector('[data-hours]');
const outputMins = document.querySelector('[data-minutes]');
const outputSecs = document.querySelector('[data-seconds]');

startButton.setAttribute('disabled', true);


dateSelector.addEventListener('change', event => {
  startButton.removeAttribute('disabled');
  const currentDate = Date.now();
  const inputValue = event.target.value;
  const targetDate = new Date(inputValue);
  const targetTime = targetDate.getTime();
  console.log(targetTime);

  if (currentDate > targetTime) {
    startButton.setAttribute('disabled', true);
    Swal.fire({
      title: 'Error!',
      text: 'Please choose a date in the future',
      icon: 'error',
      confirmButtonText: 'Return'
    })
  }

});


class TimerCountdown {
  constructor({ onTick }) {
    this.isActive = false;
    this.intervalId = null;
    this.onTick = onTick;
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }

  startCountdown() {

    if (this.isActive) {
      return;
    }
    
    this.isActive = true;

    const currentDate = Date.now();
    const targetDate = Date.parse(dateSelector.value);
    console.log(targetDate);
    const restTime = targetDate - currentDate;
        
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - currentDate;
      const ms = restTime - deltaTime;
      const time = this.convertMs(ms);
      this.onTick(time);
    }, 1000)
  }

  pad(value) {
      return String(value).padStart(2, '0');
  }

   convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      // Remaining days
      const days = this.pad(Math.floor(ms / day));
      // Remaining hours
      const hours = this.pad(Math.floor((ms % day) / hour));
      // Remaining minutes
      const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
      // Remaining seconds
      const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

      return { days, hours, minutes, seconds };
   } 
}

const newTimerCountdown = new TimerCountdown({
    onTick: updateOutput,
});

startButton.addEventListener('click', event => {
  newTimerCountdown.startCountdown();
});

dateSelector.addEventListener('click', event => {
  newTimerCountdown.stop();
});

function updateOutput({ days, hours, minutes, seconds }) {
    outputDays.textContent = `${days}`;
    outputHours.textContent = `${hours}`;
    outputMins.textContent = `${minutes}`;
    outputSecs.textContent = `${seconds}`;
}









       