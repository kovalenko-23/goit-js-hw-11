import './sass/main.scss';

const btnStart = document.querySelector('[data-start-picker]');
const btnStop = document.querySelector('[data-stop-picker]');
const body = document.querySelector('body');

btnStart.addEventListener('click', onBtnStart);
btnStop.addEventListener('click', onBtnStop);

let isActive = false;
let intervalId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onBtnStart() {
    btnStart.setAttribute('disabled', true);
    intervalId = setInterval(() => {
        const newColor = getRandomHexColor();
        body.style.backgroundColor = newColor;
    }, 1000);
}

function onBtnStop() {
    btnStart.removeAttribute('disabled');
    clearInterval(intervalId);
    isActive = false;
}



