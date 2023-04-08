import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';

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
  if (refs.emailarea.value === '' || refs.msgarea.value === '') {
    return alert(`Please fill in all the fields!`);
  }
 const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log(data);
  console.log('Email: ', `${data.email}`);
  console.log('Message: ', `${data.message}`);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextInput(evt) {
  if (refs.msgarea.value !== '' || refs.emailarea.value !== '') {
    formData.email = refs.emailarea.value;
    formData.message = refs.msgarea.value;
  }

  formData[evt.target.name] = evt.target.value;
  const stringFormData = JSON.stringify(formData);
  localStorage.setItem('feedback-form-state', stringFormData);
}

function populateTextarea() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const restoreData = JSON.parse(savedData);
    refs.msgarea.value = restoreData.message || '';
    refs.emailarea.value = restoreData.email || '';
  }
}
