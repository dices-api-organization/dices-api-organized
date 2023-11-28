const submitLogin = document.getElementById('submit');
const user = document.getElementById('name');
const pass = document.getElementById('pass');
const output = document.getElementById('result');

const urlMiddelwareValidation = window.location + 'userLogin';
function cleanInput(){
  user.value = '';
  pass.value = '';
  output.innerHTML = '';
}
cleanInput();
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
  cleanInput();
  res.then((value) => {
    if (value.ok) {
      output.innerHTML = `
    <h4>
    user registered!!!
    Please login
    </h4>`;
    }
  });
});
