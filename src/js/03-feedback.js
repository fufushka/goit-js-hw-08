const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

export default {
  save,
  load,
};

import throttle from 'lodash.throttle';
const refs = {
  form: document.querySelector('.feedback-form'),
};

const STORAGE_KEY = 'feedback-form-state';
formState = {};
const onFormChange = throttle(event => {
  if (event.target.nodeName === 'INPUT') {
    formState.email = event.target.value;
  } else {
    formState.message = event.target.value;
  }

  //   console.log(formState);

  save(STORAGE_KEY, formState);
}, 500);

refs.form.addEventListener('input', onFormChange);

const savedState = load(STORAGE_KEY);
console.log(savedState);
window.addEventListener('load', updateFormFields);
function updateFormFields(event) {
  if (savedState) {
    console.log(savedState);
    if (event.target.nodeName === 'INPUT') {
      event.target.value = formState.email;
    } else {
      event.target.value = formState.message;
    }
  }
}
// -------------------------------------------------------------
