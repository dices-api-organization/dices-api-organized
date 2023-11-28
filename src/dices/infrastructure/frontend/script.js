const submitLogin = document.getElementById('submit');
const user = document.getElementById('name');
const pass = document.getElementById('pass');
const output = document.getElementById('result');

const urlMiddelwareValidation = window.location + 'userLogin';
function cleanInput() {
  user.value = '';
  pass.value = '';
  output.innerHTML = '';
}

cleanInput();
submitLogin.addEventListener('click', (e) => {
  e.preventDefault();
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
    if (!value.body.name) {
      output.innerHTML = `
    <h4>
    Your name or password were wrong. </br>
    Please try again ${value.body.name}.</br>
    If you haven't an account please sign up!</h4>`;
    }
  });
});
