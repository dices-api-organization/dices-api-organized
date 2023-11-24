const submitLogin = document.getElementById('submit');
const user = document.getElementById('name');
const pass = document.getElementById('pass');
const output = document.getElementById('result');

submitLogin.addEventListener('click', (e) => {
  e.preventDefault();
  console.log( e.submitLogin.value);
 
  if (user.value && pass.value) {
    output.innerHTML = `Validado`;
  }
});
