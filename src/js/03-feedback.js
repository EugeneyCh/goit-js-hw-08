import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
// const STORAGE_EMAIL='email'

const formData = {};
const refs = {
  form: document.querySelector('.feedback-form'),
  emailarea: document.querySelector('.feedback-form input'),
  msgarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextInput, 500));

populateTextarea();

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(formData);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextInput(evt) {
  formData[evt.target.name] = evt.target.value;
  const stringFormData = JSON.stringify(formData);
  localStorage.setItem('feedback-form-state', stringFormData);
}

function populateTextarea() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const restoreData = JSON.parse(savedData);
    refs.msgarea.value = restoreData.message;
    refs.emailarea.value = restoreData.email;
  }
}
