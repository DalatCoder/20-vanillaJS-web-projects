// ==============================
// Template
const template = `
  <div class="container">
    <form action="" id="form" class="form">
      <h2>Register With Us</h2>
      <div class="form-control">
        <label for="username">Username</label>
        <input type="text" id="username" placeholder="Enter username" autocomplete="off">
        <small class="invisible">Error message</small>
      </div>
      <div class="form-control">
        <label for="email">Email</label>
        <input type="text" id="email" placeholder="Enter email" autocomplete="off">
        <small class="invisible">Error message</small>
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <div class="password-control">
          <input type="password" id="password" placeholder="Enter password">
          <div class="password-icon"><i class="fas fa-eye"></i></div>
          <div class="password-icon hide"><i class="fas fa-eye-slash"></i></div>
        </div>
        <small class="invisible">Error message</small>
      </div>
      <div class="form-control">
        <label for="password2">Confirm Password</label>
        <div class="password-control">
          <input type="password" id="password2" placeholder="Enter password again">
          <div class="password-icon"><i class="fas fa-eye"></i></div>
          <div class="password-icon hide"><i class="fas fa-eye-slash"></i></div>
        </div>
        <small class="invisible">Error message</small>
      </div>
      <button>Submit</button>
    </form>
  </div>
  `;

document.body.innerHTML = template;

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const formControls = Array.from(document.querySelectorAll('.form-control'));

const getFieldName = (input) => {
  const { id } = input;
  return document.querySelector(`label[for="${id}"]`).innerText;
};

const responseOnError = (target, errorElement, errorMessage) => {
  target.classList.remove('success');
  target.classList.add('error');

  errorElement.innerText = errorMessage;
  errorElement.classList.remove('invisible');
  errorElement.classList.add('visible');
};

const responseOnSuccess = (target, errorElement) => {
  target.classList.remove('error');
  target.classList.add('success');
  errorElement.classList.remove('visible');
  errorElement.classList.add('invisible');
};

const onUserNameInput = (event) => {
  const value = event.target.value.trim();
  let errorMessage = '';

  if (value.length === 0) {
    errorMessage = 'Username is required!';
  } else if (value.length < 6) {
    errorMessage = 'Username must be at least 6 characters!';
  } else if (value.length > 15) {
    errorMessage = 'Username must be less than 16 characters!';
  }

  const errorElement = event.target.parentElement.querySelector('small');

  if (errorMessage) {
    responseOnError(event.target, errorElement, errorMessage);
    return;
  }

  responseOnSuccess(event.target, errorElement);
};

const onEmailInput = (event) => {
  const email = event.target.value.trim();

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let errorMessage = '';

  if (email.length === 0) {
    errorMessage = 'Email is required!';
  } else if (!re.test(email.toLowerCase())) {
    errorMessage = 'Email is invalid!';
  }

  const errorElement = event.target.parentElement.querySelector('small');

  if (errorMessage) {
    responseOnError(event.target, errorElement, errorMessage);
    return;
  }

  responseOnSuccess(event.target, errorElement);
};

const onPasswordInput = (event) => {
  const password = event.target.value.trim();

  let errorMsg;
  const errorElement = event.target.parentElement.parentElement.querySelector(
    'small'
  );

  if (password.length === 0) {
    errorMsg = 'Password is required!';
  } else if (password.length < 6) {
    errorMsg = 'Password must be at least 6 characters!';
  } else if (password.length > 15) {
    errorMsg = 'Password must be less than 15 characters!';
  }

  if (errorMsg) {
    responseOnError(event.target, errorElement, errorMsg);
    return;
  }

  responseOnSuccess(event.target, errorElement);
};

username.addEventListener('input', debounce(onUserNameInput));
email.addEventListener('input', debounce(onEmailInput));
password.addEventListener('input', debounce(onPasswordInput));

form.addEventListener('submit', (event) => {
  event.preventDefault();

  console.log('Hello world');
});
