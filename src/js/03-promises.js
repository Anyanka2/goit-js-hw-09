import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const inputDelayEl = document.querySelector('input[name=delay]');
const inputStepEl = document.querySelector('input[name=step]');
const inputAmountEl = document.querySelector('input[name=amount]');

formEl.addEventListener('submit', onSubmit);

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
function onSubmit(event) {
  event.preventDefault();
  const delay = parseInt(inputDelayEl.value);
  const step = parseInt(inputStepEl.value);
  const amount = parseInt(inputAmountEl.value);
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay + step * (position - 1))
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  formEl.reset();
}
