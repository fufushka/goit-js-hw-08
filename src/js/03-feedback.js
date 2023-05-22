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
// ----------------------------------------------
import throttle from 'lodash.throttle';
const refs = {
  form: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('input[name="email"]'),
  messageInput: document.querySelector('textarea[name="message"]'),
};

const STORAGE_KEY = 'feedback-form-state';

const onFormChange = throttle(() => {
  const formState = {
    email: refs.messageInput.value.trim(),
    message: refs.emailInput.value.trim(),
  };

  //   console.log(formState);

  save(STORAGE_KEY, formState);
}, 500);

refs.form.addEventListener('input', onFormChange);

document.addEventListener('DOMContentLoaded', updateFormFields);

function updateFormFields(event) {
  const savedState = load(STORAGE_KEY);
  if (savedState) {
    refs.emailInput.value = savedState.email;
    refs.messageInput.value = savedState.message;
  }
}

refs.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();
  load(STORAGE_KEY);
  localStorage.removeItem(STORAGE_KEY);
  refs.emailInput.value = '';
  refs.messageInput.value = '';

  const formState = {
    email: refs.emailInput.value,
    message: refs.messageInput.value,
  };
  console.log(formState);
}
