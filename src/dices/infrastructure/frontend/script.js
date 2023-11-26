const submitLogin = document.getElementById('submit');
const user = document.getElementById('name');
const pass = document.getElementById('pass');
const output = document.getElementById('result');

const urlMiddelwareValidation = window.location + 'userRegister';

submitLogin.addEventListener('click', (e) => {
  e.preventDefault();
  output.innerHTML = `<p>Validando...</p>`;
  const res = fetch(urlMiddelwareValidation, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: user.value,
      password: pass.value
    })
  });
  const isValidate = res ? true : false;
  output.innerHTML = `Es un usuario correcto?: ${isValidate}`;
});
