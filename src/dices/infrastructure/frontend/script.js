const submitLogin = document.getElementById('submit');
const user = document.getElementById('name');
const pass = document.getElementById('pass');
const output = document.getElementById('result');
const register = document.getElementById('registerLink');

const urlMiddelwareValidation = window.location;
const uriLogin = 'userLogin';
const uriRegister = 'userRegister';

function cleanInput() {
  user.value = '';
  pass.value = '';
  output.innerHTML = '';
}

cleanInput();
submitLogin.addEventListener('click', (e) => {
  e.preventDefault();
  const res = fetch(urlMiddelwareValidation + uriLogin, {
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
    if (!value.ok) {
      output.innerHTML = `
    <h4>
    Your name or password were wrong. </br>
    Please try again.</br>
    If you haven't an account please sign up!</h4>`;
      setTimeout(() => {
        output.innerHTML = '';
      }, 3000);
    }
  });
  res.catch((err) => {
    throw new Error(err);
  });
});

register.addEventListener('click', () => {
  
})