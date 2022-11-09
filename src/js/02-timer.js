import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  timer: document.querySelector('.timer'),
  field: document.querySelectorAll('.field'),
  number: document.querySelectorAll('.value'),
};

refs.startBtn.addEventListener('click', onStartBtn);

deactiveStartBtn();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
  },
};

const fp = flatpickr(refs.input, options);

const timer = {
  intervalID: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    const startTime = fp.selectedDates[0].getTime();
    this.isActive = true;

    this.intervalID = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      refs.days.textContent = days;
      refs.hours.textContent = hours;
      refs.minutes.textContent = minutes;
      refs.seconds.textContent = seconds;

      if (deltaTime < 1000) {
        clearInterval(this.intervalID);
        this.isActive = false;
      }
    }, 1000);
  },
};

function onStartBtn() {
  timer.start();
}

function deactiveStartBtn() {
  refs.startBtn.disabled = true;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// ============================= Styles =============================

refs.timer.style.display = 'flex';
refs.timer.style.marginTop = '20px';
refs.timer.style.justifyContent = 'center';

refs.field.forEach(elem => {
  elem.style.marginRight = '20px';
  elem.style.display = 'flex';
  elem.style.flexDirection = 'column';
  elem.style.alignItems = 'center';
});

refs.number.forEach(elem => {
  elem.style.fontSize = '40px';
});
