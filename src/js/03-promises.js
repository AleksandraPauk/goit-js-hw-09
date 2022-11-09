import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', toSubmit);
refs.form.addEventListener('input', toInput);

const data = {};

function toInput(event) {
  data[event.target.name] = event.target.value;
  return data;
}

function toSubmit(event) {
  event.preventDefault();

  const firstDelay = Number(data.delay);
  const step = Number(data.step);
  const amount = Number(data.amount);

  for (let position = 1; position < amount; position++) {
    const delay = firstDelay + step * (position - 1);

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
