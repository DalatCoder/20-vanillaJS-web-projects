// ==============================
// Template
const template = `
  <div class="container">
    <form action="" id="form" class="form">
      <h2>Register With Us</h2>
      <div class="form-control">
        <label for="username">Username</label>
        <input type="text" id="username" placeholder="Enter username">
        <small class="invisible">Error message</small>
      </div>
      <div class="form-control">
        <label for="email">Email</label>
        <input type="text" id="email" placeholder="Enter email">
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

const showError = (input, message) => {
  const formControl = input.parentElement;

  formControl.querySelector('small').innerText = message;
  formControl.classList.remove('success');
  formControl.classList.add('error');
};

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
  formControl.classList.add('success');
};

const checkEmail = (input) => {
  const email = input.value.trim();
  if (email.length < 1) {
    return;
  }

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(email.toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, `${getFieldName(input)} is in valid!`);
  }
};

const getFieldName = (input) => {
  return input.parentElement.querySelector('label').innerText;
};

const checkRequired = (inputs) => {
  inputs.forEach((input) => {
    if (input.value.trim().length === 0) {
      showError(input, `${getFieldName(input)} is required!`);
      return;
    }

    showSuccess(input);
  });
};

const checkLength = (input, min, max) => {
  const length = input.value.trim().length;
  if (length < 1) {
    return;
  }

  if (length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters!`
    );
  } else if (length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters!`
    );
  } else {
    showSuccess(input);
  }
};

const checkPasswordMatch = (passwordInput, confirmPasswordInput) => {
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  if (confirmPassword.length < 1) {
    return;
  }

  if (password !== confirmPassword) {
    showError(
      confirmPasswordInput,
      `${getFieldName(confirmPasswordInput)} does not match!`
    );
  } else {
    showSuccess(confirmPasswordInput);
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 6, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
